import { MOCK_API_BASE } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { List } from "antd";
import ky from "ky";
export const Route = createFileRoute("/_authenticated/apps/blogs/")({
  component: RouteComponent,
});

type Blog = {
  id: string;
  createdAt: string;
  content: string;
};

const fetchPosts = async () => {
  const data = await ky.get(`${MOCK_API_BASE}/blogs`).json<Blog[]>();
  return data;
};

function RouteComponent() {
  const { isLoading, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchPosts,
  });

  return (
    <div className="px-10 py-4">
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={isLoading}
        renderItem={(item) => <List.Item>{item.content}</List.Item>}
      ></List>
    </div>
  );
}
