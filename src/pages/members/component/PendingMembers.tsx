import { ThunderboltOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Descriptions,
  Modal,
  Pagination,
  Skeleton,
  Tooltip,
} from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import CardMeta from "../../../components/CardMeta";
import { StyledCard } from "../../../components/StyleCard";
import { usePendingMemberList } from "../../../config/hook/usePendingMembers";
import Scaffold from "../../../container/layout/Scaffold";
import {
  ApproveMembersPayload,
  Batch,
  MemberDetails,
} from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";

const PendingMembers = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [isOpen, setOpen] = useState(false);
  const [pendingData, setPendingData] = useState<MemberDetails>();

  const {
    data: pendingMemberData,
    filter,
    isLoading,
    refetch,
  } = usePendingMemberList();

  const memberApproveMutation = useMutation(
    (payload: ApproveMembersPayload) => membersAPI.approveMembers(payload),
    {
      onSuccess: () => {
        notification.success({ message: "User Approved" });
        refetch();
        queryClient.invalidateQueries(["members-list"]);
      },
    }
  );
  return (
    <Skeleton loading={isLoading}>
      <Scaffold>
        <div className="flex flex-col justify-between h-[calc(100vh-200px)]">
          <div className="grid grid-cols-12 mt-3 gap-2">
            <PendingMembersDetails
              isOpen={isOpen}
              onCancel={() => setOpen(false)}
              batch={pendingData?.batch}
              email={pendingData?.email}
              name={pendingData?.name}
              passingYear={pendingData?.passing_year}
              studentID={pendingData?.student_id}
            />
            {pendingMemberData?.data?.map((item, i) => (
              <StyledCard
                key={i}
                hoverable
                onClick={(e) => {
                  e.stopPropagation();
                  !isOpen && setOpen(true);
                  setPendingData({
                    name: item.name,
                    email: item.email,
                    batch: item.batch,
                    passing_year: item.passing_year,
                    student_id: item.student_id,
                  });
                }}
                className="col-span-12 lg:col-span-4 xl:col-span-3 md:col-span-6 cursor-pointer"
              >
                <CardMeta
                  title={item.name}
                  description={item.email}
                  extra={
                    <Tooltip title="Active this member">
                      <Button
                        loading={memberApproveMutation.isLoading}
                        onClick={(e) => {
                          e.stopPropagation();
                          memberApproveMutation.mutate({
                            user_id: item.id,
                          });
                        }}
                        icon={<ThunderboltOutlined />}
                      />
                    </Tooltip>
                  }
                />
              </StyledCard>
            ))}
          </div>

          <Pagination
            className="top-0 flex justify-end mt-3"
            defaultCurrent={1}
            total={pendingMemberData?.meta_data?.count}
            defaultPageSize={pendingMemberData?.meta_data?.page_size ?? 10}
            onChange={filter.handleChangePage}
          />
        </div>
      </Scaffold>
    </Skeleton>
  );
};

export default PendingMembers;

type props = {
  name?: string;
  email?: string;
  phone?: string;
  studentID?: string;
  passingYear?: number;
  batch?: Batch;
  isOpen: boolean;
  onCancel: () => void;
};
const PendingMembersDetails = ({
  batch,
  email,
  name,
  passingYear,
  studentID,
  isOpen,
  onCancel,
}: props) => {
  return (
    <Modal open={isOpen} onCancel={() => onCancel()} footer={false}>
      <Descriptions
        bordered
        layout="horizontal"
        items={[
          {
            label: "Name",
            key: "name",
            children: name,
            span: 3,
          },
          {
            label: "Email",
            key: "email",
            children: email,
            span: 3,
          },
          {
            label: "Batch No",
            key: "batch_no",
            children: batch?.name,
            span: 3,
          },
          {
            label: "Passing Year",
            key: "passing_year",
            children: passingYear,
            span: 24,
          },
          {
            label: "Student ID",
            key: "student_id",
            children: studentID,
            span: 3,
          },
        ]}
      />
    </Modal>
  );
};
