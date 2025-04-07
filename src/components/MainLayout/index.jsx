import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { OVERVIEW_TABLES } from '../../constants/tables'
import { useIdsFromParams } from '../../hooks/useIdsFromParams'
import ConfigDrawer from '../ConfigDrawer'
import Logo from '../Logo'
import SiderSelectSection from '../SiderSelectSection'
import UploadZone from '../UploadZone'

const { Sider, Content } = Layout

const MainLayout = ({ children }) => {
  const { documentId } = useIdsFromParams()
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const onClickSideMenu = (key) => {
    const match = OVERVIEW_TABLES.find((table) => table.key === key)
    const path = match ? `/overview/${match.key}` : `/organization/${key}`

    navigate(path)
  }

  return (
    <Layout style={{ height: '100vh' }}>
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
      <Layout style={{ position: 'relative' }}>
        <SiderButton
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 48,
            height: 48,
          }}
        />

        <ConfigDrawer />

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

const SiderButton = styled(Button)`
  position: absolute;
  top: 6px;
  left: 6px;
  background-color: #ffffff;
  font-size: 26px;
  box-shadow:
    0px 6px 16px -8px rgba(0, 0, 0, 0.16),
    0px 3px 6px 0px rgba(0, 0, 0, 0.12),
    0px 5px 12px 4px rgba(0, 0, 0, 0.09);
`

export default MainLayout
