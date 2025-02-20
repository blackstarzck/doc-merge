import {
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Logo from "../Logo";
import SiderSelectSection from "../SiderSelectSection";

const { Header, Sider, Content } = Layout;
const menuItems = [
  { label: "도서납품현황", path: "/a", key: "a", icon: <BookOutlined /> },
  { label: "용역, 물품 납품", path: "/b", key: "b", icon: <BookOutlined /> },
  { label: "장서점검+도서폐기", path: "/c", key: "c", icon: <BookOutlined /> },
  {
    label: "물류알바(대구, 창원, 대전)",
    path: "/d",
    key: "d",
    icon: <BookOutlined />,
  },
  { label: "화물사용", path: "/e", key: "e", icon: <BookOutlined /> },
];

const MainLayout = ({ children }) => {
  const [documentId, setDocumentId] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const params = useParams();
  useEffect(() => {
    setDocumentId(params.documentId);
  }, [params]);

  const handleMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[documentId]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ paddingTop: 46 }}
        />
        <SiderSelectSection />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
  );
};

export default MainLayout;
