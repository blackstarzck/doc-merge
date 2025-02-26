import { UploadOutlined } from "@ant-design/icons"
import { message, Upload } from "antd"
import axios from "axios"
import styled from "styled-components"

const { Dragger } = Upload

const UploadZone = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const props = {
    name: "file",
    multiple: false,
    // accept: ".xlsx, .xls",
    showUploadList: false,
    action: "http://localhost:3000/organizations",
    beforeUpload: (file) => {
      console.log("beforeUpload: ", file)

      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")

      if (!isExcel) {
        messageApi.open({
          type: "error",
          content: "엑셀 파일만 업로드할 수 있습니다.",
        })
        return false
      }

      return true
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await axios.post(
          "http://localhost:3000/organizations",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        messageApi.open({ type: "success", content: "파일 업로드 성공!" })
        console.log("response data: ", response.data)
        onSuccess(response.data)
      } catch (error) {
        messageApi.open({ type: "error", content: "파일 업로드 실패." })
        onError(error)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  return (
    <Wrapper>
      {contextHolder}
      <Dragger {...props}>
        <InnerWrapper>
          <UploadOutlined className="!text-gray-400" />
          <p className="text-gray-400">업로드</p>
        </InnerWrapper>
      </Dragger>
    </Wrapper>
  )
}

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
