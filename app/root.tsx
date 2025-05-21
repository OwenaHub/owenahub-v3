import {
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
import SplashScreen from "./components/skeletons/splash-screen";
import DefaultError from "./components/errors/default-error";

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
    { name: "theme-color", content: "#FFF9F0" },
    { name: "keywords", content: "mentorship, mentors, development, professional, tech, software, ai, career" },
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
          position="top-right"
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
  return <SplashScreen />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <DefaultError error={error} />
}
