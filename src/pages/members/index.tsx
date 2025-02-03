import { Tabs } from "antd";
import styled from "styled-components";
import { useUserDetails } from "../../container/RoleProvider";
import ActiveMembers from "./component/ActiveMembers";
import PendingMembers from "./component/PendingMembers";
import { usePendingCount } from "../../config/hook/usePendingCount";

const Members = () => {
  const { isSuperUser, isAdmin, isModarator } = useUserDetails();
  const pendingCount = usePendingCount();

  return isSuperUser || isAdmin || isModarator ? (
    <div className="p-3">
      <StyledTabs
        items={[
          {
            key: "active_members",
            label: "Members",
            children: <ActiveMembers />,
            className: "mb-0",
          },
          {
            key: "pending_members",
            label: (
              <span>
                Pending Requests{" "}
                {pendingCount > 0 && (
                  <span className="ml-1 text-xs text-red-500">
                    ({pendingCount})
                  </span>
                )}
              </span>
            ),
            children: <PendingMembers />,
            className: "mb-0",
          },
        ]}
      />
    </div>
  ) : (
    <div className="mt-3">
      <ActiveMembers />
    </div>
  );
};

export default Members;

const StyledTabs = styled(Tabs)`
  &&.ant-tabs-top > .ant-tabs-nav {
    margin: 0 !important;
  }
`;
