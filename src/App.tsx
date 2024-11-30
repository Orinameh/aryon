import { createBrowserRouter, RouterProvider } from "react-router";
import PrivateRoute from "./pages/auth/PrivateRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const Login = await import("@/pages/login");
      return { Component: Login.default };
    },
  },
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "recommendations",
        async lazy() {
          const Recommendations = await import("./pages/auth/recommendations");
          return { Component: Recommendations.default };
        },
      },
      {
        path: "archived",
        async lazy() {
          const Archive = await import("./pages/auth/archive");
          return { Component: Archive.default };
        },
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
