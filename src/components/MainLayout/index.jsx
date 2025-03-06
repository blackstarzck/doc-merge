import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { OVERVIEW_TABLES } from "../../constants/menu"
import { useDocumentId } from "../../hooks/useDocumentId"
import Logo from "../Logo"
import SiderSelectSection from "../SiderSelectSection"
import UploadZone from "../UploadZone"

const { Header, Sider, Content } = Layout

const MainLayout = ({ children }) => {
  const { documentId, organizationId } = useDocumentId()
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleDocumentId = (key) => {
    const match = OVERVIEW_TABLES.find((table) => table.key === key)
    const path = match ? match.key : `organization/${key}`

    console.log("path: ", path)

    navigate(`/${path}`)
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[documentId]}
          items={OVERVIEW_TABLES.map((table) => ({
            label: table.label,
            key: table.key,
          }))}
          onSelect={({ key }) => handleDocumentId(key)}
          style={{ paddingTop: 46 }}
        />
        <SiderSelectSection handleDocumentId={handleDocumentId} />
        <UploadZone />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
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
