import { App, Button, DatePicker, Form, Input, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayJs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import AvatarUploader from "../../../container/AvaterUploader";
import { UpdateProfilePayload } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";

const ProfileSettings = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const watchEmployedStatus = Form.useWatch("employment_status", form);

  const { mutate, isLoading } = useMutation(
    (payload: UpdateProfilePayload) => profileAPI.updateProfileDetails(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Profile Successfully Updated" });
        queryClient.invalidateQueries(["user-profile"]);
        navigate("/profile");
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );
  const { data, isLoading: isProfileLoading } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );
  // const { data: occupationData } = useQuery(["occupation-list"], () =>
  //   searchAPI.getOccupationList()
  // );

  return (
    <Spin spinning={isProfileLoading}>
      {data?.data?.name && (
        <Form
          className="max-w-xl p-3"
          form={form}
          initialValues={{
            name: data?.data?.name,
            email: data?.data?.email,
            phone: data?.data?.phone,
            batch_no: data?.data?.batch?.name,
            passing_year: dayJs(`${data?.data?.passing_year}`),
            student_id: data?.data?.student_id,
            profile_pic: data?.data?.profile_pic,
            contact_details: data?.data?.contact_details,
            employment_status: data?.data?.employment_status,
            expertise_area: data?.data?.expertise_area,
            // occupation_type: data?.data?.occupation_type?.id,
            professional_designation: data?.data?.professional_designation,
            unemployment_reasons: data?.data?.unemployment_reasons,
            username: data?.data?.username,
          }}
          requiredMark
          layout="vertical"
          onFinish={(values) => {
            mutate({
              name: values.name,
              email: values.email,
              phone: values.phone,
              passing_year: values.passing_year.format("YYYY"),
              student_id: values.student_id,
              profile_pic: values.profile_pic ? values.profile_pic : null,
              password: values.password,
              contact_details: values.contact_details,
              employment_status: values.employment_status,
              expertise_area: values.expertise_area,
              occupation_type: values.occupation_type,
              professional_designation: values.professional_designation,
              unemployment_reasons: values.unemployment_reasons,
              username: values.username,
            });
          }}
        >
          <Form.Item name="profile_pic">
            <AvatarUploader />
          </Form.Item>

          <Form.Item shouldUpdate name="username" label="Username">
            <Input disabled={data?.data?.username ? true : false} />
          </Form.Item>

          <Form.Item
            shouldUpdate
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your Name" }]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your Email" }]}
          >
            <Input
              disabled={data?.data?.email ? true : false}
              placeholder="someone@gmail.com"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Contact Number"
            rules={[
              { required: true, message: "Please enter your Phone Number" },
            ]}
          >
            <Input placeholder="01XXXXXXXX" />
          </Form.Item>

          <Form.Item
            name="batch_no"
            label="Batch Number"
            rules={[{ required: true, message: "Please select Batch number" }]}
          >
            <Input
              disabled={data?.data?.batch?.name ? true : false}
              placeholder="5th"
            />
          </Form.Item>

          <Form.Item
            name="student_id"
            label="Student ID"
            rules={[
              { required: true, message: "Please enter your Student ID" },
            ]}
          >
            <Input placeholder="2023" />
          </Form.Item>

          <Form.Item
            name="passing_year"
            label="Passing Year"
            rules={[{ required: true, message: "Please write Passing Year" }]}
          >
            <DatePicker
              picker="year"
              className="w-full"
              placeholder="passing year"
            />
          </Form.Item>
          {/* <Form.Item 
              name="occupation_type"
              label="Occupation Type"
              rules={[{ required: true, message: "Please select your occupation type" }]}
          >
            <Select
              placeholder="Occupation"
              options={occupationData?.data?.map(({ id, name }) => ({
                key: id,
                value: id,
                label: name,
              }))}
            />
          </Form.Item> */}

          <Form.Item
            name="professional_designation"
            label="Professional Designation"
          >
            <Input placeholder="professional designation" />
          </Form.Item>

          <Form.Item
            name="employment_status"
            label="Employment Status"
            rules={[
              { required: true, message: "Please write employment status" },
            ]}
          >
            <Select
              options={[
                {
                  label: "Employed",
                  value: "employed",
                },
                {
                  label: "Unemployed",
                  value: "unemployed",
                },
                {
                  label: "Student",
                  value: "student",
                },
              ]}
              placeholder="employment status"
            />
          </Form.Item>

          {watchEmployedStatus == "unemployed" && (
            <Form.Item name="unemployment_reason" label="Unemployment reason">
              <TextArea rows={2} placeholder="unemployment reason" />
            </Form.Item>
          )}

          <Form.Item name="expertise_area" label="Expertise area">
            <TextArea rows={2} placeholder="expertise area" />
          </Form.Item>

          <Form.Item name="contact_details" label="Contact details">
            <TextArea rows={2} placeholder="contact details" />
          </Form.Item>

          <Form.Item>
            <Button
              className="flex ml-auto"
              type="primary"
              loading={isLoading || isProfileLoading}
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </Spin>
  );
};

export default ProfileSettings;
