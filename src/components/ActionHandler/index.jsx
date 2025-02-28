import { Button } from "antd"
import { useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { useDocumentId } from "../../hooks/useDocumentId"
import { updateDocument } from "../../store/document/documentSlice"

const ActionHandler = () => {
  const documentId = useDocumentId()
  const document = useSelector((state) => {
    return state.document.data || []
  }, shallowEqual)
  const selectedRows = useSelector((state) => {
    return state.selectedRows.data || []
  }, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log("selectedRows: ", selectedRows);
  }, [selectedRows])

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
      <Button
        size="large"
        type="primary"
        onClick={() => {
          console.log("저장: ", document)
          dispatch(updateDocument({ documentId, document }))
        }}
      >
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
