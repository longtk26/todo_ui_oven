"use client";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
    const { user } = useUser();
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
            {
              !user?.isVerified && (
                <button className="bg-cyan-500 text-white px-4 py-2 rounded-md">
                    Verify now
                </button>
              )
            }
        </section>
    );
};

export default Profile;
