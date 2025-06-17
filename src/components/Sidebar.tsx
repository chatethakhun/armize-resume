import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

const menus = [
  {
    name: "Blog",
    pathName: "/apps/blogs",
  },
  {
    name: "...",
    pathName: "/apps/more",
  },
];

const Sidebar = () => {
  return (
    <div className=" h-screen px-5 py-5 gap-3 bg-gray-100 shadow-md">
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
              {menu.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
