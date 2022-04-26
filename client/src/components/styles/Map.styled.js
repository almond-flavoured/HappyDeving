// import Section from "../styles/Section.styled";
// import React, { useEffect } from "react";

// const Map = () => {
//   useEffect(() => {
//     let options = {
//       center: new window.kakao.maps.LatLng(35.85133, 127.734086),
//       level: 13,
//     };

//     let map = new window.kakao.maps.Map(<Section />, options);

//     console.log("loading kakaomap");
//   }, []);

//   return (
//     <div className={"Map"}>
//       <Section />
//     </div>
//   );
// };

// export default Map;

import React from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";

const StyledMap = styled(Content)`
  grid-column: 3 / 13;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;

const Map = () => {
  return <StyledMap>Map Page</StyledMap>;
};

export default Map;
