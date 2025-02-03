import { Avatar, Typography } from "antd";
import { useQuery } from "react-query";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const PublicCommitteeMembers = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const caroselref = useRef<Slider>();
  // const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });

  return (
    <div className="h-[calc(100vh-190px)] flex flex-col justify-between gap-5 p-3">
      <div>
        <Typography.Title className="text-center mt-0">
          Our Leadership Team
        </Typography.Title>
        {/* <Typography.Title level={5} className="text-center">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..." "There is no one who loves pain
          itself, who seeks after it and wants to have it, simply because it is
          pain..."
        </Typography.Title> */}
      </div>

      {data?.data?.map(
        (members, i) =>
          members?.committee_designation?.toLowerCase() === "president" && (
            <div
              key={i}
              className="flex flex-col items-center w-full justify-center"
            >
              <Avatar size={100} src={members?.profile_pic} />
              <Typography.Title level={5} className="mt-0">
                {members?.name}
              </Typography.Title>
              <Typography.Text>
                {members?.committee_designation}
              </Typography.Text>
            </div>
          )
      )}

<div className="w-full mt-10 flex justify-center items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full px-4 py-4">
    {data?.data?.map((members, i) => (
      members?.committee_designation?.toLowerCase() !== "president" && (
        <div
          key={i}
          className="bg-gray-200 w-full sm:w-44 h-60 flex justify-center items-center flex-col text-center p-5 rounded-lg"
        >
          <Avatar src={members.profile_pic} size={100} />
          <Typography.Title level={5}>{members.name}</Typography.Title>
          <Typography.Text type="secondary">
            {members.committee_designation}
          </Typography.Text>
        </div>
      )
    ))}
  </div>
</div>

    </div>
  );
};
export default PublicCommitteeMembers;
