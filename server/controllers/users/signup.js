const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, sendTocookie, generaterefreshToken } = require("../tokenFunctions");


const sendEmail = require("../../utils/sendEmail");


module.exports = {
  post: async (req, res) => {
    try {
      const { email, password, username } = req.body;

      // 요청이 잘못된 경우 다음을 리턴
      if (!email || !password || !username) {
        return res.status(400).json({ message: `Bad Request!` });
      }

      const userInfo = await User.findOne({ where: { email } });

      if (userInfo) {
        return res.status(409).json({ message: "user already exists" });
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // console.log("newUser.verified::", newUser.verified);
      const newAccessToken = generateAccessToken({ username, email });
      const newrefreshToken = generaterefreshToken({ username, email });
      sendTocookie(res, newAccessToken, newrefreshToken);
      

      if (!newUser.verified) {
        const url = `${process.env.BASE_URL}/users/${newUser.id}/verify/${newAccessToken}`;
        await sendEmail(newUser, "해피데빙 인증메일", url);
      }

      return res.status(201).send({
        newUser,
        accessToken: newAccessToken,
        message: "An Email sent to your account please verify",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  patch: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) return res.status(400).send({ message: "Invalid link" });

      if (!req.cookies.accessToken) {
        return res.status(400).send({ message: "Invalid link" });
      }

      await User.update(
        { verified: true },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
