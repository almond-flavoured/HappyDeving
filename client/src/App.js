import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import Container from "../src/components/styles/Container.styled";
import Header from "../src/components/styles/Header.styled";
import Search from "../src/components/styles/Search.styled";
import Footer from "../src/components/styles/Footer.styled";
import SigninModal from "./components/styles/SigninModal.styled";
import SignupModal from "./components/styles/SignupModal.styled";
import Landing from "./pages/Landing";
import Write from "./pages/Write";
import Map from "././components/styles/Map.styled";
import Study from "./pages/Study";
import MyStudy from "./pages/MyStudy";
import Profile from "./pages/Profile";
import LikedStudy from "./pages/LikedStudy";
import axios from "axios";
import { REACT_APP_API_URL } from "./config";
import "./static/fonts/font.css";
import "./App.css";

function App() {
  const [info, setInfo] = useState("");
  const { signinModal, signupModal } = useSelector((store) => store.modal);

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
      marginBottom: "15px",
      bg: "white",
      borderRadius: "30px",
      boxShadow: "10px 5px 15px 0.1px rgba(0, 0, 0, 0.1)",
    },
    font: {},
  };

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/users/5`).then((res) => {
      setInfo(res);
      console.log("userInfo:: ", res);
    });
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <Header img={theme.icons} />

          <div className="App">
            <header className="App-header">
              <p>{info}</p>
              <p>{info.id}</p>
              <p>{info.firstName}</p>
              <p>{info.lastName}</p>
              <p>{info.email}</p>
            </header>
          </div>

          {signinModal ? <SigninModal /> : null}
          {signupModal ? <SignupModal /> : null}
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Search />
                  <Landing />
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
            />{" "}
            <Route path="/study/:id" element={<Study />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/mystudy" element={<MyStudy />} />
            <Route path="/likedStudy" element={<LikedStudy />} />
          </Routes>
          <Footer />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
