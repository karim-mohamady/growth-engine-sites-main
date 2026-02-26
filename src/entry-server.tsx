import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./AppRoutes";

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};
  const queryClient = new QueryClient();

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const headTags = [
    helmet?.title?.toString() || "",
    helmet?.meta?.toString() || "",
    helmet?.link?.toString() || "",
    helmet?.script?.toString() || "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return { appHtml, headTags };
}
