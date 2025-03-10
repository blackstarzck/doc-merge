import { Divider, Select, theme } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { useDocumentId } from "../../hooks/useDocumentId"
import {
  getOrgNames,
  selectAllNames,
} from "../../store/organizationNames/organizationNamesSlice"

const defaultVal = 0

const SiderSelectSection = ({ handleDocumentId }) => {
  const { documentId, organizationId } = useDocumentId()
  const [isSelected, setIsSelected] = useState(false)
  const names = useSelector(selectAllNames)
  const dispatch = useDispatch()
  const {
    token: { colorPrimary },
  } = theme.useToken()

  useEffect(() => {
    dispatch(getOrgNames())
  }, [])

  useEffect(() => {
    setIsSelected(() => (documentId ? false : true))
  }, [documentId, organizationId])

  useEffect(() => {
    // console.log("names: ", names);
  }, [names])

  return (
    <Wrapper>
      <Divider style={{ borderColor: "rgba(255, 255, 255, .3)" }} />
      <SelectWrapper
        showSearch
        size="large"
        value={organizationId || defaultVal}
        $isSelected={isSelected}
        $primary={colorPrimary}
        optionFilterProp="label"
        onChange={(value) => handleDocumentId(value)}
        options={[
          { value: defaultVal, label: "문서를 선택해주세요", disabled: true },
          ...names.map((organization) => ({
            value: organization.id,
            label: organization.name,
          })),
        ]}
      />
      {}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0 4px;
`

const SelectWrapper = styled(Select)`
  width: 100%;

  & .ant-select-selector {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-color: ${(props) =>
      props.$isSelected
        ? props.$primary
        : "rgba(255, 255, 255, 0.1)"} !important;

    & .ant-select-selection-placeholder {
      color: rgba(255, 255, 255, 0.65) !important;
      font-size: 14px;
    }
  }
  & .ant-select-arrow {
    transform: translate(50%, 50%);
    top: 40%;
    right: 10%;
  }
  & .ant-select-arrow,
  .ant-select-selection-item {
    font-size: 14px;
    color: ${(props) =>
      props.$isSelected ? props.$primary : "#ffffff"} !important;
  }
`

export default SiderSelectSection
