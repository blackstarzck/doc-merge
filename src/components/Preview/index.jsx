import { Col, Row, theme } from "antd";
import styled from "styled-components";

const ROW_COUNT = 6;
const COL_COUNT = 7;

const Preview = ({ type, styles }) => {
  const {
    token: { colorBorder },
  } = theme.useToken();

  return (
    <Wrapper $colorBorder={colorBorder}>
      {type === "grid" ? (
        <PreviewGrid>
          <Row gutter={[4, 4]}>
            {Array.from({ length: ROW_COUNT * COL_COUNT }, (_, colIndex) => (
              <Col key={colIndex} span={4}>
                <Box>text-{colIndex}</Box>
              </Col>
            ))}
          </Row>
        </PreviewGrid>
      ) : (
        <PreviewText style={{ ...styles }}>맑은 고딕</PreviewText>
      )}
    </Wrapper>
  );
};

const PreviewGrid = styled.div`
  padding: 16px;
`;

const PreviewText = styled.div`
  font-family: "맑은 고딕", "Malgun Gothic", sans-serif;
  padding: 16px;
`;

const Box = styled.div`
  font-size: 12px;
  background-color: red;
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
