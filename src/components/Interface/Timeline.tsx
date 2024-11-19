import styled, { keyframes } from "styled-components";

const timeline = keyframes`
0% {
  width: 0px;
}
100% {
  width: 266px; // FIXME: Dynamic based on divider and button widths
}
`;

const Timeline = styled.div<{
  visible: boolean;
  theme: boolean;
  focusTime: number;
  globeOnlyMode: boolean;
  showcaseMode: boolean;
}>`
  position: absolute;
  bottom: -1.9vh;
  width: 17.5vw;
  height: 1vh;
  border-radius: 0.5vh;
  background-color: ${({ theme }) =>
    theme === true ? "#35142a2a" : "rgba(255, 255, 255, 0.1)"};
  transition: opacity 1s ease-in-out;
  opacity: ${({ visible, globeOnlyMode, showcaseMode }) =>
    visible && !globeOnlyMode && !showcaseMode ? "1" : "0"};
  transition: opacity 1s ease-in-out;

  &:before {
    opacity: ${({ visible }) => (visible === true ? "1" : "0")};
    content: "";
    position: absolute;
    height: 0.4vh;
    top: 0.3vh;
    left: 0.3vh;
    width: 0px;
    background-color: white;
    border-radius: 3px;
    animation: ${timeline} ${({ focusTime }) => focusTime}s linear infinite;
  }
`;

export default Timeline;
