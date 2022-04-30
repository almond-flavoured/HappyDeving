//study.js
import axios from "axios";
import { REACT_APP_API_URL } from "../config";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

// 스터디 검색 결과
export const getStudiesMapApi = ({ guType, dongType, dateData, languageData }) => {
  let date = "2022-04-29";
  if (guType && dongType) {
    if (dateData && languageData) {
      return axios.get(
        `/search?guType=${guType}&dongType=${dongType}&date=${date}&language=${languageData}`
      );
    }
    if (dateData) {
      return axios.get(`/search?guType=${guType}&dongType=${dongType}&date=${date}`);
    }
    if (languageData) {
      return axios.get(`/search?guType=${guType}&dongType=${dongType}&language=${languageData}`);
    }
    return axios.get(`/search?guType=${guType}&dongType=${dongType}`);
  } else {
    return "location is required";
  }
};
// 스터디 상세 페이지
export const studyApi = ({ id }) => axios.get(`/study/${id}`);
// 스터디 글 삭제
export const deleteStudyApi = ({ id }) => axios.delete(`/study/${id}`);
// 찜 목록 스터디 불러오기
export const addLikedStudyApi = () => axios.get("/study/like");
//  찜 목록 스터디 삭제
export const UnLikedStudyApi = () => axios.delete("/study/like");
// 스터디 상세페이지
// 스터디 글쓰기 페이지
export const getMyStudyApi = (data) => axios.post("mystudy", data);
