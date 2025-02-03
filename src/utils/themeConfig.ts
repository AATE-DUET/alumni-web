import { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#1E90FF",
    borderRadius: 5,
  },
  components: {
    Input: {
      controlHeight: 38,
    },
    Button: {
      controlHeight: 38,
      colorBorder: "transparent",
      defaultShadow: "3px 3px 3px 3px rgba(0.02, 0.02, 0.02, 0.05)",
      defaultHoverBorderColor: "transparent",
      defaultHoverBg: "#82CAFF",
      // colorPrimaryHover:"#90EE90"
      textHoverBg: "#82CAFF",
    },
    Select: {
      controlHeight: 38,
    },
    Menu: {
      itemSelectedBg: "#0041C2",
      colorPrimary: "white",
      itemHoverBg: "#82CAFF",
    },
  },
};
