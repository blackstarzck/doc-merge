import { App, Button, Divider, Form, Input, InputNumber, Modal } from 'antd'
import { Fragment, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { FORM_FILEDS } from '../../constants/menu'

const titleMap = {
  client: {
    register: '거래처 등록',
    edit: '거래처 수정',
  },
  vendor: {
    register: '거래처 등록',
    edit: '거래처 수정',
  },
  mark_info: {
    register: '거래처 등록',
    edit: '거래처 수정',
  },
  organization: {
    register: '기관 등록',
    edit: '기관 수정',
  },
}

const RegisterModal = ({ table, subTitle, modal, setModal, handleCreate, handleUpdate }) => {
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const title = useMemo(() => {
    const action = modal.data?.id ? 'edit' : 'register'
    return titleMap[table][action]
  }, [modal.data])

  const onSubmit = async () => {
    try {
      const rawValues = await form.validateFields()
      console.log('rawValues: ', rawValues)
      console.log('modal.data: ', modal.data)

      const values = Object.fromEntries(
        Object.entries(rawValues).map(([key, value]) => [key, value ?? '']) // undefined를 ''로 변환
      )

      console.log('values: ', values)

      if (modal.data?.id) {
        handleUpdate({ ...modal.data, ...values })
      } else {
        handleCreate({ ...modal.data, ...values })
      }
    } catch (error) {
      console.log('save failed. ', error)
      message.error('유효성 검사 실패! 필수 항목을 확인해주세요.')
    }
  }

  useEffect(() => {
    if (modal.data) {
      form.setFieldsValue({ ...modal.data })
    }
  }, [modal.data])

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [modal.open])

  return (
    <ModalWrapper
      centered
      open={modal.open}
      title={
        <Fragment>
          <h4>{title}</h4>
          <span style={{ fontSize: 14, fontWeight: 400, color: '#a7a7a7' }}>{subTitle}</span>
          <Divider />
        </Fragment>
      }
      onCancel={() => setModal((prev) => ({ modal: null, open: false }))}
      footer={() => (
        <Button type="primary" size="large" onClick={() => onSubmit()}>
          {modal.data ? '수정' : '등록'}
        </Button>
      )}
    >
      <Form
        form={form}
        name={table}
        autoComplete="off"
        labelCol={{ span: 6 }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        {FORM_FILEDS[table].map((field) => (
          <Fragment key={field.key}>
            {field.type === 'input' && (
              <Form.Item name={field.key} label={field.name} rules={[{ required: field.required, message: field.errMsg }]}>
                <Input placeholder={modal.data && field.key === 'required' ? modal.data[field.key] : '-'} />
              </Form.Item>
            )}
            {field.type === 'textarea' && (
              <Form.Item name={field.key} label={field.name} rules={[{ required: field.required, message: field.errMsg }]}>
                <Input.TextArea placeholder={modal.data && field.key === 'required' ? modal.data[field.key] : '-'} autoSize={{ minRows: 2, maxRows: 2 }} />
              </Form.Item>
            )}
            {field.type === 'inputnumber' && (
              <Form.Item name={field.key} label={field.name} rules={[{ required: field.required, message: field.errMsg }]}>
                <InputNumber placeholder={modal.data && field.key === 'required' ? modal.data[field.key] : '-'} />
              </Form.Item>
            )}
          </Fragment>
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
