import { NavLink } from "react-router-dom";
import Logo from "./../assets/logo.svg";
import { LinkProps } from "../types/links";

const Navbar = () => {
  const links: LinkProps[] = [
    {
      href: "/movies",
      text: "Movies",
    },
    {
      href: "/watchlist",
      text: "Watch List",
    },
  ];
  return (
    <nav className="bg-blue-100 p-4 shadow-md sticky top-0">
      <div className="max-w-[1280px] m-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-12 h-12" />
          <p className="font-bold text-xl">
            <span className="text-blue-600">Movie</span>
            <span>Log</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 font-medium">
          {links?.length &&
            links.map((link: LinkProps, i: number) => (
              <NavLink
                key={i}
                to={link?.href}
                className={({ isActive }) => `hover:text-blue-500 transition-all ${isActive ? "text-blue-500" : ""}`}>
                {link?.text}
              </NavLink>
            ))}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
