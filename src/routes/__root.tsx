import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useClerk } from "@clerk/clerk-react";
interface MyRouteContext {
  auth: {
    isSignedIn: boolean;
  };
}

const Navbar = () => {
  const { signOut, openSignIn, isSignedIn, user } = useClerk();
  return (
    <div>
      <Layout className="px-10 py-5">
        {isSignedIn ? (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              Welcome{" "}
              {user?.fullName || String(user?.emailAddresses) || "Anonymous"}
            </h1>

            <LogoutOutlined
              style={{ fontSize: "1.5rem" }}
              className="ml-auto"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <LoginOutlined
            style={{ fontSize: "1.5rem" }}
            className="ml-auto"
            onClick={() => openSignIn()}
          />
        )}
      </Layout>

      <Outlet />
    </div>
  );
};
export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: () => <Navbar />,
});
