import { pages } from "@/lib/pages";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="logo-final.svg" alt="logo" className="h-12 w-12" />
          <h2>NestFlow</h2>
        </div>
        <div className="flex items-center gap-6">
          {pages.map((page) => (
            <NavLink
              to={page.path}
              key={page.name}
              className={({ isActive }) =>
                `hover:text-blue-500 ${
                  isActive ? "font-bold text-blue-500" : ""
                }`
              }
            >
              {page.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="text-center mt-4 mb-8 font-bold text-muted-foreground">
        <h3>&copy; 2025-2026 OPOM(September) Solution Inc.</h3>
      </div>
    </footer>
  );
};

export default Footer;
