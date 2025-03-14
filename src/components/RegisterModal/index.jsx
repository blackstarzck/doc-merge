import { Button, Form, Input, message, Modal } from 'antd'
import { useEffect } from 'react'
import styled from 'styled-components'

import { FORM_FILEDS } from '../../constants/menu'

const RegisterModal = ({ title, formKey, isModalOpen, setModalOpen }) => {
  const [form] = Form.useForm()

  const onsubmit = async () => {
    try {
      const values = await form.validateFields()
      console.log('values: ', values)
      message.success('저장 성공!')
      setModalOpen(false)
    } catch (error) {
      console.log('save failed. ', error)
      message.error('유효성 검사 실패! 필수 항목을 확인해주세요.')
    }
  }

  useEffect(() => {
    return () => {
      console.log('RegisterModal unmount')
      setTimeout(() => {
        form.resetFields()
      }, 200)
    }
  }, [isModalOpen])

  return (
    <ModalWrapper
      centered
      open={isModalOpen}
      title={`+${title} 신규등록`}
      onCancel={() => setModalOpen(false)}
      footer={() => (
        <Button type="primary" size="large" onClick={() => onsubmit()}>
          저장
        </Button>
      )}
    >
      <Form
        form={form}
        name={formKey}
        autoComplete="off"
        labelCol={{ span: 4 }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        {FORM_FILEDS[formKey].map((field) => (
          <>
            {field.type === 'input' && (
              <Form.Item name={field.key} label={field.name} rules={[{ required: field.required, message: field.errMsg }]}>
                <Input placeholder="-" />
              </Form.Item>
            )}
            {field.type === 'textarea' && (
              <Form.Item name={field.key} label={field.name} rules={[{ required: field.required, message: field.errMsg }]}>
                <Input.TextArea placeholder="-" autoSize={{ minRows: 3, maxRows: 3 }} />
              </Form.Item>
            )}
          </>
        ))}
      </Form>
    </ModalWrapper>
  )
}

const ModalWrapper = styled(Modal)`
  & .ant-modal-header {
    margin-bottom: 24px;
  }
`

export default RegisterModal
