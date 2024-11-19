import styled from "styled-components";

const InformationPanel = styled.section<{ show: boolean; theme: boolean }>`
  pointer-events: none;
  position: absolute;
  top: 5vh;
  left: ${({ show }) => (show === true ? "3vw" : "-2500px")};
  width: 49vw;
  font-size: 1vw;
  height: calc(100% - 29vh);
  border-radius: 1vw 8vw 1vw 1vw;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: ${({ theme }) =>
    theme === true
      ? "linear-gradient(to bottom left, #35142a7b, #35142a2a)"
      : "linear-gradient(to bottom left,rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0.025))"};
  box-shadow: 0px 0px 16px rgba(45, 45, 45, 0.05);
  padding: 2.2vw;
  transition: left ease-in-out 0.75s;
  overflow: hidden;

  .alumni-profile {
    text-transform: uppercase;
    font-style: italic;
    margin: 0px 0px 1.5vh 0px;
    font-weight: 300;
  }

  h2 {
    &.about {
      width: 100%;
      font-size: 4vw;
    }
    width: 34vw;
    margin: 0px;
    text-transform: uppercase;
    font-size: 4.8vw;
    line-height: 4vw;
    font-weight: 900;
    background: linear-gradient(to left, #ffedfb, #ffbced);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h3 {
    font-size: 1.7vw;
    margin: 2vh 0px 0px 0px;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    width: 34vw;
  }

  h4 {
    font-size: 1.25vw;
    margin: 0.8vh 0px 3vh 0px;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    font-weight: 300;
    font-style: italic;
  }

  ul,
  p {
    font-size: 1.45vw;
    margin-top: 1.8vh;
    margin-bottom: 1.8vh;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }

  ul {
    padding-left: 2.5vw;
  }
`;

export default InformationPanel;
