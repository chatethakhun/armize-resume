import { useCallback, useState } from "react";
import { MOCK_API_BASE } from "@/constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { List, Modal, Button } from "antd";
import { useUser } from "@clerk/clerk-react";
import ky from "ky";
import { PlusOutlined } from "@ant-design/icons";
import { queryClient } from "@/main";
import { FaCircleUser } from "react-icons/fa6";
import { formatDateToDMY } from "@/utils/time";
import { FaRegTrashAlt } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import Logo from "@/components/Logo";

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

const deletePost = async ({ id }: { id: string }) => {
  await ky.delete(`${MOCK_API_BASE}/blogs/${id}`);
};

function Blog({
  content,
  onDelete,
  loading,
}: {
  content: string;
  onDelete: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 shadow-md w-full rounded-sm p-3 mb-3">
      <div className="flex gap-2 border-b border-gray-100 pb-2 items-center">
        <FaCircleUser className="text-4xl text-gray-500" />
        <div className="flex flex-col justify-center">
          <div className="text-sm text-gray-700">Arize A Jonah</div>
          <div className="text-xs text-gray-700">
            {formatDateToDMY(new Date())}
          </div>
        </div>
        {!loading && (
          <FaRegTrashAlt
            className="text-red-600 cursor-pointer ml-auto"
            onClick={onDelete}
          />
        )}
      </div>
      <div className="text-md p-2">{content}</div>
    </div>
  );
}

function RouteComponent() {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<string>("");
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

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

  const onDelete = useMutation({
    mutationFn: deletePost,
    onMutate() {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setLoading(false);
    },
  });

  const onSubmit = useCallback(() => {
    if (!content || !user) return;
    onCreate.mutate({ content, userID: user?.id });
  }, [content]);

  const onDeleteBlog = (id: string) => {
    if (!id) return;
    onDelete.mutate({ id });
  };

  return (
    <div className="px-10 py-4 w-full">
      <div className="flex gap-1 items-end mb-6 text-gray-600">
        <Logo />
        Blog
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={isLoading}
        renderItem={(item) => (
          <Blog
            content={item.content}
            onDelete={() => {
              onDeleteBlog(item.id);
            }}
            loading={loading}
          />
        )}
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
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
