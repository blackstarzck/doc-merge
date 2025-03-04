import { Button } from "antd"
import styled from "styled-components"

const ActionHandler = ({ onRemoveRow, onSave }) => {
  return (
    <Wrapper>
      <Button size="large" danger type="text" onClick={onRemoveRow}>
        삭제
      </Button>
      <Button size="large" type="primary" onClick={onSave}>
        저장
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export default ActionHandler
