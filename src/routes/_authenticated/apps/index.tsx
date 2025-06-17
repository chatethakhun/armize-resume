import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/apps/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-wrap gap-4 p-10 text-6xl text-blue-500 justify-center items-center w-full">
      WELCOME TO MY ARIZE
    </div>
  );
}
