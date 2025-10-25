import type { Metadata } from "next";
import "../globals.css";
import { UserProvider } from "@/hooks/use-user";
import { ToastContainer } from "react-toastify";
import { BaseLayout } from "@/containers/layout/base-layout";
import { QueryProvider } from "@/providers/query-provider";

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
                <QueryProvider>
                    <UserProvider>
                        <BaseLayout>{children}</BaseLayout>
                        <ToastContainer />
                    </UserProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
