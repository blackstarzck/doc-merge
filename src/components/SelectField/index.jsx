import { EllipsisOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, Form, Input, message, Modal, Select, Space, Tooltip, Upload } from 'antd'
import { theme } from 'antd'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { FORM_FILEDS } from '../../constants/menu'
import { getAllClientInfo } from '../../store/clientInfo/clientInfoSlice'
import { getAllVendorInfo } from '../../store/vendorInfo/vendorInfoSlice'
import RegisterModal from '../RegisterModal'

const { useToken } = theme

const mapper = {
  vendor: { en: 'vendor', kr: '매입처 원장' },
  client: { en: 'client', kr: '매출처 원장' },
  mark_info: { en: 'mark_info', kr: '마크장비 진행현황' },
}

const SelectField = ({ name, onChange, onSearch }) => {
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
        const url = `${import.meta.env.VITE_API_URL}/upload/${mapper[name].en}`
        const header = { 'Content-Type': 'multipart/form-data' }
        const formData = new FormData()
        formData.append('file', file)
        try {
          const response = await axios.post(url, {}, header).then((res) => res)

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
  const items = useMemo(
    () => [
      {
        label: (
          <Upload {...props}>
            <Space style={{ width: '100%' }}>
              <UploadOutlined />
              {mapper[name].kr} 업로드
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
          <Space style={{ width: '100%' }} onClick={() => onClickOpenModal()}>
            <FormOutlined />
            거래처 등록
          </Space>
        ),
        key: 1,
      },
    ],
    []
  )
  const dispatch = useDispatch()
  const [option, setOption] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (name === 'client') {
      dispatch(getAllClientInfo()).then((res) => {
        console.log('client: ', res.payload)
        setOption(res.payload)
      })
    }
    if (name === 'vendor') {
      dispatch(getAllVendorInfo()).then((res) => {
        console.log('vendor: ', res.payload)
        setOption(res.payload)
      })
    }
  }, [])

  const onClickOpenModal = () => {
    setTimeout(() => setModalOpen(true), 200)
  }

  return (
    <>
      <Space wrap size="small">
        <span>{mapper[name].kr}</span>
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
              // open={true}
              allowClear={true}
              showSearch
              placeholder={`${mapper[name].kr}을 선택해주세요`}
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={option.map((item) => ({ value: item.id, label: item.name }))}
            />

            <Dropdown menu={{ items }} trigger={['click']}>
              <Button icon={<EllipsisOutlined />}></Button>
            </Dropdown>
          </Space.Compact>
        </ConfigProvider>
      </Space>
      <RegisterModal title={mapper[name].kr} formKey={name} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

const SelectWrapper = styled(Select)`
  width: 310px;

  & .ant-select-selection-item {
    font-size: 14px;
  }
`

export default SelectField
