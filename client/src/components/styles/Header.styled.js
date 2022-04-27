import styled from "styled-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSigninModal } from "../../features/modal/modalSlice";
import { Link, useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  font-family: "Bold";
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 3/13;
  position: relative;

  > .logo {
    width: 200px;
    margin-left: 0px;
  }
  > div {
    color: #5e17eb;
    text-align: center;
    font-size: 25px;
    font-family: "hanna";

    .write {
      margin-right: 20px;
    }
    .login {
      margin-right: 20px;
    }
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 0 0 100% 100%;
  background-color: rgb(255, 255, 0);
  margin-top: -150px;
  margin-bottom: 20px;
  grid-column: 1/15;
`;

const Header = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <StyledHeader>
        <img
          onClick={goToHome}
          className="logo"
          src="https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png"
        />
        <div>
          <Link to="/write">
            <span className="write">새 글 쓰기</span>
          </Link>
          {user ? (
            <span className="mypage">마이페이지</span>
          ) : (
            <span onClick={() => dispatch(openSigninModal(true))} className="login">
              로그인
            </span>
          )}
        </div>
      </StyledHeader>
      <Circle />
    </>
  );
};

export default Header;
