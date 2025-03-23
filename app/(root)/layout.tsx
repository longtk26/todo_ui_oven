import type { Metadata } from "next";
import "../globals.css";
import Header from "@/containers/header/Header";
import { UserProvider } from "@/hooks/useUser";

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
            <body className={`antialiased bg-white/50 w-full h-screen`}>
                <UserProvider>
                    <Header />
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}
