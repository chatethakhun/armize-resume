import { useCallback, useState } from "react";
import { MOCK_API_BASE } from "@/constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { List, Modal, Input, Button } from "antd";
import { useUser } from "@clerk/clerk-react";
import ky from "ky";
import { PlusOutlined } from "@ant-design/icons";
import { queryClient } from "@/main";

type FieldType = {
  content: string;
};

export const Route = createFileRoute("/_authenticated/apps/blogs/")({
  component: RouteComponent,
});

const fetchPosts = async () => {
  const data = await ky.get(`${MOCK_API_BASE}/blogs`).json<Blog[]>();
  return data;
};

const createPost = async (data: FieldType & { userID: string }) => {
  const response = await ky.post(`${MOCK_API_BASE}/blogs`, {
    json: data,
  });
  return response;
};

function Blog({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl">{content}</div>
    </div>
  );
}

function RouteComponent() {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<string>("");
  const { user } = useUser();

  const { isLoading, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchPosts,
  });

  const onCreate = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setShowModal(false);
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const onSubmit = useCallback(() => {
    if (!content || !user) return;
    onCreate.mutate({ content, userID: user?.id });
  }, [content]);

  return (
    <div className="px-10 py-4 ">
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={isLoading}
        renderItem={(item) => <Blog content={item.content} />}
      />

      <div
        className="hover:bg-blue-600 cursor-pointer fixed bottom-2 right-2 bg-blue-500 rounded-full h-10 w-10 flex justify-center items-center text-white"
        onClick={() => setShowModal(true)}
      >
        <PlusOutlined />
      </div>

      <Modal
        title="Create Blog"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
        footer={() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={!content}
            onClick={onSubmit}
          >
            Submit
          </Button>
        )}
      >
        <div className="flex flex-col gap-4">
          <Input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}
