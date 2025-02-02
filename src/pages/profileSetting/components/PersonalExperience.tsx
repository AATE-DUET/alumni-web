import { EditOutlined } from "@ant-design/icons";
import { Button, List, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { Experience } from "../../../libs/api/@types/profile";
import { profileAPI } from "../../../libs/api/profileAPI";
import UpdateExperienceForm from "../container/UpdateExperienceForm";

const SeeExperience = () => {
  const { data: experiencesData, isLoading } = useQuery(
    ["experience-list"],
    () => profileAPI.getExperiences()
  );

  return (
    <div className="max-w-xl p-3">
      <List
        dataSource={experiencesData?.data}
        loading={isLoading}
        renderItem={(items) => (
          <List.Item>
            <ExperienceItem exp={items} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SeeExperience;

const ExperienceItem = ({ exp }: { exp: Experience }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <UpdateExperienceForm
        slug={exp.id.toString()}
        open={visible}
        onCancel={() => setVisible(false)}
      />
      <div>
        <Tooltip title="Edit Experience">
        <Button
            type="link" // Use "link" type for a text-like button
            icon={<EditOutlined />} // Optional: Include the EditOutlined icon
            onClick={() => setVisible(true)} // Open the modal on click
            className="absolute right-7"
          >
            Edit
          </Button>
        </Tooltip>
        <Typography.Title className="mt-0" level={5}>
          {exp?.designation}
        </Typography.Title>
        <div>
          {exp?.company_name} | {exp?.responsibilities}
        </div>
        <div>
          {exp?.start} To {exp?.end}
        </div>
        <div>{exp?.working_years} Year/(s) of experience</div>
      </div>
    </>
  );
};
