import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "~/styles/shared.css";
import { Toaster } from "sonner"
import ProgressBar from "./components/navigation/progress-bar";
import { Button } from "./components/ui/button";
import AppName from "./components/custom/app-name";
import { Zap } from "lucide-react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "OwenaHub" },
    { name: "description", content: "Join OwenaHub and connect with top tech mentors to advance your career. Learn to code wtih guidance, career advice, and skill development." },
    { name: "theme-color", content: "#FFE1BC" },
    { name: "keywords", content: "mentorship, mentors, development, professional, tech, software, ai" },
    { name: "author", content: "OwenaHub" },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: "OwenaHub | Build Your Career with Expert Mentors" },
    { property: "og:description", content: "Join OwenaHub and connect with top tech mentors to advance your career" },
    { property: "og:image", content: "https://owenahub.com/images/logos/banner_image.png" }, // image URL
    { property: "og:url", content: "https://owenahub.com" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "OwenaHub | Build Your Career with Expert Mentors" },
    { name: "twitter:description", content: "Join OwenaHub and connect with top tech mentors to advance your career" },
    { name: "twitter:image", content: "https://owenahub.com/images/logos/banner_image.png" }, // image URL
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster
          richColors
          // closeButton
          position="top-center"
          toastOptions={{
            classNames: {
              // toast: 'toast',
              // title: 'title',
              // description: 'description',
              actionButton: '!px-2 !rounded-full !text-white',
              // cancelButton: 'cancel-button',
              // closeButton: 'close-button',
            },
          }}
        />
        <ProgressBar />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <img src="/images/logos/logo.png" alt="..." width={30} />
          <div className="text-center mb-3">
            <AppName size="text-base" />
          </div>
        </div>
        <span className="w-full h-1 animate-pulse bg-gray-300 rounded-md block mb-3" />
        <p className="flex items-center gap-1 justify-center">
          <Zap size={14} />
          <span className="text-gray-700 text-xs font-light">Learn by doing</span>
        </p>
      </div>
    </div>
  );
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="max-w-[80vw] -translate-x-1/2 -translate-y-1/2 fixed left-1/2 top-1/2 transform">
      <div className="">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-gray-400">{message}</h1>
            <div className="text-2xl">
              😵
            </div>
          </div>
          <p>{details}</p>
          {stack && (
            <pre className="p-4 w-full overflow-x-auto">
              <code>{stack}</code>
            </pre>
          )}

          <div className="flex gap-5 items-center mt-3">
            <Link to={"/dashboard"}>
              <Button variant={"outline"} className="h-8 text-sm py-0">
                Go home
              </Button>
            </Link>

            <Button
              onClick={() => window.location.reload()}
              className="bg-gray-800 h-8 text-sm text-white px-5 py-1"
            >
              Reload
            </Button>
          </div>
        </div>
      </div>
    </main >
  );
}
