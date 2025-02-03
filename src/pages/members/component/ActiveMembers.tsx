/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  App,
  Avatar,
  Button,
  Card,
  Dropdown,
  Empty,
  Form,
  Pagination,
  Popconfirm,
  Popover,
  Skeleton,
  Tag,
  Tooltip,
} from "antd";
import { Filter, Settings2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import CardMeta from "../../../components/CardMeta";
import { useMemberList } from "../../../config/hook/useUserSearch";
import Scaffold from "../../../container/layout/Scaffold";
import { useUserDetails } from "../../../container/RoleProvider";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";
import MemberSearch from "../containers/MemberSearch";

type FilterFieldType = {
  name: string;
  company: string;
  designation: string;
  job_department: string;
  location: string;
  occupation_type: string;
  student_id: string;
  batch: string;
  skills: string;
  employment_status: string;
};

const ActiveMembers = () => {
  const { isSuperUser, isAdmin } = useUserDetails();
  const { notification } = App.useApp();

  const navigate = useNavigate();

  const {
    data: ActiveMemberData,
    isLoading,
    filter: memberFilter,
  } = useMemberList();

  const {
    mutate,
    isLoading: memberRoleLoading,
    variables,
  } = useMutation(
    (payload: ApproveMembersPayload) => membersAPI.updateMemberRole(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Role Updated" });
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  return (
    <Scaffold>
      <MemberFilter memberFilter={memberFilter} />
      <Skeleton loading={isLoading}>
        <div className="flex flex-col justify-between h-[calc(100vh-200px)]">
          <div className="overflow-auto grid grid-cols-12 gap-3">
            {Number(ActiveMemberData?.data?.length) > 0 ? (
              ActiveMemberData?.data?.map((user) => (
                <Card
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${user?.id}`);
                  }}
                  hoverable
                  bordered={false}
                  key={user.id}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <CardMeta
                    icon={<Avatar size={60} src={user.profile_pic} />}
                    title={
                      <div>
                        {user.name}
                        <Tooltip title="Passing Year">
                          <Tag className="ml-2" color="blue">
                            {user.batch?.name} Batch
                          </Tag>
                        </Tooltip>
                      </div>
                    }
                    description={user.professional_designation}
                    extra={
                      <Dropdown
                      menu={{
                        items: [
                          {
                            key: "admin",
                            onClick: (e: any) => e?.domEvent?.stopPropagation(),
                            label: (
                              <Popconfirm
                                title="Make Admin"
                                description="Are you sure you want to change member role as admin?"
                                onConfirm={(e) => {
                                  e?.stopPropagation();
                                  mutate({
                                    role: "admin",
                                    user_id: user.id,
                                  });
                                }}
                                okText="Yes"
                                cancelText="No"
                                okType="danger"
                              >
                                Make Admin
                              </Popconfirm>
                            ),
                          },
                          {
                            key: "member",
                            onClick: (e: any) => e?.domEvent?.stopPropagation(),
                            label: (
                              <Popconfirm
                                title="Member"
                                description="Are you sure you want to change member role as member?"
                                onConfirm={(e) => {
                                  e?.stopPropagation();
                                  mutate({
                                    role: "member",
                                    user_id: user?.id,
                                  });
                                }}
                                okText="Yes"
                                cancelText="No"
                                okType="danger"
                              >
                                Make Member
                              </Popconfirm>
                            ),
                          },
                          {
                            key: "moderator",
                            onClick: (e: any) => e?.domEvent?.stopPropagation(),
                            label: (
                              <Popconfirm
                                title="Moderator"
                                description="Are you sure you want to change member role as moderator?"
                                onConfirm={(e) => {
                                  e?.stopPropagation();
                                  mutate({
                                    role: "moderator",
                                    user_id: user?.id,
                                  });
                                }}
                                okText="Yes"
                                cancelText="No"
                                okType="danger"
                              >
                                Make Moderator
                              </Popconfirm>
                            ),
                          },
                        ]
                        .filter((item) => item.key !== user.role) // Filter out the current user's role
                      }}
                    >
                      <Button
                        className={twMerge("hidden", (isSuperUser || isAdmin) && "block")}
                        type="text"
                        icon={<Settings2 size={16} />}
                        onClick={(e) => e.stopPropagation()}
                        loading={user.id === variables?.user_id && memberRoleLoading}
                      />
                    </Dropdown>

                    }
                  />
                </Card>
              ))
            ) : (
              <div className="flex justify-center items-center w-[85vw]">
                <Empty />
              </div>
            )}
          </div>
          <Pagination
            className="flex justify-end mt-2"
            current={memberFilter.filters?.page}
            total={ActiveMemberData?.meta_data?.count}
            defaultPageSize={ActiveMemberData?.meta_data?.page_size ?? 10}
            onChange={memberFilter.handleChangePage}
          />
        </div>
      </Skeleton>
    </Scaffold>
  );
};

export default ActiveMembers;

type props = {
  memberFilter: any;
};
const MemberFilter = ({ memberFilter }: props) => {
  const [form] = Form.useForm();
  const [filters, setFilter] = useState(false);

  const serializePayload = (values: FilterFieldType) => {
    // Apply the filter logic here
    memberFilter.handleChangeName(values.name);
    memberFilter.handleChangeCompany(values.company);
    memberFilter.handleChangeDesignation(values.designation);
    memberFilter.handleChangeJobDepartment(values.job_department);
    memberFilter.handleChangeLocation(values.location);
    memberFilter.handleChangeOccupation(values.occupation_type);
    memberFilter.handleChangeStudentId(values.student_id);
    memberFilter.handleChangeOrdering(values.batch);
    memberFilter.handleChangeSkills(values.skills);
    memberFilter.handleChangeEmployeeStatus(values.employment_status);

    // Close the Popover after applying the filter
    setFilter(false);
  };

  return (
    <Form size="large" form={form} onFinish={serializePayload} layout="inline">
      <Popover
        title="Search & Filter"
        open={filters}
        placement="bottom" // Ensure the Popover appears below the filter icon
        onOpenChange={(open) => setFilter(open)}
        getPopupContainer={(triggerNode) => {
          const parentNode = triggerNode.parentNode;
          return parentNode instanceof HTMLElement ? parentNode : document.body;
        }}
        content={
          <div className="min-w-[300px] sm:min-w-[400px] max-w-[90vw] overflow-auto">
            <MemberSearch
              form={form}
              onClear={() => {
                memberFilter.clearFilter();
                setFilter(false); // Close the popover after clearing
              }}
            />
          </div>
        }
        trigger="click"
        overlayClassName="popover-overlay"
      >
        <Button
          title="Member Filter"
          icon={<Filter size={16} />}
          onClick={() => setFilter(true)}
          type="primary"
          className="flex items-center justify-center mb-2"
          size="middle"
        >
          {memberFilter?.filters && "Filtered"}
        </Button>
      </Popover>
    </Form>
  );
};