import MobileNavlink from "@/components/navbar/mobile-navlink";
import NavLinkPages from "@/components/navbar/navlink-page";
import ProfileDropdown from "@/components/navbar/profile-dropdown";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between max-w-7xl mx-auto my-4 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="logo-final.svg" alt="logo" className="h-12 w-12" />
        <h2 className="font-semibold">NestFlow</h2>
      </div>

      {/* Desktop Nav Links and Profile */}
      <div className="hidden md:flex items-center gap-4">
        <NavLinkPages />
      </div>
      <div className="hidden md:flex">
        <ProfileDropdown />
      </div>

      {/* Mobile Nav Links and Profile */}
      <div className="md:hidden ">
        <MobileNavlink />
      </div>
    </nav>
  );
};

export default Navbar;
