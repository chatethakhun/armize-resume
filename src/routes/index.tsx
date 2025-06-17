import { createFileRoute, redirect } from "@tanstack/react-router";
import "../App.css";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { DEFAULT_AUTHENTICATED_ROUTES } from "@/constants/routes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isSignedIn) {
      throw redirect({
        to: DEFAULT_AUTHENTICATED_ROUTES,
      });
    } else {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: App,
  loader: () => {
    return import("./index.tsx");
  },
});

function App() {
  return (
    <>
      <header>
        <SignedIn>
          <p>You are signed in</p>
          <UserButton />
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <p>You are signed out</p>
          <SignInButton />
        </SignedOut>
      </header>
    </>
  );
}
