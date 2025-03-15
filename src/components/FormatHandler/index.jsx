import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Form, Input, Select, Space, Tag } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { TABLE_ELEMENTS } from '../../constants/options'
import { setFormat } from '../../store/format/formatSlice'
import { addFormatItem, FORMATTER_MODAL_NAME, removeFormatItem, selectAllFormatItems } from '../../store/formatItems/formatItemsSlice'
import { updateContents } from '../../store/modals/modalsSlice'
import FormatModal from '../FormatModal'

const setUniqueNumber = (array) => {
  // "custom-"으로 시작하는 항목 필터링 및 숫자 추출
  const customNumbers = array
    .map((item) => item.key.match(/^custom-(\d+)$/)) // "custom-" 다음 숫자 찾기
    .filter(Boolean) // null 값 제거
    .map((match) => Number(match[1])) // 숫자로 변환

  let newNumber

  if (customNumbers.length === 0) {
    // "custom-" 항목이 없으면 첫 번째 항목으로 "custom-1" 추가
    newNumber = 1
  } else {
    // 1부터 최대 숫자 사이에서 비어있는 숫자 찾기
    for (let i = 1; i <= Math.max(...customNumbers) + 1; i++) {
      if (!customNumbers.includes(i)) {
        newNumber = i
        break
      }
    }
  }
  return newNumber
}

const FormatHandler = () => {
  const [form] = Form.useForm()
  const inputRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const formatItems = useSelector(selectAllFormatItems)
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const onNameChange = (event) => {
    setIsDisabled((prev) => !form.getFieldValue('customFormatName'))
  }

  const addItem = (e) => {
    form
      .validateFields()
      .then(() => {
        const newNumber = setUniqueNumber(formatItems)
        const item = {
          key: `custom-${newNumber}`,
          label: form.getFieldValue('customFormatName'),
          elements: {
            all: null,
            first_columns_repeat: null,
            second_columns_repeat: null,
            first_rows_repeat: null,
            second_rows_repeat: null,
            last_column: null,
            first_column: null,
            header_row: null,
            footer_row: null,
          },
        }
        TABLE_ELEMENTS.forEach((element) => {
          item.elements = { ...item.elements, [element.key]: null }
        })
        console.log('item: ', item)
        dispatch(addFormatItem(item))

        form.setFieldValue('customFormatName', '')

        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      })
      .catch((error) => {
        console.log('Validation failed:', error)
      })
  }

  const onClickDeleteFormat = (e, key) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(removeFormatItem(key))
  }

  const onClickEditFormat = (e, key) => {
    e.preventDefault()
    e.stopPropagation()

    const find = formatItems.find((item) => item.key === key)

    console.log('find: ', find)

    dispatch(
      updateContents({
        visible: true,
        modalName: FORMATTER_MODAL_NAME,
        key,
        label: find.label,
        elements: find.elements,
      })
    )
  }

  const validateSameName = (_, value) => {
    const filter = formatItems.filter((item) => item.label === value)
    const isSameName = filter.length > 0

    if (isSameName) {
      return Promise.reject(new Error('존재하는 서식이름입니다'))
    }
    return Promise.resolve()
  }

  return (
    <>
      <Wrapper>
        <Select
          open={dropdownOpen}
          defaultValue={formatItems[0].label}
          style={{ width: 300 }}
          onSelect={(key) => {
            const find = formatItems.find((item) => item.key === key)

            console.log('find: ', find)

            const filtered = Object.entries(find.elements)
              .filter(([key, value]) => value)
              .map((item) => ({ [item[0]]: item[1] }))

            console.log('filtered: ', filtered)

            if (filtered.length > 0) dispatch(setFormat(find))
            if (filtered.length === 0)
              dispatch(
                updateContents({
                  visible: true,
                  modalName: FORMATTER_MODAL_NAME,
                  key,
                  label: find.label,
                  elements: find.elements,
                })
              )
          }}
          onDropdownVisibleChange={(visible) => {
            setDropdownOpen(visible)
            form.setFieldValue('customFormatName', '')
          }}
          optionLabelProp="key"
          options={formatItems.map((item) => ({
            label: (
              <OptionWrapper>
                <div>
                  {item.key.includes('custom') && <Tag color="magenta">새 서식</Tag>}
                  <span>{item.label}</span>
                </div>
                {item.key.includes('custom') && (
                  <Flex gap={6}>
                    <Button
                      variant="text"
                      color="defalut"
                      icon={<EditOutlined style={{ color: '#a0a0a0' }} />}
                      onClick={(e) => {
                        setDropdownOpen(false)
                        onClickEditFormat(e, item.key)
                      }}
                    />
                    <Button
                      variant="text"
                      color="defalut"
                      icon={<DeleteOutlined style={{ color: '#a0a0a0' }} />}
                      onClick={(e) => {
                        setDropdownOpen(false)
                        onClickDeleteFormat(e, item.key)
                      }}
                    />
                  </Flex>
                )}
              </OptionWrapper>
            ),
            value: item.key,
            key: item.label,
          }))}
          placeholder="서식을 선택해주세요"
          dropdownRender={(menu) => {
            return (
              // customized dropdown
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <FormWrapper form={form} onFinish={addItem} autoComplete="off">
                    <Form.Item name="customFormatName" rules={[{ validator: validateSameName }]}>
                      <Input ref={inputRef} allowClear autoSave="off" onChange={onNameChange} onKeyDown={(e) => e.stopPropagation()} />
                    </Form.Item>
                    <Form.Item>
                      <Button label={null} htmlType="submit" disabled={isDisabled} type="text" icon={<PlusOutlined />}>
                        Add item
                      </Button>
                    </Form.Item>
                  </FormWrapper>
                </Space>
              </>
            )
          }}
        />
      </Wrapper>

      <FormatModal />
    </>
  )
}

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const FormWrapper = styled(Form)`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 8px;
`

export default FormatHandler
