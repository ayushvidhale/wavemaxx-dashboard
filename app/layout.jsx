import { Inter } from "next/font/google";
import "../styles/main.scss";
import Navbar from "@/components/Navbar";
import CustomSessionProvider from "@/components/SessionProvider";
import Script from "next/script";
// import CookieConsent from "@/components/CookieConsent";
import NextTopLoader from "nextjs-toploader";
// import Providers from "./providers";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WaveMaxx Dashboard",
  description:
    "Monitoring and Managing 15,000 units across 3 locations, 24/7 in the cloud.",
  image: "https://i.imgur.com/9uX1Xqj.png",
  url: "./logo.png",
  type: "website",
  siteName: "WaveMaxx Dashboard",
};

export default function RootLayout({ children }) {
  // const categories = await getData("categories");

  return (
    <html lang="en" className="light">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js"
        strategy="beforeInteractive"
      />
      <body>
        <NextTopLoader color="#0000Ff" />
        <CustomSessionProvider>
          <Navbar children={children} />
        </CustomSessionProvider>
      </body>
    </html>
  );
}
