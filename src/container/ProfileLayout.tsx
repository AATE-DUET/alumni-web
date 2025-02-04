import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Skeleton,
  Tabs,
  Tag,
  Typography
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
// import cover from "../../assets/cover.jpg";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import { Experience, MemberDetails } from "../libs/api/@types/members";
import { membersAPI } from "../libs/api/membersAPI";
import TextAlignment from "../components/textAlignment";
import ExperienceAddModal from "../pages/profileSetting/components/ExperieceAddModal";
import UpdateExperienceForm from "../pages/profileSetting/container/UpdateExperienceForm";

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
          <div className="flex gap-3 bg-blue-400 p-4 rounded-lg items-start">
            <Avatar
              shape="square"
              size={80}
              src={memberData?.data?.profile_pic ?? noProfilePic}
              className="shadow-lg"
            />
            <div className="flex-1">
              <Typography.Title level={5} className="m-0">
                {memberData?.data?.name}
              </Typography.Title>
              <Descriptions
                items={[
                  {
                    // label: "Email",
                    children: memberData?.data?.email,
                    span: 24,
                    className: "m-0",
                  },
                  {
                    label: "Cell",
                    span: 24,
                    children: memberData?.data?.phone ?? null,
                    className: "m-0 mt-0",
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
            >Edit</Button>
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
                      isExpEditable={isProfileEditEnable}
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
          label: "Occupation Type",
          children: profileData?.occupation_type?.name,
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
  isExpEditable?: boolean;
};
const UserExperience = ({
  experienceData,
  isExpEditable,
}: UserExperienceProps) => {
  const [editModalVisible, setEditModalVisible] = useState<string | null>(null);
  // const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
      {/* Render each experience in its own grid */}
      {experienceData && experienceData?.length > 0 ? (experienceData?.map((items, i) => (
        <div key={items.id} className="border p-4 rounded shadow-sm bg-white">
          {/* Header with Experience Number */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Experience {i + 1}</h3>
            {/* Optional: Add an edit button or action here */}
            {isExpEditable && (
              <Button size="small" type="primary" onClick={() => setEditModalVisible(items && items?.id?.toString() || null)}>
                Edit
              </Button>
            )}
          </div>
          {items && editModalVisible === items?.id?.toString() && (
              <UpdateExperienceForm
                slug={items.id.toString()}
                open={true}
                onCancel={() => setEditModalVisible(null)} // Close the modal
              />
            )}

          {/* Descriptions for the Experience */}
          {/* <Descriptions 
          bordered
          layout="horizontal"
          column={1}
          items={[
            {
              label: "Company",
              children: items?.company_name,
            },
            {
              label: "Designation",
              children: items?.designation,
            },
            {
              label: "Department",
              children: items?.job_department?.name,
            },
            {
              label: "Address",
              children: items?.job_location,
            },
            {
              label: "Roles",
              children: items?.responsibilities,
            },
            {
              label: "Years",
              children: items?.working_years,
            },
            {
              label: "Period",
              children: `${items?.start} to ${items?.end ?? "Present"}`,
            },
          ].filter((item) => item.children)}
          /> */}
          <div>
            <div>
            <Typography.Title className="mt-0" level={5}>
              {items?.designation}
            </Typography.Title>
            </div>
            <div>
              <Typography.Text className="mt-0">
              <b>{items?.company_name}</b> ({items?.start} - {items?.end || "Present"})
              </Typography.Text>
            </div>
            <div>
            <Typography.Text>
              <b>Location:</b> {items?.job_location}
            </Typography.Text>
            </div>
            <div>
            <Typography.Text>
              <b>Department: </b>{items?.job_department?.name}
            </Typography.Text>
            </div>
            <div>
            <div>
              <TextAlignment responsibilities={items?.responsibilities} title="Roles" />
            </div>
            </div>
            
            {/* <div>
            <Typography.Text><b>Duration:</b> {items?.working_years} Year/Years</Typography.Text>
            </div> */}
          </div>
        </div>
      ))): (
        // Show "Add Experience" button if no professional info data is found
        <div className="flex flex-col items-center justify-center p-6 bg-white border rounded shadow-sm">
          <p className="text-gray-500 mb-4">No professional experience found.</p>
          {isExpEditable && <ExperienceAddModal />}
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
