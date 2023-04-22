import { Layout, Menu, theme } from "antd";
import React, { useState, useEffect } from "react";
import App from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { items } from "./common/constants";
import { BgColorsOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const Main = () => {
  const navigate = useNavigate();
  const { SubMenu } = Menu;
  const [currentMenu, setCurrentMenu] = useState("users");
  const [menuVisibility, setMenuVisibility] = useState(items.map(() => false));

  const toggleMenuVisibility = (index) => {
    const newMenuVisibility = [...menuVisibility];
    newMenuVisibility[index] = !newMenuVisibility[index];
    setMenuVisibility(newMenuVisibility);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  useEffect(() => {
    setCurrentMenu(location.pathname);
  }, [location]);

  return (
    <>
      <Header className="header" style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[currentMenu]}>
          {items.map((item) => (
            <Menu.Item onClick={() => navigate(item.path)} key={item.path}>
              {item.label} {item.icon}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: BgColorsOutlined,
            height: "calc(100vh - 64px)",
            alignSelf: "flex-start",
            position: "sticky",
            overflow: "visible",
            top: 64,
          }}
        >
          <Menu mode="inline"           
          style={{
            height: "100%",
          }}>
            {items.map((item, index) => (
              <SubMenu
                key={item.label}
                title={item.label}
                onTitleClick={() => toggleMenuVisibility(index)}
                >
                {menuVisibility[index] &&
                  item.obj.map((obj) => (
                    <Menu.Item
                      key={obj.path}
                      onClick={() => {
                        navigate(obj.path);
                        setCurrentMenu();
                      }}
                    >
                      <p>
                        {obj.label}
                        {obj.icon}
                      </p>
                    </Menu.Item>
                  ))}
              </SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <App />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Main;
