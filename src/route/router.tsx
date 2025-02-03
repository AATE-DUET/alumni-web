import { Button, Result } from "antd";
import { Link, Navigate, createBrowserRouter } from "react-router-dom";
import HomeLayout from "../container/layout/HomeLayout";
import OnboardLayout from "../container/layout/OnboardLayout";
import ProfileLayout from "../container/ProfileLayout";
import Committee from "../pages/committee/Committee";
import CommitteeMembers from "../pages/committee/committeemembers/CommitteeMembers";
import Post from "../pages/managepost/Post";
import Members from "../pages/members";
import Contributor from "../pages/onboard/Contributor";
import EmailVerify from "../pages/onboard/EmailVerify";
import HomePage from "../pages/onboard/HomePage";
import OTPSenderForm from "../pages/onboard/OTPSenderForm";
import PasswordResetForm from "../pages/onboard/PasswordResetForm";
import PublicCommitteeMembers from "../pages/onboard/PublicCommitteeMembers";
import SignIn from "../pages/onboard/Signin";
import SignUp from "../pages/onboard/Signup";
import BlogPost from "../pages/posts";
import SettingsContainer from "../pages/profileSetting";
import AboutUs from "../pages/onboard/AboutUs";
import StatsDashboard from "../pages/stats";

export const publicRoute = createBrowserRouter([
  {
    path: "/",
    element: <OnboardLayout />,
    children: [
      { index: true, element: <Navigate to="/homepage" /> },
      { path: "homepage", element: <HomePage /> },
      { path: "signup", element: <SignUp /> },
      { path: "signin", element: <SignIn /> },
      { path: "verify", element: <EmailVerify /> },
      { path: "contributor", element: <Contributor /> },
      { path: "committee", element: <PublicCommitteeMembers /> },
      { path: "forgot-password", element: <OTPSenderForm /> },
      { path: "reset-password", element: <PasswordResetForm /> },
      {path: "about-us", element: <AboutUs /> },
      {
        path: "*",
        element: (
          <Result
            status="404"
            title="404"
            subTitle="You have to signin to access this page"
            extra={
              <Link to={"/signin"}>
                <Button type="primary">Back Home</Button>
              </Link>
            }
          />
        ),
      },
    ],
  },
]);

export const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Navigate to="/members" /> },
      {
        path: "profile",
        element: <ProfileLayout isEditEnable />,
      },
      {
        path: "stats",
        element: <StatsDashboard />,
      },
      {
        path: "members",
        children: [
          { index: true, element: <Members /> },
          { path: ":memberId", element: <ProfileLayout /> },
        ],
      },
      {
        path: "posts",
        children: [
          { index: true, element: <BlogPost /> },
          { path: ":slag", element: <Post /> },
        ],
      },
      {
        path: "committee",
        children: [
          { index: true, element: <Committee /> },
          {
            path: "members/:slag",
            element: <CommitteeMembers />,
          },
        ],
      },
      {
        path: "profile-setting/:tab?",
        element: <SettingsContainer />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={"/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    ),
  },
]);
