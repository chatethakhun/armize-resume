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
    <div className="flex flex-wrap gap-4 p-10">
      {myProjects.map((project) => (
        <Card key={project.name}>
          <Card.Meta title={project.name} description={project.description} />
          <Button
            className="mt-4 w-full"
            type="primary"
            onClick={() => openLink(project.url)}
          >
            Open
          </Button>
        </Card>
      ))}
    </div>
  );
}
