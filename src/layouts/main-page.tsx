import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";
import ProfilePage from "@/pages/profile/profile-page";

const MainPage = () => {
  return (
    <section>
      <Navbar />
      <main className="max-w-6xl mx-auto">
        <Outlet />
        <ProfilePage />
      </main>
      <Footer />
    </section>
  );
};

export default MainPage;
