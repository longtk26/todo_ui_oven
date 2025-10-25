"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { verifyEmail } from "@/apis/auth/auth.api";

const ProfilePage = () => {
    const { user } = useUser();

    const handleToggleActivation = () => {
        if (!user?.isVerified) {
            verifyEmail();
            return;
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 my-auto">
            <section className="min-w-[150%] space-y-6 bg-white border rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold">Profile</h2>

                {/* Status Display */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-medium">Account Status</p>
                        <p
                            className={`text-sm ${
                                user?.isVerified
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {user?.isVerified ? "Active" : "Inactive"}
                        </p>
                    </div>
                    <Button
                        variant={user?.isVerified ? "outline" : "default"}
                        onClick={handleToggleActivation}
                    >
                        {user?.isVerified
                            ? "Activated Account"
                            : "Activate Account"}
                    </Button>
                </div>

                {/* Username */}
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user?.name} />
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="username" defaultValue={user?.email} />
                </div>

                {/* <Button className="mt-4">Update profile</Button> */}
            </section>
        </div>
    );
};

export default ProfilePage;
