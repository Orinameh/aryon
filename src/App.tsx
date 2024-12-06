import { createBrowserRouter, RouterProvider } from "react-router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";

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

      {
        path: "policies",
        async lazy() {
          const Policies = await import("./pages/auth/policies");
          return { Component: Policies.default };
        },
      },

      {
        path: "events",
        async lazy() {
          const Event = await import("./pages/auth/events");
          return { Component: Event.default };
        },
      },

      {
        path: "waivers",
        async lazy() {
          const Waivers = await import("./pages/auth/waivers");
          return { Component: Waivers.default };
        },
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
