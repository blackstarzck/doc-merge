import { UploadOutlined } from '@ant-design/icons'
import { message, Typography, Upload } from 'antd'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import api from '../../api/api'
import { getDocument } from '../../store/document/documentSlice'

const { Text } = Typography

const { Dragger } = Upload

const UploadZone = () => {
  const location = useLocation()
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch()
  const props = {
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
        messageApi.open({
          type: 'error',
          content: '엑셀 파일만 업로드할 수 있습니다.',
        })
        return false
      }

      return true
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await api
          .post(`${import.meta.env.VITE_API_URL}/upload${location.pathname}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res) => {
            dispatch(getDocument(location.pathname))
              .then((res) => {
                if (res.type.includes('fulfilled')) {
                  messageApi.open({ type: 'success', content: '파일 업로드 성공!' })
                  onSuccess(response.data) // UI 업데이트
                } else {
                  messageApi.open({ type: 'error', content: '파일 업로드 실패.' })
                  onError() // UI 업데이트
                }
              })
              .catch((error) => {
                messageApi.open({ type: 'error', content: '파일 업로드 실패.' })
                onError() // UI 업데이트
              })

            return res
          })

        console.log('response: ', response)
      } catch (error) {
        console.log('error: ', error)
        messageApi.open({ type: 'error', content: '파일 업로드 실패.' })
        onError(error) // UI 업데이트
      }
    },
    onDrop(e) {},
  }

  return (
    <Wrapper>
      {contextHolder}
      <span style={{ color: '#b4b4b4', fontSize: 12 }}>※ 파일 첫 행에 헤더를 넣어주세요.</span>
      <UploadWrapper {...props}>
        <InnerWrapper>
          <UploadOutlined className="!text-gray-400" />
          <p className="text-gray-400">업로드</p>
        </InnerWrapper>
      </UploadWrapper>
    </Wrapper>
  )
}

const UploadWrapper = styled(Dragger)`
  & .ant-upload-list-item .anticon,
  .ant-upload-list-item .ant-upload-list-item-name {
    color: #7e7e7e;
  }
  & .ant-upload-list-item-done .anticon,
  .ant-upload-list-item-done .ant-upload-list-item-name {
    color: #73b12c !important;
  }
  & .ant-upload-list-item-undefined .anticon,
  .ant-upload-list-item-undefined .ant-upload-list-item-name {
    color: #ff4d4f !important;
  }
`

const Wrapper = styled.div`
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
  padding: 10px;
`

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export default UploadZone
