import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";

const MainPage = () => {
  return (
    <section className="min-h-screen max-w-6xl mx-auto flex flex-col justify-between">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default MainPage;
