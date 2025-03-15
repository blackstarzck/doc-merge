import { Button, Form, Input, message, Modal } from 'antd'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { FORM_FILEDS } from '../../constants/menu'
import { createClient, getAllClientInfo, updateClient } from '../../store/clientInfo/clientInfoSlice'

const RegisterModal = ({ title, table, modal, setModal }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onsubmit = async () => {
    try {
      let values = await form.validateFields()
      console.log('values: ', values)
      console.log('modal.data: ', modal.data)
      if (modal.data?.id) {
        dispatch(updateClient({ id: modal.data.id, ...values })).then(() => {
          message.success('수정 성공!')
          setModal((prev) => ({ ...prev, open: false }))
        })
      } else {
        dispatch(createClient(values)).then(() => {
          message.success('저장 성공!')
          setModal((prev) => ({ ...prev, open: false }))
        })
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
      title={modal.data ? `(${title}) 거래처 수정하기` : `(${title}) 거래처 신규등록`}
      onCancel={() => setModal((prev) => ({ modal: null, open: false }))}
      footer={() => (
        <Button type="primary" size="large" onClick={() => onsubmit()}>
          {modal.data ? '수정' : '등록'}
        </Button>
      )}
    >
      <Form
        form={form}
        name={table}
        autoComplete="off"
        labelCol={{ span: 4 }}
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
                <Input allowClear placeholder={modal.data ? modal.data[field.key] : '-'} />
              </Form.Item>
            )}
            {field.type === 'textarea' && (
              <Form.Item name={field.key} label={field.name} rules={[{ required: field.required, message: field.errMsg }]}>
                <Input.TextArea allowClear placeholder={modal.data ? modal.data[field.key] : '-'} autoSize={{ minRows: 3, maxRows: 3 }} />
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
