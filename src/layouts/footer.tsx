import NavLinkPages from "@/components/navbar/navlink-page";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto w-full">
      <section className="flex flex-col md:flex-row items-center justify-between w-full px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="logo-final.svg" alt="logo" className="h-12 w-12" />
          <h2 className="font-semibold text-lg">NestFlow</h2>
        </div>

        <nav className="flex items-center gap-6 flex-wrap mt-2 md:mt-0">
          <NavLinkPages />
        </nav>
      </section>

      <div className="text-center mt-4 mb-6 font-bold text-muted-foreground mx-4">
        <h3>&copy; 2025-2026 OPOM(September) Solution Inc.</h3>
      </div>
    </footer>
  );
};

export default Footer;
