import NavLinkPages from "@/components/navbar/navlink-page";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-2 md:mx-4">
        <div className="flex items-center gap-2">
          <img src="logo-final.svg" alt="logo" className="h-12 w-12" />
          <h2>NestFlow</h2>
        </div>
        <div className="flex items-center gap-6">
          <NavLinkPages />
        </div>
      </div>
      <div className="text-center mt-4 mb-6 font-bold text-muted-foreground text-wrap mx-4">
        <h3>&copy; 2025-2026 OPOM(September) Solution Inc.</h3>
      </div>
    </footer>
  );
};

export default Footer;
