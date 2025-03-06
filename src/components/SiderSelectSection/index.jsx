import { Divider, Select, theme } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import useSWR from "swr"

import { useDocumentId } from "../../hooks/useDocumentId"
import fetcher from "../../lib/fetcher"

const SiderSelectSection = ({ handleDocumentId }) => {
  const { documentId, organizationId } = useDocumentId()
  const [isSelected, setIsSelected] = useState(false)
  const [options, setOptions] = useState([
    { value: 0, label: "문서를 선택해주세요", disabled: true },
  ])
  const { data, error, mutate } = useSWR("/organizations/names", fetcher)
  const {
    token: { colorPrimary },
  } = theme.useToken()

  console.log("organizationId: ", typeof organizationId)

  useEffect(() => {
    setIsSelected(() => (documentId ? false : true))
  }, [documentId, organizationId])

  useEffect(() => {
    if (data) {
      setOptions((prev) => {
        const options = data?.map((organization) => ({
          value: organization.id,
          label: organization.name,
        }))
        return [...prev, ...options]
      })
    }
  }, [data])

  return (
    <Wrapper>
      <Divider style={{ borderColor: "rgba(255, 255, 255, .3)" }} />
      <SelectWrapper
        showSearch
        size="large"
        value={organizationId || options[0].value}
        $isSelected={isSelected}
        $primary={colorPrimary}
        optionFilterProp="label"
        onChange={(value) => handleDocumentId(value)}
        options={options}
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
