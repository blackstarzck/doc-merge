import {
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

import { ITEMS } from "../../constants/menu"
import Logo from "../Logo"
import SiderSelectSection from "../SiderSelectSection"
import UploadZone from "../UploadZone"

const { Header, Sider, Content } = Layout

const MainLayout = ({ children }) => {
  const [organizationId, setOrganizationId] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const params = useParams()
  useEffect(() => {
    setOrganizationId(params.organizationId)
  }, [params])

  const handleMenuClick = (item) => {
    console.log("path: ", item)
    navigate(`/${item.key}`)
  }

  useEffect(() => {
    navigate(`/${ITEMS[0].key}`)
  }, [])

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[organizationId]}
          items={ITEMS}
          onClick={handleMenuClick}
          style={{ paddingTop: 46 }}
        />
        <SiderSelectSection />
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

const HeaderWrapper = styled(Header)``

export default MainLayout
