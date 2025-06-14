import { DEFAULT_AUTHENTICATED_ROUTES } from "@/constants/routes";
import { SignInButton } from "@clerk/clerk-react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.auth.isSignedIn) {
      throw redirect({
        to: DEFAULT_AUTHENTICATED_ROUTES,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignInButton />
    </div>
  );
}
