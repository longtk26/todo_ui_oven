import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "Todo App Auth",
  description: "Todo App helps you to manage your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-white/50 w-full h-screen`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
