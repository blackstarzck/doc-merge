import styled from "styled-components";

import { flattenObject } from "../../../utils";

const Text = ({ children, styles }) => {
  return <TextWrapper style={{ ...styles }}>{children}</TextWrapper>;
};

const TextWrapper = styled.div`
  padding: 12px;
`;

export default Text;
