import { Col, Row } from "antd";
import styled from "styled-components";

const ROW_COUNT = 7;
const COL_COUNT = 6;
const rows = Array.from({ length: ROW_COUNT * COL_COUNT });

const Grid = ({ elements }) => {
  const {
    all,
    first_columns_repeat,
    second_columns_repeat,
    first_rows_repeat,
    second_rows_repeat,
    last_column,
    first_column,
    header_row,
    footer_row,
  } = elements;

  console.log("[Grid component]", elements);

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
