import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Drawer,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { profileAPI } from "../../libs/api/profileAPI";
import { authService } from "../../libs/auth";
import RoleProvider from "../RoleProvider";
import SideMenu from "../SideMenu/SideMenu";
import Sider from "antd/es/layout/Sider";

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const navigation = useNavigate();

  // Fetch user profile data
  const { data } = useQuery({
    queryFn: () => profileAPI.getProfileDetails(),
    onSuccess: (data) => {
      localStorage.setItem("user-profile", JSON.stringify(data?.data));
    },
  });

  // Dropdown menu items
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a onClick={() => navigation("/profile")}>Personal Profile</a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            authService.removeTokens();
            localStorage.removeItem("user-profile");
            navigation("/signin");
          }}
        >
          Logout
        </a>
      ),
    },
  ];

  return (
    <RoleProvider>
      <Layout
        className="relative"
        style={{ overflow: "auto", height: "100vh" }}
      >
        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setIsMobileDrawerOpen(false)}
          open={isMobileDrawerOpen}
          width={256}
        >
          <SideMenu />
        </Drawer>

        {/* Desktop Sider */}
        <Sider
          trigger={null}
          theme="light"
          breakpoint="xl"
          collapsedWidth="0"
          collapsible
          className="bg-blue-400 hidden xl:block"
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <SideMenu />
        </Sider>

        {/* Main Layout */}
        <Layout>
          <Header
            style={{ padding: 0 }}
            className="bg-white w-full h-14 flex justify-between items-center"
          >
            <div className="w-full grid grid-cols-2">
              {/* Hamburger Menu for Mobile */}
              <Button
                type="text"
                icon={
                  collapsed || isMobileDrawerOpen ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() =>
                  window.innerWidth < 1200
                    ? setIsMobileDrawerOpen(!isMobileDrawerOpen)
                    : setCollapsed(!collapsed)
                }
              />

              {/* User Dropdown */}
              <Dropdown.Button
                className="pr-3 justify-end"
                size="large"
                icon={
                  <Avatar
                    className="bottom-0.5"
                    src={data?.data?.profile_pic}
                  />
                }
                menu={{ items }}
              >
                <Link to='profile'>{data?.data?.name}</Link>
              </Dropdown.Button>
            </div>
          </Header>

          {/* Content Area */}
          <Content className="overflow-auto h-[calc(100vh)] pl-3 pr-3">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RoleProvider>
  );
};

export default HomeLayout;