import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const AppFooter = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <AntFooter className="bg-gray-200 text-black py-4">
      {/* Container for layout */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
        {/* Copyright Section */}
        <Text className="text-sm text-gray-400">
          Copyright AATED © {currentYear} All rights reserved.{" "}
          <span className="text-gray-400">&copy;</span>
        </Text>

        {/* Contributors Link */}
        <Link
          to="/contributor"
          className="text-blue-400 hover:text-blue-500 transition-colors mt-2"
        >
          Development Contributor
        </Link>
      </div>
    </AntFooter>
  );
};

export default AppFooter;