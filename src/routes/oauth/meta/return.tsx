import { createFileRoute } from "@tanstack/react-router";
import { OAuthMetaReturnPage } from "@/pages/OAuthMetaReturn";

export const Route = createFileRoute("/oauth/meta/return")({
  ssr: false,
  component: OAuthMetaReturnPage,
});
