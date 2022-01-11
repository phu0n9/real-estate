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
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEnv } from "./context/env.context";
import UpdateHouse from "./pages/UpdateHouse";
import UploadHouseImage from "./pages/UploadHouseImage";
import NotFound from "./redirect-pages/NotFound";
import Success from './redirect-pages/Success'
import Processing from "./redirect-pages/Processing";
import Error from './redirect-pages/Error'
import Unauthorized from "./redirect-pages/Unauthorized";

function App() {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const { apiServerUrl } = useEnv();

  useEffect(() => {
    const getUser = async () => {
      const token = await getAccessTokenSilently();
      // if userid is bigger than 21, they use oauth2
      const currentUserId =
        user.sub.length < 21
          ? user.sub.substring(user.sub.lastIndexOf("|") + 1, user.sub.length)
          : Math.trunc(
            user.sub.substring(
              user.sub.lastIndexOf("|") + 1,
              user.sub.length
            ) / 10000
          );
      // if user does not exist in the database
      if (user.sub.length > 21) {
        let data = {
          auth0Id: currentUserId,
          fullName: user.name,
          email: user.email,
        };
        // Request made and server responded
        await axios
          .post(`${apiServerUrl}/api/v1/users`, data, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }
    };
    if (user !== undefined) {
      getUser();
    }
  }, [user, apiServerUrl, getAccessTokenSilently]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <Routes>
        {/* Redirect pages */}
        <Route path="/success" exact={true} element={<Success/>}/>
        <Route path="/error" exact={true} element={<Error/>}/>
        <Route path="/processing" exact={true} element={<Processing/>}/>
        <Route path="/unauthorized" exact={true} element={<Unauthorized/>}/>

        {/* basic routes */}
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/rental" exact={true} element={<Rental />} />
        <Route path="/myPage" exact element={<MyPage />} />
        <Route path="/BookMeeting/:id" exact element={<BookMeeting />} />
        <Route path="/viewDetail/:id" exact element={<ViewDetail />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/myPage" exact element={<MyPage />} />

        {/* logged in users routes */}
        <Route path="/auth/calendar" exact element={<Calendar />} />
        <Route path="/auth/profile" exact element={<Profile />} />

        {/* admin routes */}
        <Route path="/auth/admin/calendar" exact element={<AdminCalendar />} />
        <Route path="/auth/admin/addHouse" exact element={<AddHouse />} />
        <Route
          path="/auth/admin/viewRentalHouses"
          exact
          element={<ViewRentalHouses />}
        />
        <Route path="/auth/admin/viewUsers" exact element={<ViewAllUsers />} />

        <Route path="/auth/admin/updateHouse/:id" exact element={<UpdateHouse/>}/>

        <Route path="/auth/admin/uploadImage/:id" exact element={<UploadHouseImage/>}/>

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
