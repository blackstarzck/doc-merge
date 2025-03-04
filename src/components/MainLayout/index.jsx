import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { OVERVIEW_TABLES } from "../../constants/menu"
import Logo from "../Logo"
import SiderSelectSection from "../SiderSelectSection"
import UploadZone from "../UploadZone"

const { Header, Sider, Content } = Layout

const MainLayout = ({ children }) => {
  const [documentId, setDocumentId] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const params = useParams()

  useEffect(() => {
    if (documentId) navigate(`/${documentId}`)
    console.log("MainLayout useEffect: ", documentId)
  }, [documentId])

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[params.documentId]}
          items={OVERVIEW_TABLES.filter((table) => !table.hide).map(
            (table) => ({ label: table.label, key: table.key })
          )} // Add items prop
          onSelect={({ key }) => setDocumentId(key)}
          style={{ paddingTop: 46 }}
        />
        <SiderSelectSection setDocumentId={setDocumentId} />
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
