import { App, Button, Form, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { ExperiencePayload } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";
import ExperienceForm from "../container/ExperienceForm";

const ExperienceAddModal = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: mutateCreateExperience, isLoading: loadingAddExp } =
    useMutation(
      (payload: ExperiencePayload) => profileAPI.addExperiences(payload),
      {
        onSuccess: () => {
          notification.success({ message: "Successfully added Experiences" });
          queryClient.invalidateQueries(["experience-list"]);
          Modal.destroyAll();
          form?.resetFields();
          setIsModalOpen(false);
          navigate("/profile-setting/experience");
        },
        onError: (error: Error) => {
          notification.error({ message: error.message });
        },
      }
    );
  return (
    <>
      <Modal
        title="Add Experience"
        open={isModalOpen}
        onOk={form?.submit}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        okType="primary"
        confirmLoading={loadingAddExp}
        centered
      >
        <Form
          form={form}
          onFinish={(values) =>
            mutateCreateExperience({
              company_name: values.company_name,
              designation: values.designation,
              job_department: values.job_department?.[0],
              job_location: values.job_location,
              responsibilities: values.responsibilities,
              start: values.start_date.format("YYYY-MM-DD"),
              end: values.end_date
                ? values.end_date.format("YYYY-MM-DD")
                : null,
              working_years: values.working_year,
            })
          }
          requiredMark="optional"
          layout="vertical"
        >
          <ExperienceForm onCancel={() => setIsModalOpen(false)} />
        </Form>
      </Modal>
      <Button
        style={{
          backgroundColor: "#2563EB",
          borderColor: "#2563EB",
          color: "white",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Add Experience
      </Button>
    </>
  );
};

export default ExperienceAddModal;
