import { Button, Layout, Typography, Drawer } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);  // State for Drawer visibility

  const HEADER_LINK = [
    {
      name: "Home",
      path: "/homepage",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Committee",
      path: "committee",
    },
    // {
    //   name: "Contributor",
    //   path: "contributor",
    // },
    {
      name: "Sign in",
      path: "/signin",
    },
  ];

  const toggleDrawer = () => {
    setVisible(!visible);  // Toggle Drawer visibility
  };

  return (
    <Layout>
      <AntHeader className="bg-transparent p-0 pl-5 pr-5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-5">
            {/* Logo or Brand name */}
            {/* <Typography.Title level={3} className="text-black">
              MyBrand
            </Typography.Title> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4">
            {HEADER_LINK.map((item, i) => (
              <Typography.Link
                key={i}
                href={item.path}
                className="hover:text-sky-700 hover:font-bold text-black font-semibold"
              >
                {item.name}
              </Typography.Link>
            ))}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden">
            <Button
              className="p-0"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              type="text"
            />
          </div>
        </div>

        {/* Signup Button (Mobile visibility toggle) */}
        <Button
          className={twMerge(pathname.includes("signup") && "hidden")}
          type="primary"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </AntHeader>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        visible={visible}
        width={250}
      >
        <div className="flex flex-col space-y-4">
          {HEADER_LINK.map((item, i) => (
            <Typography.Link
              key={i}
              href={item.path}
              className="hover:text-sky-700 hover:font-bold text-black font-semibold"
            >
              {item.name}
            </Typography.Link>
          ))}
        </div>
      </Drawer>
    </Layout>
  );
};

export default Header;
