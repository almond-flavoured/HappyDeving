import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeStudy, reset } from "../../../../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { closeModal } from "../../../../features/modal/modalSlice";
import LoadingIndicator from "../../../LoadingIndicator";

const ConfirmTitle = styled.h2`
  font-size: 16px;
`;
// const ConfirmSubtitle = styled.p`
//   font-size: 14px;
//   /* margin-bottom: 10%; */
// `;
const ConfirmButton = styled.button`
  margin-left: 38%;
  margin-top: 25%;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;

  &:hover {
    color: #5e17eb;
  }
`;

const WriteStudy = (props) => {
  console.log("WriteStudy props: ", props); // { userId: user.id, ...data }
  const { isLoading } = useSelector((state) => state.allStudies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div>
        <ConfirmTitle>게시글이 등록되었습니다!</ConfirmTitle>
        {/* <ConfirmSubtitle>수정 후에는 이전 정보로 되돌릴 수 없습니다.</ConfirmSubtitle> */}
        <ConfirmButton
          onClick={async () => {
            await dispatch(writeStudy(props));
            dispatch(reset());
            dispatch(closeModal());
            navigate("/mystudy");
          }}
        >
          확인
        </ConfirmButton>
      </div>
    </>
  );
};
export default WriteStudy;
