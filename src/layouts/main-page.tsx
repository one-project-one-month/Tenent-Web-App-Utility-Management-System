import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";

const MainPage = () => {
  return (
    <section>
      <Navbar />
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default MainPage;
