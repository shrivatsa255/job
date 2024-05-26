import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import { CreateJob } from "../pages/CreateJob";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import UpdateJob from "../pages/UpdateJob";
import JobDetails from "../pages/JobDetails";
import Signup from "../components/Signup/signup.jsx";
import Login from "../components/Login/login.jsx";
import About from "../pages/About.jsx";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [ 
        {
          path: "/", 
        element: <Home/>
      },
        {
          path: "/post-job",
          element: <CreateJob/>
        },
        {
          path: "/my-job",
          element: <MyJobs/>
        },
        {
          path: "/salary",
          element: <SalaryPage/>
        },
         {
          path:"edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
         },
         {
          path: "/job/:id",
          element: <JobDetails/>
         },
         {
          path: "/login",
          element: <Login/>
         },
         {
          path: "/sign-up",
          element: <Signup/>
         },
         {
          path: "/about-us",
          element: <About/>
         }

    ],
    },

   
  ]);

  export default router;