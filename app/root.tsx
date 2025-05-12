import {
  isRouteErrorResponse,
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
import { ArrowLeft, RotateCw } from "lucide-react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;1,400&display=swap",
    // href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "OwenaHub | Build your career with expert mentors" },
    { name: "description", content: "Join OwenaHub and connect with top tech mentors to advance your career. Learn to code wtih guidance, career advice, and skill development." },
    { name: "theme-color", content: "#F6A700" },
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
        {/* Google Analytics Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HSLS7K2448"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HSLS7K2448');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster
          richColors
          closeButton
          position="top-center"
          toastOptions={{
            classNames: {
              actionButton: '!px-2 !rounded-full !text-white',
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
        <div className="flex flex-row gap-3 mb-7 items-center">
          <img src="/images/logos/logo.png" alt="OwenaHub" width={40} />
          <div className="text-end leading-3">
            <AppName size="text-base" />
            <span className="text-gray-700 text-xs font-normal animate-pulse">Learn by doing</span>
          </div>
        </div>
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
    <main className="w-full max-w-5xl container -translate-x-1/2 -translate-y-1/2 fixed left-1/2 top-1/2 transform">
      <h1 className="text-primary font-bold">{message}</h1>
      <p className="text-gray-400">{details}</p>
      {stack && (
        <pre className="p-4 max-w-4/5 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 mt-8">
        <Button
          variant={"outline"}
          onClick={() => window.history.back()}
          className="rounded h-8 text-sm md:py-4 py-5 flex items-center gap-1">
          <ArrowLeft size={18} /> <span>Back</span>
        </Button>

        <Button
          onClick={() => window.location.reload()}
          className="bg-gray-800 rounded h-8 text-sm text-white px-10 md:py-4 py-5 flex items-center gap-1"
        >
          <span>Reload</span> <RotateCw size={18} />
        </Button>
      </div>
    </main >
  );
}
