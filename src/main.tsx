import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@ant-design/v5-patch-for-react-19";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider, useMyAuth } from "./providers/auth.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Spin } from "antd";

export const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const InnerApp = () => {
  const { isSignedIn, isLoading } = useMyAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-1 h-screen">
        <Spin />
      </div>
    );
  }

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isSignedIn: isSignedIn,
        },
      }}
    />
  );
};
// Render the app
const rootElement = document.getElementById("app");

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl="/login"
      >
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <InnerApp />
          </QueryClientProvider>
        </AuthProvider>
      </ClerkProvider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
