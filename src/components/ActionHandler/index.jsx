import { Button, Popconfirm } from "antd";
import styled from "styled-components";

const ActionHandler = ({ selected, onRemoveRows, onSave }) => {
  return (
    <Wrapper>
      <Popconfirm
        title="삭제하시겠습니까?"
        onConfirm={onRemoveRows}
        okText="Yes"
        cancelText="No"
      >
        <Button disabled={!selected.length} size="large" danger type="text">
          삭제
        </Button>
      </Popconfirm>

      <Button size="large" type="primary" onClick={onSave}>
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
