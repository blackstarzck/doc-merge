import { EditOutlined, EllipsisOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons'
import { App, Button, ConfigProvider, Dropdown, Flex, message, Select, Space, Tooltip, Upload } from 'antd'
import { theme } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import api from '../../../api/api'
import { useIdsFromParams } from '../../../hooks/useIdsFromParams'
import { createMarkClient, getAllMarkClient, selectAllMarkClient, updateMarkClient } from '../../../store/markClient/markClientSlice'
import RegisterModal from '../../RegisterModal'

const { useToken } = theme

const MarkStatus = () => {
  const { markInfoId } = useIdsFromParams()
  const markClients = useSelector(selectAllMarkClient) || []
  const dispatch = useDispatch()
  const [modal, setModal] = useState({
    open: false,
    data: null,
  })
  const [submitStatus, setSubmitStatus] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { token } = useToken()
  const { message } = App.useApp()
  const navigate = useNavigate()
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
          message.open({ type: 'error', content: '엑셀 파일만 업로드할 수 있습니다.' })
          return false
        }

        return true
      },
      customRequest: async ({ file, onSuccess, onError }) => {
        const url = `${import.meta.env.VITE_API_URL}/upload/mark_info`
        const header = { 'Content-Type': 'multipart/form-data' }
        const formData = new FormData()
        formData.append('file', file)
        try {
          const response = await api.post(url, {}, header).then((res) => res)

          console.log('response: ', response)

          message.open({ type: 'success', content: '파일 업로드 성공!' })
          onSuccess(response.data)
        } catch (error) {
          console.log('error: ', error)
          message.open({ type: 'error', content: '파일 업로드 실패.' })
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
          <Tooltip placement="right" title="납품처를 선택해주세요">
            <Upload disabled={true} {...props}>
              <Space style={{ width: '100%', height: 32 }}>
                <UploadOutlined />
                마크장비 진행현황 업르도
              </Space>
            </Upload>
          </Tooltip>
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
    ],
    []
  )

  const onClickOpenModal = useCallback((data) => {
    setTimeout(() => setModal((prev) => ({ data, open: true })), 200)
  }, [])

  const onClickEdit = useCallback(
    (e, id) => {
      e.preventDefault()
      e.stopPropagation()

      const find = markClients.find((item) => item.id === id)
      console.log('find: ', find)
      setTimeout(() => onClickOpenModal(find), 200)
    },
    [markClients, onClickOpenModal]
  )

  const selectOptions = useMemo(() => {
    return markClients.map((item) => ({
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
  }, [markClients, onClickEdit])

  const handleCreate = (values) => {
    dispatch(createMarkClient(values))
      .then((res) => {
        if (res.type.includes('rejected')) {
          setSubmitStatus('error')
        } else {
          setSubmitStatus('success')
        }
      })
      .catch((error) => {
        setSubmitStatus('error')
      })
  }

  const handleUpdate = (values) => {
    dispatch(updateMarkClient({ id: markInfoId, ...values }))
      .then((res) => {
        if (res.type.includes('rejected')) {
          setSubmitStatus('error')
        } else {
          setSubmitStatus('success')
        }
      })
      .catch((error) => {
        setSubmitStatus('error')
      })
  }

  useEffect(() => {
    if (submitStatus === 'success') {
      message.success('저장 성공!')
      setModal((prev) => ({ ...prev, open: false }))
    } else if (submitStatus === 'error') {
      message.error('저장 실패!')
    }
  }, [submitStatus])

  useEffect(() => {
    dispatch(getAllMarkClient())
  }, [])

  return (
    <>
      <Space wrap size="small">
        <span>마크장비 진행현황</span>
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
              value={markInfoId || undefined}
              showSearch
              placeholder="마크장비 진행현황을 선택해주세요"
              onDropdownVisibleChange={(visible) => setDropdownOpen(visible)}
              optionFilterProp="name"
              optionLabelProp="name"
              options={selectOptions}
              onSelect={(value) => {
                navigate(`/mark_status/${value}`)
              }}
            />

            <Dropdown menu={{ items }} trigger={['click']}>
              <Button icon={<EllipsisOutlined />}></Button>
            </Dropdown>
          </Space.Compact>
        </ConfigProvider>
      </Space>
      <RegisterModal modal={modal} setModal={setModal} subTitle="마크장비 진행현황" table="mark_info" handleCreate={handleCreate} handleUpdate={handleUpdate} />
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

export default React.memo(MarkStatus)
