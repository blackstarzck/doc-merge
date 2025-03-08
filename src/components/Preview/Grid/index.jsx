import { Col, Row } from "antd";
import styled from "styled-components";

const ROW_COUNT = 6;
const COL_COUNT = 7;
const rows = Array.from({ length: ROW_COUNT * COL_COUNT });

const Grid = ({ settings, styles }) => {
  // console.log("Settings", settings);

  return (
    <Wrapper>
      <Row gutter={[4, 4]}>
        {rows.map((_, colIndex) => (
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
  font-size: 10px;
  padding: 6px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Grid;
