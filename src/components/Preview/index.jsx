import { Col, Row, theme } from "antd";
import styled from "styled-components";

import { flattenObject } from "../../utils";
import Grid from "./Grid";
import Text from "./Text";

const Preview = ({ elements, type, styles }) => {
  const flattened = flattenObject(styles);

  const {
    token: { colorBorder },
  } = theme.useToken();

  return (
    <Wrapper $colorBorder={colorBorder}>
      {type === "grid" ? (
        <Grid elements={elements} styles={flattened} />
      ) : (
        <Text styles={flattened}>맑은 고딕</Text>
      )}
    </Wrapper>
  );
};

const PreviewText = styled.div`
  font-family: "맑은 고딕", "Malgun Gothic", sans-serif;
  padding: 16px;
`;

const Wrapper = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $colorBorder }) => $colorBorder};
  border-radius: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Preview;
