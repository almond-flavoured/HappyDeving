import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Container from "./components/styles/Container.styled";
import Header from "./components/styles/Header.styled";
import { Search } from "./components/styles/Search.styled";
// import Footer from "./components/styles/Footer.styled";
import Landing from "./pages/Landing";
import Write from "./components/styles/WriteStudyDesc.styled";
import Map from "./components/styles/Map.styled";
import Study from "./components/styles/StudyDesc.styled";
import MyStudy from "./pages/MyStudy";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import LikedStudy from "./pages/LikedStudy";
import EditStudyDesc from "./components/styles/EditStudyDesc.styled";
import "./static/fonts/font.css";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Slider from "./components/Slider";

import landing_01 from "../src/assets/AdobeStock_434132331.jpeg";
import landing_02 from "../src/assets/AdobeStock_340974671.jpeg";
import landing_03 from "../src/assets/AdobeStock_347708874.jpeg";
import "./App.css";
import axios from "axios";
import { Github_url } from "./config";
import WriteButtonModal from "./WriteButtonModal.styled";
import BottomMenu from "./components/styles/bottommenu.styled";
// import Content from "./components/styles/Content.styled";
import ConfirmModal from "./components/styles/Modals/ConfirmModal";

function App() {
  const theme = {
    colors: {
      purple: "#5E17EB",
      lavender: "#C593FE",
      bg: "#d8e4f4",
    },
    icons: {
      logo: "https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png",
      write: "https://cdn.discordapp.com/attachments/965506579564732419/968872695011885076/7.png",
      login: "https://cdn.discordapp.com/attachments/965506579564732419/968872695255142420/8.png",
      mypage: "https://cdn.discordapp.com/attachments/965506579564732419/969043355067617321/9.png",
    },
    contents: {
      marginBottom: "20px",
      bg: "white",
      borderRadius: "30px",
      boxShadow: "10px 5px 15px 0.1px rgba(0, 0, 0, 0.1)",
    },
    font: {},
  };

  let login = localStorage.getItem("login");
  const getGithubAccessToken = async (authorizationCode) => {
    localStorage.setItem("reload", true);
    let resp = await axios.post(Github_url, {
      authorizationCode: authorizationCode,
    });
    const { user } = resp.data;
    const { accessToken } = resp.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(accessToken));
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    // navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (login === "github" && localStorage.getItem("reload") !== "true") {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      if (authorizationCode) {
        getGithubAccessToken(authorizationCode);
      }
    }
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <Header img={theme.icons} />
          <ConfirmModal />
          <div className="App">
            <header className="App-header"></header>
          </div>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  {/* <Search /> */}
                  <Landing imageSrc={landing_01} />
                  <Slider
                    imageSrc={landing_02}
                    title={`" 위치 기반 검색 "`}
                    subtitle={"당신의 주변에서 일어나고 있는 놀라운 프로젝트를 찾아보세요."}
                  />
                  <Slider
                    imageSrc={landing_03}
                    title={`" 같이의 가치 "`}
                    subtitle={"당신의 드림 프로젝트, 함께 하면 현실이 됩니다."}
                    flipped={true}
                  />
                  <WriteButtonModal />
                </>
              }
            />
            <Route path="/write" element={<Write />} />
            <Route
              path="/map"
              exact
              element={
                <>
                  <Search />
                  <Map />
                </>
              }
            />
            <Route path="/study/:id" element={<Study />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study/edit/:id" element={<EditStudyDesc />} />
            <Route
              path="/editprofile"
              element={
                <>
                  <ProfileEdit />
                </>
              }
            />
            <Route path="/mystudy" element={<MyStudy />} />
            <Route path="/likedStudy" element={<LikedStudy />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <BottomMenu />
          {/* <Footer /> */}
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
