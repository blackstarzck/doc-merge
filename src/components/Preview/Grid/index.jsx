import { Col, Row } from "antd";
import styled from "styled-components";

const ROW_COUNT = 6;
const COL_COUNT = 7;

const Grid = ({ settings, styles }) => {
  console.log("Settings", settings);

  return (
    <Wrapper>
      <Row gutter={[4, 4]}>
        {Array.from({ length: ROW_COUNT * COL_COUNT }, (_, colIndex) => (
          <Col key={colIndex} span={4}>
            <Box>text-{colIndex}</Box>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px;
`;

const Box = styled.div`
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.03);
`;

export default Grid;
