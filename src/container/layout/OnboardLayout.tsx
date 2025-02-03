import { Avatar, Layout, Typography } from "antd";
import { Outlet, Link } from "react-router-dom";
import CardMeta from "../../components/CardMeta";
import Header from "../../components/header/Header";

const OnboardLayout = () => {
  return (
    <Layout className="h-full w-full bg-slate-200">
      <Layout.Content className="container bg-slate-200 p-5 lg:pl-14 lg:pr-14 min-h-screen max-h-full">
        <div className="bg-white rounded shadow p-3 overflow-auto">
        <Link to="/homepage">
        <CardMeta
            className="mb-3"
            icon={
              <Avatar src="https://mevrik-cloud.mevrik.com/apps_342/TYEE-342_XZH_aated-logo.png" />
            }
            title={
              <Typography.Title level={5} className="mt-0 mb-0">
                AATED
              </Typography.Title>
            }
            description="Alumni Association of Textile Engineers, DUET"
          />
        </Link>
          <Header />
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default OnboardLayout;
