import {
  Avatar,
  Card,
  Divider,
  Form,
  Input,
  List,
  Pagination,
  Select,
  Skeleton,
  Spin,
  Tabs,
  Typography,
} from "antd";
import moment from "moment";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import CardMeta from "../../components/CardMeta";
import { useMatchMedia } from "../../components/useMatchMedia";
import { usePostList } from "../../config/hook/useSearch";
import Scaffold from "../../container/layout/Scaffold";
import { postAPI } from "../../libs/api/postAPI";
import CreatePostModal from "./component/CreatePostModal";
import PostCard from "./component/Posts";

export const StyledCard = styled(Card)`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;

  .ant-card-body {
    padding: 3 !important;
    flex: 1 1 0%;
    overflow-y: auto;
  }
`;

const BlogPost = () => {
  const [jobPagination, setJobPagination] = useState<{
    page: string;
  }>();
  const { filter, isLoading, posts, fetchNextPage, hasNextPage } =
    usePostList();
  const [category, setCategory] = useState("all_post");

  const jobPostQuery = useQuery({
    queryKey: ["job-post-list", jobPagination],
    queryFn: () =>
      postAPI.getPostList({
        category: "1",
        page: jobPagination?.page,
      }),
  });
  const jobPosts = jobPostQuery?.data?.data;
  const isMobileScreen = useMatchMedia();
  const renderPostType = useMemo(() => {
    if (isMobileScreen && category === "job_post") {
      return "job_post";
    }
    if (isMobileScreen && category === "all_post") {
      return "all_post";
    } else if (!isMobileScreen) return "all";
  }, [category, isMobileScreen]);

  return (
    <Skeleton loading={jobPostQuery?.isLoading && isLoading}>
      <Scaffold
        className="overflow-hidden"
        extra={
          <div className="flex justify-end">
            <Form className="flex gap-2">
              <Input.Search
                placeholder="Search Post"
                allowClear
                onSearch={filter?.handleChangePosts}
                className="w-[200px] border-gray-100 rounded-md"
              />
              <Select
                placeholder="Select Category"
                onSelect={(key) => filter.handleChangeCategory(key)}
                allowClear
                options={[
                  {
                    value: "0",
                    label: "All Post",
                  },
                  {
                    value: "2",
                    label: "Notice",
                  },
                  {
                    value: "3",
                    label: "General Post",
                  },
                  {
                    value: "4",
                    label: "Help Post",
                  },
                ]}
              />
            </Form>
          </div>
        }
      >
        {isMobileScreen && (
          <Tabs
            className="col-span-12"
            onChange={(key) => setCategory(key)}
            items={[
              {
                label: "All Post",
                key: "all_post",
              },
              {
                label: "Job Post",
                key: "job_post",
              },
            ]}
          />
        )}
        <div className="flex gap-10 w-full overflow-hidden h-[calc(100vh-140px)]">
          {(renderPostType === "all_post" || renderPostType === "all") && (
            <div
              id="scrollableDiv"
              className={twMerge(
                "flex flex-col overflow-auto p-2",
                !isMobileScreen && "w-4/5"
              )}
            >
              <CreatePostModal />
              <InfiniteScroll
                dataLength={
                  posts?.pages?.flatMap((data) => data?.data)?.length ?? 0
                }
                hasMore={hasNextPage ?? false}
                next={() => {
                  return fetchNextPage();
                }}
                loader={
                  <Spin
                    className={twMerge(
                      "flex justify-center items-center",
                      Number(
                        posts?.pages?.flatMap((date) => date?.data)?.length
                      ) < 1 && "hidden"
                    )}
                  />
                }
                scrollableTarget="scrollableDiv"
                style={{
                  overflow: "hidden",
                }}
              >
                <List
                  className="mt-2"
                  dataSource={posts?.pages?.flatMap((items) => items?.data)}
                  renderItem={(items, i) => (
                    <PostCard key={i} postDate={items!} />
                  )}
                />
              </InfiniteScroll>
            </div>
          )}

          {(renderPostType === "job_post" || renderPostType === "all") && (
            <StyledCard
              loading={jobPostQuery?.isLoading}
              className={twMerge(
                "h-[calc(100vh-175px)] w-full p-2",
                !isMobileScreen && "w-2/3 h-[450px] overflow-auto mt-[11px]"
              )}
              title="Job Posts"
              actions={[
                <Pagination
                  simple
                  size="small"
                  className="flex justify-end mt-2"
                  current={jobPostQuery?.data?.meta_data?.page}
                  total={jobPostQuery?.data?.meta_data?.count}
                  defaultPageSize={jobPostQuery?.data?.meta_data?.page_size}
                  onChange={(page) =>
                    setJobPagination({
                      page: page.toString(),
                    })
                  }
                />,
              ]}
            >
              <List
                dataSource={jobPosts}
                renderItem={(items, i) => (
                  <div className="flex flex-col gap-5" key={i}>
                    <CardMeta
                      icon={<Avatar src={items?.attachments?.[0]} />}
                      title={
                        <Typography.Text className="text-xs font-bold">
                          {items?.title}
                        </Typography.Text>
                      }
                      description={
                        <Typography.Text
                          className="text-xs mt-0"
                          type="secondary"
                        >
                          {moment(items?.created_at).format("lll")}
                        </Typography.Text>
                      }
                    />
                    <Typography.Text className="text-clip">
                      {`${items?.body.substring(0, 250)}`}
                      {Number(items?.body?.length) > 250 ? "......" : ""}
                    </Typography.Text>
                    <Link
                      to={String(items.id)}
                      className="underline text-black text-xs"
                    >
                      More Details
                    </Link>
                    {Number(jobPostQuery?.data?.data?.length) - 1 !== i && (
                      <Divider />
                    )}
                  </div>
                )}
              />
            </StyledCard>
          )}
        </div>
      </Scaffold>
    </Skeleton>
  );
};

export default BlogPost;
