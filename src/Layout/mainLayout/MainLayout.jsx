import { Outlet } from "react-router-dom";
import Nav from "../../Shared/Navbar/Nav/Nav";
import Footer from "../../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <Nav></Nav>
      <div className="min-h-[300px]">
        {" "}
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
