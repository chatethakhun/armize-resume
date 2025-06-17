import { Link } from "@tanstack/react-router";
import Logo from "./Logo";
import { useClerk } from "@clerk/clerk-react";
import { FaBlog } from "react-icons/fa";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
const menus = [
  {
    name: "Blog",
    pathName: "/apps/blogs",
    icon: () => <FaBlog className="text-lg" />,
  },
];

const Sidebar = () => {
  const { signOut, isSignedIn, openSignIn } = useClerk();
  return (
    <div className="h-screen px-5 py-5 gap-3 bg-gray-100 shadow-md flex flex-col justify-between">
      <div>
        <Logo />
        <hr className="border-blue-500 border-2 " />

        <br />

        {menus.map((menu) => {
          return (
            <div className="w-full" key={menu.pathName}>
              <Link
                to={menu.pathName}
                activeProps={{
                  className:
                    "text-blue-500 border-b-2 border-blue-500 w-full font-bold inline-block",
                }}
              >
                <div className="flex gap-2 items-center">
                  {menu.icon && <menu.icon />}
                  {menu.name}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div
        className="mt-auto cursor-pointer flex gap-2 items-center hover:text-blue-500"
        onClick={() => {
          isSignedIn ? signOut() : openSignIn();
        }}
      >
        {isSignedIn ? (
          <IoLogOutOutline className="text-2xl" />
        ) : (
          <IoLogInOutline className="text-2xl" />
        )}
        {isSignedIn ? "Logout" : "Login"}
      </div>
    </div>
  );
};

export default Sidebar;
