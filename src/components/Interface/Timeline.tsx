import styled, { keyframes } from "styled-components";
import { ITimeline } from "../../types";

const timeline = keyframes`
0% {
  width: 0px;
}
100% {
  width: calc(17.5vw - 4px); // FIXME: Dynamic based on divider and button widths
}
`;

const Timeline = styled.div<ITimeline>`
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
