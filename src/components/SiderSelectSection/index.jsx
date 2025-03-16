import { EditOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Select, theme } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { useIdsFromParams } from '../../hooks/useIdsFromParams'
import { getAllOrganization, selectAllOrganization } from '../../store/organization/organizationSlice'
import RegisterModal from '../RegisterModal'

const SiderSelectSection = ({ onClickSideMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { documentId, organizationId } = useIdsFromParams()
  const [isSelected, setIsSelected] = useState(false)
  const [modal, setModal] = useState({
    open: false,
    data: null,
  })
  const names = useSelector(selectAllOrganization)
  const dispatch = useDispatch()
  const {
    token: { colorPrimary, colorPrimaryBgHover },
  } = theme.useToken()

  useEffect(() => {
    dispatch(getAllOrganization())
  }, [])

  useEffect(() => {
    setIsSelected(() => (documentId ? false : true))
  }, [documentId, organizationId])

  const onClickOpenModal = useCallback((data) => {
    setTimeout(() => setModal((prev) => ({ data, open: true })), 200)
  }, [])

  const onClickEdit = useCallback(
    (e, id) => {
      e.preventDefault()
      e.stopPropagation()

      const find = names.find((item) => item.id === id)
      console.log('find: ', find)
      setTimeout(() => onClickOpenModal(find), 200)
    },
    [names, onClickOpenModal]
  )

  const selectOptions = useMemo(
    () =>
      names.map((item) => ({
        name: item.name,
        value: item.id,
        label: (
          <Flex align="center" justify="space-between">
            <span>{item.name}</span>
            <Flex gap={6}>
              <Button
                variant="text"
                color="defalut"
                icon={<EditOutlined style={{ color: '#a0a0a0' }} />}
                onClick={(e) => {
                  setDropdownOpen(false)
                  onClickEdit(e, item.id)
                }}
              />
            </Flex>
          </Flex>
        ),
      })),
    [names, onClickEdit]
  )

  return (
    <Wrapper>
      <Divider style={{ borderColor: 'rgba(255, 255, 255, .3)' }} />
      <SelectWrapper
        open={dropdownOpen}
        showSearch
        size="large"
        value={organizationId || null}
        $isSelected={isSelected}
        $primary={colorPrimary}
        optionFilterProp="name"
        optionLabelProp="name"
        onDropdownVisibleChange={(visible) => setDropdownOpen(visible)}
        onChange={(value) => onClickSideMenu(value)}
        placeholder="문서를 선택해주세요"
        options={selectOptions}
      />
      <div style={{ textAlign: 'right' }}>
        <ButtonWrapper $primary={colorPrimary} $hover={colorPrimaryBgHover} onClick={() => onClickOpenModal()}>
          등록
        </ButtonWrapper>
        <RegisterModal modal={modal} setModal={setModal} subTitle="도서납품현황" table="organization" />
      </div>
      {}
    </Wrapper>
  )
}

const ButtonWrapper = styled.button`
  text-decoration: underline;
  margin-top: 8px;
  padding: 8px 16px;
  color: ${({ $primary }) => $primary};
  border-radius: 5px;
  transition: background-color 0.15s;
  margin-right: 6px;

  &:hover {
    background-color: rgba(22, 119, 255, 0.1);
  }
`

const Wrapper = styled.div`
  width: 100%;
  padding: 0 4px;
`

const SelectWrapper = styled(Select)`
  width: 100%;

  & .ant-select-selector {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-color: ${(props) => (props.$isSelected ? props.$primary : 'rgba(255, 255, 255, 0.1)')} !important;

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
    color: ${(props) => (props.$isSelected ? props.$primary : 'rgba(255,255,255,0.65)')} !important;
  }

  & .ant-select-selector input {
    color: rgba(255, 255, 255, 0.65) !important;
  }
`

export default SiderSelectSection
