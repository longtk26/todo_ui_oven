"use client";
import { verifyEmail } from "@/apis/auth/auth.api";
import { useUser } from "@/hooks/useUser";
import cookies from "js-cookie";
import { toast } from "react-toastify";

const Profile = () => {
    const { user } = useUser();
    const sendVerifyEmail = async () => {
        const accessToken = cookies.get("accessToken");

        if (!accessToken) {
            return;
        }

        const data = await verifyEmail(accessToken);

        if (!data.success) {
            return;
        }

        toast.success(`Email sent to ${data.data?.email}`);
    };
    return (
        <section className="flex gap-x-4 items-center">
            <p className="font-bold">Hi! {user?.name}</p>
            <p
                className={`${
                    user?.isVerified ? "text-green-500" : "text-red-500"
                }`}
            >
                {user?.isVerified ? "Verified" : "Not verified"}
            </p>
            {!user?.isVerified && (
                <button
                    onClick={sendVerifyEmail}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                    Verify now
                </button>
            )}
        </section>
    );
};

export default Profile;
