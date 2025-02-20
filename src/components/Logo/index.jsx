import styled from "styled-components";

const Logo = () => {
  return (
    <LogoWrapper>
      <h1>문서통합 프로그램</h1>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  font-size: 18px;
  color: #ffffff;
  padding: 32px 16px;

  & > h1 {
    font-size: 18px;
    position: relative;
    padding-left: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &::before {
      content: "";
      display: block;
      width: 4px;
      height: 90%;
      background-color: #1677ff;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
    }
  }
`;

export default Logo;
