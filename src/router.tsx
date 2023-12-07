import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import MemberPage from "./pages/MemberPage";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/members/:id", element: <MemberPage /> },
  ],
  { basename: "/what-i-did/" }
);

export default router;
