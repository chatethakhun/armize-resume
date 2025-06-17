import { createFileRoute } from "@tanstack/react-router";
import { Button, Card } from "antd";
import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createFileRoute("/_authenticated/apps/")({
  component: RouteComponent,
});

const myProjects = [
  {
    name: "Blogs",
    description: "This is my blogs",
    url: "/apps/blogs",
  },
];

function RouteComponent() {
  const router = useRouter();

  const openLink = useCallback((url: string) => {
    router.navigate({
      to: url,
    });
  }, []);
  return (
    <div className="flex flex-wrap gap-4 p-10 text-6xl text-blue-500 justify-center items-center w-full">
      WELCOME TO MY ARIZE
    </div>
  );
}
