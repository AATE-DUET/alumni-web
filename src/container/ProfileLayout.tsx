import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Skeleton,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
// import cover from "../../assets/cover.jpg";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import { Experience, MemberDetails } from "../libs/api/@types/members";
import ExperienceAddModal from "../pages/profileSetting/components/ExperieceAddModal";
import { membersAPI } from "../libs/api/membersAPI";

type ProfileLayoutProps = {
  isEditEnable?: boolean;
};
const ProfileLayout = ({ isEditEnable }: ProfileLayoutProps) => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const noProfilePic =
    "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg";
  const accountOwner = JSON.parse(localStorage.getItem("user-profile") || "[]");
  const userID = memberId ?? accountOwner?.id;

  const isProfileEditEnable =
    String(accountOwner?.id) === memberId || isEditEnable;

  const { data: memberData, isLoading } = useQuery({
    queryKey: ["member-list", userID],
    queryFn: () => membersAPI.getMemberDetails(userID),
  });
  return (
    <Skeleton loading={isLoading}>
      <div className="flex justify-center pt-2">
        <Card className="shadow-2xl max-w-3xl">
          <div className="flex gap-3 bg-blue-400 p-4 rounded-lg">
            <Avatar
              shape="square"
              size={80}
              src={memberData?.data?.profile_pic ?? noProfilePic}
              className="shadow-lg"
            />
            <div className="flex-1">
              <Typography.Title level={5} className="mt-0 mb-0">
                {memberData?.data?.name}
              </Typography.Title>
              <Descriptions
                items={[
                  {
                    label: "Email",
                    children: memberData?.data?.email,
                    span: 24,
                    className: "mb-0 pb-0 truncate",
                  },
                  {
                    label: "Phone",
                    span: 24,
                    children: memberData?.data?.phone ?? null,
                  },
                ]}
              />
            </div>
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              className={twMerge(
                "hidden",
                isProfileEditEnable && "flex ml-auto"
              )}
              onClick={() => navigate("/profile-setting")}
            />
          </div>
          <StyledCard className="mt-2">
            <Tabs
              items={[
                {
                  label: "Basic Information",
                  key: "basic_info",
                  children: <BasicInfo profileData={memberData?.data} />,
                },
                {
                  label: "Professional Info",
                  key: "experiences",
                  children: (
                    <UserExperience
                      experienceData={memberData?.data?.experiences}
                    />
                  ),
                },
              ]}
            />
          </StyledCard>
        </Card>
      </div>
    </Skeleton>
  );
};

export default ProfileLayout;

type BasicInfoProps = {
  profileData?: MemberDetails;
};
const BasicInfo = ({ profileData }: BasicInfoProps) => {
  return (
    <Descriptions
      bordered
      layout="horizontal"
      column={1}
      items={[
        {
          label: "Student ID",
          children: profileData?.student_id,
        },
        {
          label: "Batch No",
          children: profileData?.batch?.batch_number,
        },
        {
          label: "Passing Year",
          children: profileData?.passing_year,
        },
        {
          label: "Employment Status",
          children: (
            <Tag
              className="capitalize"
              color={
                profileData?.employment_status === "employed" ? "green" : "red"
              }
            >
              {profileData?.employment_status}
            </Tag>
          ),
        },
        {
          label: "Expertise Area",
          children: profileData?.expertise_area,
        },
        {
          label: "Professional Designation",
          children: profileData?.professional_designation,
        },
        {
          label: "Unemployment Reason",
          children: profileData?.unemployment_reasons,
        },
      ].filter((item) => item.children)}
    />
  );
};

type UserExperienceProps = {
  experienceData?: Experience[];
};
const UserExperience = ({ experienceData }: UserExperienceProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
      {/* Render each experience in its own grid */}
      {experienceData && experienceData?.length > 0 ? (experienceData?.map((items, i) => (
        <div
          key={items.id}
          className="border p-4 rounded shadow-sm bg-white"
        >
          {/* Header with Experience Number */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Experience {i + 1}</h3>
            {/* Optional: Add an edit button or action here */}
            <Button size="small" type="primary">
              Edit
            </Button>
          </div>

          {/* Descriptions for the Experience */}
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Company Name">
              {items?.company_name}
            </Descriptions.Item>
            <Descriptions.Item label="Designation">
              {items?.designation}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {items?.job_department?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Company Address">
              {items?.job_location}
            </Descriptions.Item>
            <Descriptions.Item label="Responsibilities">
              {items?.responsibilities}
            </Descriptions.Item>
            <Descriptions.Item label="Working Year">
              {items?.working_years}
            </Descriptions.Item>
            <Descriptions.Item label="Start/End Date">
              {items?.start} to {items?.end ?? "Present"}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ))): (
        // Show "Add Experience" button if no professional info data is found
        <div className="flex flex-col items-center justify-center p-6 bg-white border rounded shadow-sm">
          <p className="text-gray-500 mb-4">No professional experience found.</p>
          <ExperienceAddModal />
        </div>
      )}
    </div>
  );
};

const StyledCard = styled(Card)`
  &&.ant-card .ant-card-body {
    padding: 12px !important;
  }
`;
