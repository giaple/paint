import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Image from "next/image";
import useClickOutside from "../hooks/useClickOutside";

const Modal = ({ show, onClose, children, title }) => {
  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const ref = useRef<null | HTMLDivElement>(null);
  useClickOutside(ref, () => {
    if (!show) return;
    onClose();
  });

  const modalContent = show ? (
    <StyledModalOverlay >
      <StyledModal ref={ref}>
        <CloseButton onClick={handleCloseClick}>
          <span style={{color: '#8c949b', fontSize: 25}}>x</span>
        </CloseButton>
        <StyledModalHeader>
        </StyledModalHeader>
        {/* {title && <StyledModalTitle>{title}</StyledModalTitle>} */}
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  return modalContent;
};

const CloseButton = styled.button`
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  width: 48px;
  height: 48px;
  position: absolute;
  top: -60px;
  right: 10px;
  box-shadow: 0px 0px 7px;
  font-size: 30px;
  margin: auto;
  line-height: 0;
`;

const StyledModalBody = styled.div``;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: auto;
  height: auto;
  position: relative;
`;
const StyledModalOverlay = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #252525;
`;

export default Modal;
