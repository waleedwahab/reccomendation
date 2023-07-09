import { Routes, Route } from "react-router-dom";
import "./App.css";
import Missing from "./Components/Layout/Missing";

//import Unauthorized from "./Components/Layout/Unauthorized";
import Layout from "./Components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authentication from "./Components/Authentication/Authentication";
import UserDashboard from "./Components/Dashboard/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Sell from "./Components/Sell/Sell";
import ManageSell from "./Components/Sell/ManageSell";
import SellEdit from "./Components/Sell/SellEdit";
import Rent from "./Components/Rent/Rent";
import ManageRent from "./Components/Rent/ManageRent";
import RentEdit from "./Components/Rent/RentEdit";
import AdminLogin from "./Components/Admin/adminLogin";
import SellPanel from "./Components/Admin/SellPage";
import RentPanel from "./Components/Admin/RentPage";
import Conversation from "./Components/utils/conversation";
import UserProfile from "./Components/Authentication/userProfile";
import { useSelector } from "react-redux";
import AboutUs from "./Components/Dashboard/AboutUs";
import ContactUs from "./Components/Dashboard/ContactUs";
import Viewitems from "./Components/viewitem/Viewitems";
import SellDashboard from "./Components/Dashboard/SellDashboard";
import RentDashboard from "./Components/Dashboard/RentDashboard";
import Rentingelist from "./Components/adminedit/Rentingelist";
import Sellingelist from "./Components/adminedit/Sellingelist";
import Edituser from "./Components/adminedit/Edituser";
import RequireAuth from "./layout/RquireAuth";
import Unauthorized from "./layout/Unauthorized";
import RequireAdminAuth from "./layout/RequireAdminAuth"

// import { userActions } from "./Components/Redux/user-slice";

function App() {
  const user = useSelector((state) => state.user.userInfo);
  console.log("User",user);
  const seller = useSelector((state) => state.user.sellingUser);
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
  {/* Public Routes */}
  <Route path="/" element={<Authentication />} />
  <Route path="AdminLogin" element={<AdminLogin />} />
  {/* Protected Admin Routes */}
  <Route element={<RequireAdminAuth />}>
    <Route path="AdminDashboard" element={<AdminDashboard />} />
    <Route path="/edituser" element={<Edituser />} />
    <Route path="/admin/sell" element={<SellPanel />} />
    <Route path="/admin/rent" element={<RentPanel />} />
    <Route path="/editr" element={<Rentingelist />} />
    <Route path="/edits" element={<Sellingelist />} />
  </Route>

  {/* Protected User Routes */}
  <Route element={<RequireAuth />}>
    <Route path="UserDashboard" element={<UserDashboard />} />
    <Route path="userProfile" element={<UserProfile user={user} />} />
    <Route path="Sell" element={<Sell />} />
    <Route path="Rent" element={<Rent />} />
    <Route path="/viewItem" element={<Viewitems />} />
    <Route path="/buylist" element={<SellDashboard />} />
    <Route path="/rentlist" element={<RentDashboard />} />
    <Route path="ManageSell" element={<ManageSell />} />
    <Route path="ManageRent" element={<ManageRent />} />
    <Route path="SellEdit" element={<SellEdit />} />
    <Route path="AboutUs" element={<AboutUs />} />
    <Route path="ContactUs" element={<ContactUs />} />
    <Route path="RentEdit" element={<RentEdit />} />
    <Route
      path="/conversation"
      element={<Conversation currentUser={user} sellingUser={seller} />}
    />
  </Route>

  <Route path="/Unauthorized" element={<Unauthorized />} />
  <Route path="*" element={<Missing />} />
</Route>

      </Routes>

      <ToastContainer
        style={{ zIndex: "1000000000000000000000" }}
        autoClose={2000}
      />
    </>
  );
}

export default App;
