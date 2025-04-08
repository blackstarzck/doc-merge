import { EditOutlined, EllipsisOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, Flex, message, Select, Space, Upload } from 'antd'
import { theme } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import RegisterModal from '../RegisterModal'

const { useToken } = theme

const mapper = {
  vendor: { en: 'vendor', kr: '매입처 원장' },
  client: { en: 'client', kr: '매출처 원장' },
  mark_info: { en: 'mark_info', kr: '마크장비 진행현황' },
}

const SelectField = ({ option, table }) => {
  const [modal, setModal] = useState({
    open: false,
    data: null,
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { token } = useToken()
  const [messageApi, contextHolder] = message.useMessage()
  const props = useMemo(
    () => ({
      name: 'file',
      multiple: false,
      accept: '.xlsx, .xls',
      showUploadList: true,
      beforeUpload: (file) => {
        const isExcel =
          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'application/vnd.ms-excel' ||
          file.name.endsWith('.xlsx') ||
          file.name.endsWith('.xls')

        if (!isExcel) {
          messageApi.open({ type: 'error', content: '엑셀 파일만 업로드할 수 있습니다.' })
          return false
        }

        return true
      },
      customRequest: async ({ file, onSuccess, onError }) => {
        const url = `${import.meta.env.VITE_API_URL}/upload/${mapper[table].en}`
        const header = { 'Content-Type': 'multipart/form-data' }
        const formData = new FormData()
        formData.append('file', file)
        try {
          const response = await api.post(url, {}, header).then((res) => res)

          console.log('response: ', response)

          messageApi.open({ type: 'success', content: '파일 업로드 성공!' })
          onSuccess(response.data)
        } catch (error) {
          console.log('error: ', error)
          messageApi.open({ type: 'error', content: '파일 업로드 실패.' })
          onError(error)
        }
      },
      onDrop(e) {},
    }),
    []
  )
  const items = useMemo(() => {
    return [
      {
        label: (
          <Upload {...props}>
            <Space style={{ width: '100%', height: 32 }}>
              <UploadOutlined />
              {mapper[table].kr} 업로드
            </Space>
          </Upload>
        ),
        key: 0,
      },
      {
        type: 'divider',
      },
      {
        label: (
          <Space style={{ width: '100%', height: 32 }} onClick={() => onClickOpenModal()}>
            <FormOutlined />
            거래처 등록
          </Space>
        ),
        key: 1,
      },
    ]
  }, [])

  const onClickOpenModal = useCallback((data) => {
    setTimeout(() => setModal((prev) => ({ data, open: true })), 200)
  }, [])

  const onClickEdit = useCallback(
    (e, id) => {
      e.preventDefault()
      e.stopPropagation()

      const find = option.find((item) => item.id === id)
      console.log('find: ', find)
      setTimeout(() => onClickOpenModal(find), 200)
    },
    [option, onClickOpenModal]
  )

  const selectOptions = useMemo(() => {
    return option.map((item) => ({
      name: item.name,
      value: item.id,
      label: (
        <Flex align="center" justify="space-between">
          <Name>{item.name}</Name>
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
    }))
  }, [option, onClickEdit])

  return (
    <>
      <Space wrap size="small">
        <span>{mapper[table].kr}</span>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                optionSelectedColor: token.colorPrimary,
              },
            },
          }}
        >
          <Space.Compact block>
            <SelectWrapper
              open={dropdownOpen}
              showSearch
              placeholder={`${mapper[table].kr}을 선택해주세요`}
              onDropdownVisibleChange={(visible) => setDropdownOpen(visible)}
              optionFilterProp="name"
              optionLabelProp="name"
              options={selectOptions}
            />

            <Dropdown menu={{ items }} trigger={['click']}>
              <Button icon={<EllipsisOutlined />}></Button>
            </Dropdown>
          </Space.Compact>
        </ConfigProvider>
      </Space>
      <RegisterModal modal={modal} setModal={setModal} subTitle={mapper[table].kr} table={table} />
    </>
  )
}

const Name = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`

const SelectWrapper = styled(Select)`
  width: 310px;

  & .ant-select-selection-item {
    font-size: 14px;
  }
`

export default React.memo(SelectField)
