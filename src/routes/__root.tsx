import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import Sidebar from "@/components/Sidebar";
interface MyRouteContext {
  auth: {
    isSignedIn: boolean;
  };
}

const Root = () => {
  return (
    <div className="flex gap-2">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: () => <Root />,
});
