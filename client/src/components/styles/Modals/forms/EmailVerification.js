import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../../../features/modal/modalSlice";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ConfirmTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ConfirmButton = styled.button`
  margin-top: 10%;
  padding: 3px 15px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;

  &:hover {
    color: #5e17eb;
  }
`;

const ConfirmSubtitle = styled.p`
  font-size: 14px;
  padding: 5%;

  /* margin-bottom: 10%; */
`;

const EmailVerification = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Div>
        <ConfirmTitle>회원가입 인증메일이 발송되었습니다.</ConfirmTitle>
        <ConfirmSubtitle>메일함을 확인해 주세요.</ConfirmSubtitle>

        <ConfirmButton
          onClick={async () => {
            dispatch(closeModal());
          }}
        >
          확인
        </ConfirmButton>
      </Div>
    </>
  );
};
export default EmailVerification;
