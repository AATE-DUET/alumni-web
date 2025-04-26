import { Avatar, Typography, Tooltip } from "antd";
import { useQuery } from "react-query";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const PublicCommitteeMembers = () => {
  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });

  return (
    <div className="min-h-[calc(100vh-190px)] flex flex-col gap-5 p-4 md:p-6">
      <div>
        <Typography.Title className="text-center mt-0">
          Our Leadership Team
        </Typography.Title>
      </div>

      {/* PRESIDENT */}
      {data?.data?.map(
        (member, i) =>
          member?.committee_designation?.toLowerCase() === "president" && (
            <div key={i} className="flex flex-col items-center justify-center">
              <Avatar
                size={100}
                src={member?.profile_pic}
                className="!rounded-full !object-cover"
              />
              <Tooltip title={member?.name}>
                <Typography.Title
                  level={5}
                  className="mt-2 mb-1 text-center text-base md:text-lg max-w-xs line-clamp-2"
                >
                  {member?.name}
                </Typography.Title>
              </Tooltip>
              <Tooltip title={member?.committee_designation}>
                <Typography.Text className="text-sm md:text-base text-gray-600 truncate">
                  {member?.committee_designation}
                </Typography.Text>
              </Tooltip>
            </div>
          )
      )}

      {/* OTHER MEMBERS */}
      <div className="w-full mt-8 flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {data?.data?.map((member, i) => {
            if (member?.committee_designation?.toLowerCase() === "president")
              return null;

            return (
              <div
                key={i}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow"
              >
                <Avatar
                  src={member.profile_pic}
                  size={80}
                  className="!rounded-full !object-cover"
                />
                <Tooltip title={member.name}>
                  <Typography.Title
                    level={5}
                    className="mt-2 mb-1 text-sm md:text-base max-w-[140px] line-clamp-2 leading-snug"
                  >
                    {member.name}
                  </Typography.Title>
                </Tooltip>
                <Tooltip title={member.committee_designation}>
                  <Typography.Text className="text-xs md:text-sm text-gray-500 truncate max-w-[140px]">
                    {member.committee_designation}
                  </Typography.Text>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PublicCommitteeMembers;
