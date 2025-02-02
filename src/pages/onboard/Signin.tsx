import { LockFilled, UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Divider, Form, Input, Typography } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { authService } from "../../libs/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const { isLoading, mutate } = useMutation(
    (payload: LoginPayload) => authAPI.loginUser(payload),
    {
      onSuccess: ({ data: { refresh, access } }) => {
        authService.setToken(access);
        authService.setRefreshToken(refresh);
        navigate("/members");
      },
      onError: () => {
        notification.error({ message: "Invalid username/password " });
      },
    }
  );
  return (
    <>
      <div className="h-[calc(100vh-200px)]  flex justify-center items-center">
        <Card
          className="shadow-2xl w-96"
          title={
            <Typography.Title level={5} className="text-xl text-center mt-0">
              Sign In
            </Typography.Title>
          }
        >
          <Form
            onFinish={(values) =>
              mutate({
                username: values.username.toLowerCase(),
                password: values.password,
              })
            }
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input
                className="h-11"
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                className="h-11"
                prefix={<LockFilled />}
                placeholder="Password"
              />
            </Form.Item>
            <a
              className="flex justify-end mb-1"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password
            </a>
            <Button type="primary" block loading={isLoading} htmlType="submit">
              Sign in
            </Button>
            <Divider>Or</Divider>
            <Button block onClick={() => navigate("/signup")}>
              Register now!
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
