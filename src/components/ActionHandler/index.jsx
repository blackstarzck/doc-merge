import { Button } from "antd";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";

const ActionHandler = () => {
  const selectedRows = useSelector((state) => {
    return state.selectedRows.data || [];
  }, shallowEqual);

  useEffect(() => {
    // console.log("selectedRows: ", selectedRows);
  }, [selectedRows]);

  return (
    <Wrapper>
      <Button
        disabled={selectedRows.length === 0}
        size="large"
        danger
        type="text"
      >
        삭제
      </Button>
      <Button size="large" type="primary">
        저장
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ActionHandler;
