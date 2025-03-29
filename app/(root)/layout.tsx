import type { Metadata } from "next";
import "../globals.css";
import Header from "@/containers/header/header";
import { UserProvider } from "@/hooks/use-user";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: "Todo App",
    description: "Todo App helps you to manage your tasks",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased bg-black/10 w-full h-screen`}>
                <UserProvider>
                    <Header />
                    {children}
                    <ToastContainer />
                </UserProvider>
            </body>
        </html>
    );
}
