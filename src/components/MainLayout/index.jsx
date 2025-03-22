import Icon, { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Form, Input, Layout, Menu, notification, Space, theme } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { OVERVIEW_TABLES } from '../../constants/tables'
import { useIdsFromParams } from '../../hooks/useIdsFromParams'
import { setAccessCode } from '../../store/access/accessSlice'
import Logo from '../Logo'
import SiderSelectSection from '../SiderSelectSection'
import UploadZone from '../UploadZone'

const { Header, Sider, Content } = Layout

const MainLayout = ({ children }) => {
  const { documentId } = useIdsFromParams()
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const dispatch = useDispatch()
  const access = useSelector((state) => state.access.code)
  const [api, contextHolder] = notification.useNotification()
  const inputRef = useRef(null)

  const onClickSideMenu = (key) => {
    const match = OVERVIEW_TABLES.find((table) => table.key === key)
    const path = match ? `/overview/${match.key}` : `/organization/${key}`

    navigate(path)
  }

  const onFinish = ({ accessCode }) => {
    const confirmedCode = import.meta.env.VITE_ACCESS_CODE
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

  return (
    <Layout style={{ height: '100vh' }}>
      {contextHolder}
      <Sider theme="dark" width={250} trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[documentId]}
          items={OVERVIEW_TABLES.map((table) => ({
            label: table.label,
            key: table.key,
          }))}
          onSelect={({ key }) => onClickSideMenu(key)}
          style={{ paddingTop: 46 }}
        />
        <SiderSelectSection onClickSideMenu={onClickSideMenu} />
        <UploadZone />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <FormWrapper name="accessForm" onFinish={onFinish}>
            {access ? (
              <Form.Item>
                <Button icon={<LogoutOutlined />} size="middle" onClick={() => dispatch(setAccessCode(null))}>
                  로그아웃
                </Button>
              </Form.Item>
            ) : (
              <Form.Item name="accessCode">
                <Space.Compact block style={{ width: 'inherit' }}>
                  <InputWrapper ref={inputRef} status="" placeholder="권한코드를 입력해주세요" style={{ width: 210 }} />
                  <Button type="primary" htmlType="submit">
                    입력
                  </Button>
                </Space.Compact>
              </Form.Item>
            )}
          </FormWrapper>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

const FormWrapper = styled(Form)`
  & > .ant-form-item {
    margin-bottom: 0 !important;
  }
`

const InputWrapper = styled(Input.Password)``

export default MainLayout
