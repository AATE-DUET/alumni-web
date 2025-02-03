import { Card, Spin } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { statsAPI } from "../libs/api/statsAPI";
import { StatsData } from "../libs/api/@types/stats";

// Define the paths for each stat
const STAT_PATHS = {
  total_members: "/members",
  total_posts: "/posts",
  total_job_posts: "/posts",
  total_committee_members: "/committee",
  total_pending_requests: "/members",
};

type StatKey = keyof typeof STAT_PATHS;

// Define colors and icons for each stat
const CARD_STYLES: { key: StatKey; color: string; icon: string }[] = [
  { key: "total_members", color: "bg-blue-500", icon: "👥" },
  { key: "total_posts", color: "bg-green-500", icon: "📝" },
  { key: "total_job_posts", color: "bg-yellow-500", icon: "💼" },
  { key: "total_committee_members", color: "bg-purple-500", icon: "👥" },
  { key: "total_pending_requests", color: "bg-red-500", icon: "⏳" },
];

const StatsDashboard = () => {
  // Fetch stats data
  const { data, isLoading } = useQuery("stats", () => statsAPI.getStats());

  // Extract stats data
  const stats = data?.data;
  console.log('stats', stats);
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Dashboard Statistics</h1> */}
      <Spin spinning={isLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARD_STYLES.map(({ key, color, icon }) => (
            <Card
              key={key}
              className={`shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden`}
              // style={{ height: "200px" }} // Fixed height
            >
              <div className="flex flex-col h-full">
                {/* Top Section */}
                <div className={`${color} p-3 text-white rounded-t-lg flex flex-col items-center justify-center`}>
                  <span className="text-2xl">{icon}</span>
                  <h3 className="text-xs font-semibold">{key.replace(/_/g, " ").toUpperCase()}</h3>
                </div>

                {/* Bottom Section */}
                <div className="flex-1 bg-white p-3 flex flex-col justify-between">
                  <p className="text-xl font-bold text-gray-800 text-center">{stats?.[key] || 0}</p>
                  <Link
                    to={STAT_PATHS[key]}
                    className="text-xl font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 text-center"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default StatsDashboard;