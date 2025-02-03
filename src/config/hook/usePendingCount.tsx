import { usePendingMemberList } from "../../config/hook/usePendingMembers";

export const usePendingCount = () => {
    const {
        data
      } = usePendingMemberList();
  return data?.meta_data?.count || 0;
};