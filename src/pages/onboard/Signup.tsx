import { App, Button, Card, Form, Input, Select, Typography } from "antd";
import { useWatch } from "antd/es/form/Form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { CreateUserPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { searchAPI } from "../../libs/api/searchAPI";

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [emailStore, setEmailStore] = useState("");
  const [step, setStep] = useState(0);
  const watchConfirmPassword = useWatch("confirmPassword", form);
  localStorage.setItem("user-email", emailStore);

  const { mutate, isLoading } = useMutation(
    (payload: CreateUserPayload) => authAPI.createUser(payload),
    {
      onSuccess: () => {
        notification.success({
          message: "A Verification Code has been sent to you email",
        });
        queryClient.invalidateQueries(["sign-up"]);
        navigate("/verify", { state: { emailStore } });
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const { data } = useQuery(["batch-list"], () => searchAPI.getBatchList());

  const loginSteps = async () => {
    const isValid = await form.validateFields();
    if (isValid) {
      step < 2 && setStep(step + 1);
      if (watchConfirmPassword !== undefined) {
        form.submit();
      }
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex justify-center items-center">
      <Card title="Sign Up" className="container shadow-2xl w-96">
        <Typography.Text className="flex justify-end">
          Step {step + 1}/3
        </Typography.Text>
        <Form
          form={form}
          onFinish={(values) => {
            mutate({
              name: values.name,
              email: values.email?.toLowerCase(),
              phone: values.phone,
              passing_year: values.passing_year,
              batch: values.batch,
              student_id: values.student_id,
              password: values.password,
            });

            setEmailStore(values.email);
          }}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: step === 0 ? true : false,
                message: "Please enter your name",
              },
            ]}
            className={twMerge("hidden", step === 0 && "block")}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: step === 0 ? true : false,
                message: "Please enter your email",
              },
            ]}
            className={twMerge("hidden", step === 0 && "block")}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: step === 0 ? true : false,
                message: "Please enter your phone",
              },
            ]}
            className={twMerge("hidden", step === 0 && "block")}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            label="Student ID"
            name="student_id"
            rules={[
              {
                required: step === 1 ? true : false,
                message: "Please enter your StudentID",
              },
            ]}
            className={twMerge("hidden", step === 1 && "block")}
          >
            <Input placeholder="Student ID" />
          </Form.Item>

          <Form.Item
            name="passing_year"
            label="Passing Year"
            rules={[
              {
                required: step === 1 ? true : false,
                message: "Please enter your Password",
              },
            ]}
            className={twMerge("hidden", step === 1 && "block")}
          >
            <Input placeholder="Passing year" />
          </Form.Item>

          <Form.Item
            name="batch"
            label="Batch"
            rules={[
              {
                required: step === 1 ? true : false,
                message: "Please enter your Batch Number",
              },
            ]}
            className={twMerge("hidden", step === 1 && "block")}
          >
            <Select
              className="w-full rounded-none"
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.label?.toLowerCase() ?? "").includes(input)
              }
              options={data?.data?.map(({ id, name }) => ({
                value: id?.toString(),
                label: name,
              }))}
              placeholder="Batch"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[
              {
                required: step === 2 ? true : false,
                message: "Please enter your Password",
              },
            ]}
            className={twMerge("hidden", step === 2 && "block")}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: step === 2 ? true : false,
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
            className={twMerge("hidden", step === 2 && "block")}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <div className="flex justify-between">
            {step > 0 && (
              <Button
                className="flex justify-center items-center"
                icon={<ArrowLeft size={16} />}
                onClick={() => setStep(step - 1)}
              >
                Previous
              </Button>
            )}
            <Button
              type="primary"
              icon={step !== 2 && <ArrowRight size={16} />}
              className={"flex justify-center items-center ml-auto"}
              onClick={loginSteps}
              loading={isLoading}
            >
              {step === 2 ? "Sign Up" : "Next"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
