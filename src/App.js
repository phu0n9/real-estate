import Calendar from './pages/Calendar';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Register from './pages/Register';
import Rental from './pages/Rental';
import ViewDetail from './pages/ViewDetail';
import BookMeeting from './pages/BookMeeting';
import AdminCalendar from './pages/AdminCalendar';
import AddHouse from './pages/AddHouse';
import ViewRentalHouses from './pages/ViewRentalHouses';
import ViewAllUsers from './pages/ViewAllUsers';
import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Footer from './components/Footer'
import { useAuth0 } from "@auth0/auth0-react"

function App() {
  const { isLoading } = useAuth0()

  // useEffect(()=>{
  //   if (user !== undefined){
  //   }
  // },[user])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <NavBar />
      <Routes>
        {/* basic routes */}
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/rental" exact={true} element={<Rental />} />
        <Route path="/help" exact={true} element={<Help />} />
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
        <Route path="/auth/admin/viewRentalHouses" exact element={<ViewRentalHouses />} />
        <Route path="/auth/admin/viewUsers" exact element={<ViewAllUsers />} />

        <Route path="*" component={() => "404 NOT FOUND"} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
