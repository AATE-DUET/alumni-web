import { SecurityScanOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, Typography } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResetPasswordPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";

const PasswordResetForm = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const { isLoading, mutate } = useMutation(
    (payload: ResetPasswordPayload) => authAPI.resetPassword(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Your password has been changed" });
        navigate("/signin");
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );
  return (
    <div className="h-[calc(100vh-175px)] flex justify-center items-center">
      <Card
        className="text-center"
        size="small"
        title={
          <>
            <Typography.Title className="mt-3" level={4}>
              Forgot Password
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              Enter verification code that send to your email and confirm your
              password
            </Typography.Paragraph>
          </>
        }
      >
        <Form
          requiredMark={"optional"}
          onFinish={(values) =>
            mutate({
              email: localStorage.getItem("signup-email"),
              otp: values.otp,
              password: values.password,
            })
          }
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "Please enter verification code!" },
            ]}
          >
            <Input prefix={<SecurityScanOutlined />} placeholder="OTP" />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[{ required: true, message: "Please enter your Password" }]}
          >
            <Input.Password
              prefix={<SecurityScanOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<SecurityScanOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="w-full"
              loading={isLoading}
              htmlType="submit"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PasswordResetForm;
