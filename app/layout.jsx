import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  title: "InnovateEDU Hub",
  description: "Web-based platform designed to enhance the visibility and accessibility of academic research while fostering collaboration among researchers, students, and mentors in the educational sector.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased text-gray-900 bg-[#f0f4f8]`}>
        {children}
      </body>
    </html>
  );
}
