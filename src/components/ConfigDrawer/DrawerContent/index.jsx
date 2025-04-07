import { LogoutOutlined } from '@ant-design/icons'
import { Button, Input, Flex, Form, notification, Space, Transfer } from 'antd'

import styled from 'styled-components'
import { setAccessCode } from '../../../store/access/accessSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { selectAllTableColumns, setTableColumns } from '../../../store/savedColumns/savedColumnsSlice'
import useDefaultColumns from '../../../hooks/useDefaultColumns'

const DrawerContent = ({ titleObj, onSavedSuccess }) => {
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification()
  const access = useSelector((state) => state.access.accessCode)
  const inputRef = useRef(null)
  const storageColumns = useSelector(selectAllTableColumns)
  const table = titleObj.key ? storageColumns[titleObj.key] : null
  const columns = table ? table.columns : []
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const disabledList = useDefaultColumns()
    ?.filter((col) => col.hide)
    .map((col) => col.key)

  const dataSource = columns.map((col) => ({
    disabled: disabledList.includes(col.key),
    key: col.key,
    title: col.name,
  }))

  const onFinish = ({ accessCode, onSavedSuccess }) => {
    const confirmedCode = import.meta.env.VITE_ACCESS_CODE || 'tpwhdeodhkd'
    console.log('input code: ', accessCode, confirmedCode)

    if (accessCode === confirmedCode) {
      dispatch(setAccessCode(accessCode))
    } else {
      api.error({
        placement: 'top',
        message: '권한코드가 일치하지 않습니다.',
        description: '권한코드를 확인해주세요.',
      })
    }
  }

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    // console.log('targetKeys:', nextTargetKeys)
    // console.log('direction:', direction)
    // console.log('moveKeys:', moveKeys)
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // console.log('sourceSelectedKeys:', sourceSelectedKeys)
    // console.log('targetSelectedKeys:', targetSelectedKeys)
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const setCustomizedColumns = () => {
    if (targetKeys.length === 0) return

    let copy = structuredClone(storageColumns)

    // console.log('[1] copy: ', copy)
    console.log('targetKeys: ', targetKeys)

    const newColumns =
      targetKeys.length === 0 ? columns.map((col) => ({ ...col, hide: true })) : columns.map((col) => ({ ...col, hide: !targetKeys.includes(col.key) }))
    console.log('newColumns: ', newColumns)

    copy[titleObj.key].columns = newColumns

    dispatch(setTableColumns(copy))
    onSavedSuccess()
  }

  useEffect(() => {
    console.log('titleObj: ', titleObj)
    console.log('columns: ', columns)

    setTargetKeys(() => {
      return columns?.filter((col) => !col.hide).map((col) => col.key)
    })

    return () => {
      console.log('drawer unmout~!')
    }
  }, [titleObj])

  return (
    <>
      {contextHolder}
      <SectionWrapper>
        <article>
          <Flex justify="space-between" style={{ paddingBottom: 16 }}>
            <h4>컬럼 설정하기</h4>
            <Button color="primary" variant="text" onClick={() => setTargetKeys([])}>
              초기화
            </Button>
          </Flex>
          <Transfer
            dataSource={dataSource}
            titles={['컬럼 목록', '보고싶은 컬럼']}
            showSearch
            listStyle={{
              width: 250,
              height: 600,
            }}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            oneWay
            render={(item) => item.title}
            status={targetKeys.length === 0 ? 'error' : ''}
          />
          <div style={{ textAlign: 'right', paddingTop: 16 }}>
            <Button type="primary" onClick={() => setCustomizedColumns()} disabled={targetKeys.length === 0}>
              저장
            </Button>
          </div>
        </article>
        <article>
          <FormWrapper name="accessForm" onFinish={onFinish}>
            {access ? (
              <Form.Item>
                <Button icon={<LogoutOutlined />} size="middle" onClick={() => dispatch(setAccessCode(null))}>
                  로그아웃
                </Button>
              </Form.Item>
            ) : (
              <Form.Item name="accessCode">
                <Space.Compact block>
                  <Input.Password ref={inputRef} status="" placeholder="권한코드를 입력해주세요" />
                  <Button type="primary" htmlType="submit">
                    입력
                  </Button>
                </Space.Compact>
              </Form.Item>
            )}
          </FormWrapper>
        </article>
      </SectionWrapper>
    </>
  )
}

const FormWrapper = styled(Form)`
  width: 100%;
  & > .ant-form-item {
    margin-bottom: 0 !important;
  }
`

const SectionWrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  & h4 {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  & > article:first-child {
    flex: 1;
    width: 100%;
  }
`

export default DrawerContent
