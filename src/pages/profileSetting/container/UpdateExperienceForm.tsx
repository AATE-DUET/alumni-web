import { App, Form, Modal, Skeleton } from "antd";
import dayJs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ExperiencePayload } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";
import ExperienceForm from "./ExperienceForm";

type UpdateExperienceFormProps = {
  slug?: string;
  open?: boolean;
  onCancel: () => void;
};

const UpdateExperienceForm = ({
  slug,
  open,
  onCancel,
}: UpdateExperienceFormProps) => {
  const [updateExperienceForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const { data: experienceData, isLoading } = useQuery({
    queryKey: ["experience-list", slug],
    queryFn: () => profileAPI.getExperience(slug ?? ""),
    onSuccess: () => {},
  });

  const { mutate: updateExperience, isLoading: updateExperienceLoading } =
    useMutation({
      mutationFn: (payload: ExperiencePayload) =>
        profileAPI.updateExperience(payload, slug),
      onSuccess: () => {
        notification.success({ message: "Updated" });
        queryClient.invalidateQueries(["experience-list"]);
        Modal.destroyAll();
        onCancel();
      },
    });

  return (
    <Modal
      title="Add Experience"
      open={open}
      onCancel={onCancel}
      centered
      footer={[null]}
    >
      <Skeleton loading={isLoading}>
        <Form
          layout="vertical"
          form={updateExperienceForm}
          onFinish={(values) => {
            updateExperience({
              company_name: values.company_name,
              designation: values.designation,
              working_years: values.working_years,
              job_location: values.job_location,
              job_department: values.job_department?.[0],
              responsibilities: values.responsibilities,
              end: values.end_date
                ? values.end_date.format("YYYY-MM-DD")
                : null,
            });
          }}
          initialValues={{
            company_name: experienceData?.data?.company_name,
            designation: experienceData?.data?.designation,
            start_date: experienceData?.data?.start
              ? dayJs(experienceData?.data?.start)
              : "",
            end_date: experienceData?.data?.end
              ? dayJs(experienceData?.data?.end)
              : "",
            working_year: experienceData?.data?.working_years,
            job_location: experienceData?.data?.job_location,
            responsibilities: experienceData?.data?.responsibilities,
            job_department: experienceData?.data?.job_department?.name,
          }}
        >
          <ExperienceForm
            isDisabled={true}
            deleteExperience={experienceData?.data?.id.toString()}
            updateLoading={updateExperienceLoading}
            onCancel={onCancel}
          />
        </Form>
      </Skeleton>
    </Modal>
  );
};

export default UpdateExperienceForm;
