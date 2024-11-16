import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import VerifyEmail from "./Components/VerifyEmail";
import ClientHome from "./Components/ClientHome";
import VideoChat from "./Components/VideoChat"
import LoginSelection from "./Components/LoginRoutes";
import Profile from "./Components/Profile";
import Account from "./Components/Account";
import Diversion from "./Components/Diversion";
import RecruiterProfile from "./Components/RecruiterProfile";
import RecruiterSignup from "./Components/RecruiterSignup";
import RecruiterInfo from "./Components/RecruiterInfo";
import PostJob from "./Components/PostJob";
import ApplyJob from "./Components/ApplyJob";
import RecruiterLogin from "./Components/RecruiterLogin";
import Login from "./Components/Login";
import RecruiterDashboard from "./Components/RecruiterDashboard";
import Applications from "./Components/Applications";
import RecruiterApplications from "./Components/RecruiterApplications";
import CreatePost from "./Components/CreatePost";
import UserProfile from "./Components/UserProfile";


function App() {
  return (
   
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/chooseOptions" element={<Diversion/>}/>
      <Route exact path="/applicant/signup" element={<Signup/>}/>
      <Route exact path="/recruiter/signup" element={<RecruiterSignup/>}/>
      <Route path="/login" element={<LoginSelection />} />
      <Route exact path="/recruiter/login" element={<RecruiterLogin/>}/>
      <Route exact path="/applicant/login" element={<Login/>}/>
      <Route exact path="/verifyotp" element={<VerifyEmail/>}/>
      <Route exact path="/videochat" element={<VideoChat/>}/>
      <Route exact path="/clienthome" element={<ClientHome/>}/>
      <Route exact path="/recruiter/dashboard" element={<RecruiterDashboard/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
      <Route exact path="/recruiterProfile" element={<RecruiterProfile/>}/>
      <Route exact path="/Account" element={<Account/>}/>
      <Route exact path="/Recruiter/Info" element={<RecruiterInfo/>}/>
      <Route exact path="/Recruiter/PostJob" element={<PostJob/>}/>
      <Route exact path="/applyjobs" element={<ApplyJob/>}/>
      <Route exact path="/Applications" element={<Applications/>}/>
      <Route exact path="/Recruiter/Applications" element={<RecruiterApplications/>}/>
      <Route exact path="/createpost" element={<CreatePost/>}/>
      <Route path="/profile/:userId" element={<UserProfile />} />


    </Routes>
    </BrowserRouter>
      
  );
}

export default App;
