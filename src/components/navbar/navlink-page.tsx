import { pages } from "@/lib/pages";
import { NavLink } from "react-router";

const NavLinkPages = () => {
  return (
    <>
      {pages.map((page) => (
        <NavLink
          to={page.path}
          key={page.name}
          className={({ isActive }) =>
            `hover:text-primary ${isActive ? "font-bold text-primary" : ""}`
          }
        >
          {page.name}
        </NavLink>
      ))}
    </>
  );
};

export default NavLinkPages;
