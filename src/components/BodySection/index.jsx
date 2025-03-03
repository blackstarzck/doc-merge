import styled from "styled-components";

import ActionHandler from "../ActionHandler";
import BodySelectSection from "../BodySelectSection";
import FormatHandler from "../FormatHandler";
import TableSection from "../TableSection";

const BodySection = () => {
  return (
    <Wrapper>
      <BodySelectSection />
      <FormatHandler />
      <TableSection />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 18px;
  flex-direction: column;
  height: 100%;
`;

export default BodySection;
