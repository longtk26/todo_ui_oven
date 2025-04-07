"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfileApi } from "@/apis/user/user.api";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserProfileApi();
            if (!data.success) {
                router.push("/login");
                return;
            }

            setUser(data.data);
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
