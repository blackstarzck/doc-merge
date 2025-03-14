import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { OVERVIEW_TABLES } from '../../constants/menu'
import { useIdsFromParams } from '../../hooks/useIdsFromParams'
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
      <Layout>
        <Header
          style={{
            padding: 0,
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

export default MainLayout
