import {
  ApartmentOutlined,
  ReadOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useActiveItems } from "./utils";

const SideMenu = () => {
  const navigate = useNavigate();

  const { activeKeys } = useActiveItems();

  return (
    <Menu
      selectedKeys={activeKeys}
      defaultSelectedKeys={activeKeys}
      defaultOpenKeys={activeKeys}
      mode="inline"
      theme="light"
      className="bg-slate-300 h-full"
      items={[
        {
          key: "1",
          icon: "",
          disabled: true,
        },

        {
          key: "members",
          title: "members",
          icon: <UsergroupAddOutlined />,
          label: "Members",
          onClick: () => navigate("/members"),
        },
        {
          key: "posts",
          title: "posts",
          icon: <ReadOutlined />,
          onClick: () => navigate("/posts"),
          label: "Post",
        },
        {
          key: "committee",
          title: "Committee",
          icon: <ApartmentOutlined />,
          onClick: () => navigate("committee"),
          label: "Committee",
        },
        {
          key: "profile-setting",
          title: "Setting",
          icon: <SettingOutlined />,
          onClick: () => navigate("profile-setting"),
          label: "Profile Setting",
        },
      ]}
    />
  );
};

export default SideMenu;
