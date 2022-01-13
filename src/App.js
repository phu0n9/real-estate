import Calendar from "./pages/Calendar";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import Rental from "./pages/Rental";
import ViewDetail from "./pages/ViewDetail";
import BookMeeting from "./pages/BookMeeting";
import AdminCalendar from "./pages/AdminCalendar";
import AddHouse from "./pages/AddHouse";
import ViewRentalHouses from "./pages/ViewRentalHouses";
import ViewAllUsers from "./pages/ViewAllUsers";
import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import Payment from "./components/payment";
import Footer from "./components/Footer";
import UpdateHouse from "./pages/UpdateHouse";
import Success from "./redirect-pages/Success";
import Processing from "./redirect-pages/Processing";
import Error from "./redirect-pages/Error";
import Unauthorized from "./redirect-pages/Unauthorized";
import AdminViewRentalHouses from "./pages/AdminViewRentalHouses";
import AdminAddRental from "./pages/AdminAddRental";
import ViewAllDeposits from "./pages/ViewAllDeposits";
import EditDeposit from "./pages/EditDeposit";
import ViewUserDeposits from "./pages/ViewUserDeposit";
import EditRental from "./pages/EditRental";

export const UserContext = createContext();

function App() {
  const { isLoading, user } = useAuth0();
  const getUserId = () => {
    // if userid is bigger than 21, they use oauth2
    const currentUserId =
      user?.sub.length < 21
        ? user?.sub.substring(user?.sub.lastIndexOf("|") + 1, user?.sub.length)
        : Math.trunc(
            user?.sub.substring(
              user?.sub.lastIndexOf("|") + 1,
              user?.sub.length
            ) / 10000
          );
    return currentUserId;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={getUserId()}>
      <NavBar />
      <Routes>
        {/* Redirect pages */}
        <Route path="/success" exact={true} element={<Success />} />
        <Route path="/error" exact={true} element={<Error />} />
        <Route path="/processing" exact={true} element={<Processing />} />
        <Route path="/unauthorized" exact={true} element={<Unauthorized />} />

        {/* basic routes */}
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/rental" exact={true} element={<Rental />} />
        <Route path="/myPage" exact element={<MyPage />} />
        <Route path="/BookMeeting/:id" exact element={<BookMeeting />} />
        <Route path="/viewDetail/:id" exact element={<ViewDetail />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/myPage" exact element={<MyPage />} />

        {/* logged in users routes */}
        <Route path="/auth/payments" exact element={<Payment />} />
        <Route path="/auth/calendar" exact element={<Calendar />} />
        <Route path="/auth/profile" exact element={<Profile />} />
        <Route
          path="/auth/ViewRentalHouses"
          exact
          element={<ViewRentalHouses />}
        />
        <Route
          path="/auth/viewUserDeposit"
          exact
          element={<ViewUserDeposits />}
        />

        {/* admin routes */}
        <Route path="/auth/admin/calendar" exact element={<AdminCalendar />} />
        <Route path="/auth/admin/addHouse" exact element={<AddHouse />} />
        <Route
          path="/auth/admin/addRentalHouses"
          exact
          element={<AdminAddRental />}
        />
        <Route
          path="/auth/admin/editRental/:id"
          exact
          element={<EditRental />}
        />
        <Route
          path="/auth/admin/viewAllDeposits"
          exact
          element={<ViewAllDeposits />}
        />
        <Route
          path="/auth/admin/editDeposit/:id"
          exact
          element={<EditDeposit />}
        />
        <Route
          path="/auth/admin/viewRentalHouses"
          exact
          element={<AdminViewRentalHouses />}
        />
        <Route path="/auth/admin/viewUsers" exact element={<ViewAllUsers />} />
        <Route
          path="/auth/admin/updateHouse/:id"
          exact
          element={<UpdateHouse />}
        />
        <Route
          path="/auth/admin/payments"
          exact
          element={<Payment isAdmin />}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
