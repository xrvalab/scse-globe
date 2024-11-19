import styled from "styled-components";

const Button = styled.button<{ theme: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7vw;
  color: white;
  min-width: 4vw;
  min-height: 4vw;
  font-weight: bold;
  text-transform: uppercase;
  background: none;
  border: none;
  border-radius: 0.4vw;
  background-color: white;
  display: flex;
  padding: 0.5vh;
  backdrop-filter: blur(10px);
  background: ${({ theme }) =>
    theme === true ? "#35142a2a" : "rgba(255, 255, 255, 0.1)"};
  box-shadow: 0px 0px 16px rgba(45, 45, 45, 0.05);
  cursor: pointer;
  margin-right: 0.5vw;

  i + span {
    margin-left: 1vw;
  }

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:after {
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    content: attr(data-tooltip);
    position: absolute;
    top: -3.5vh;
    left: 50%;
    transform: translateX(-50%);
    height: 3vh;
    line-height: 3vh;
    color: white;
    white-space: nowrap;
    font-size: 0.8vw;
    backdrop-filter: blur(10px);
    background: ${({ theme }) =>
      theme === true ? "#35142a2a" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 1vw;
    padding: 0px 0.75vw;
    pointer-events: none;
    z-index: 100;
  }

  &:hover[data-tooltip]::after {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
`;

export default Button;
