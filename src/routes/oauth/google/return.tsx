import { createFileRoute } from "@tanstack/react-router";
import { OAuthGoogleReturnPage } from "@/pages/OAuthGoogleReturn";

export const Route = createFileRoute("/oauth/google/return")({
  ssr: false,
  component: OAuthGoogleReturnPage,
});
