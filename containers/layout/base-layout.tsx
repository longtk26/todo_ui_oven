"use client";
import React, { useState } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LogoIcon } from "@/components/logo/logo-icon";
import { LogoApp } from "@/components/logo/logo-app";
import { useUser } from "@/hooks/use-user";
import Loading from "@/components/loading/Loading";
import { links } from "./navigation-list";

export function BaseLayout({ children }: { children: React.ReactNode }) {
    const open = true;
    const { user } = useUser();

    if (!user) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loading />
            </div>
        );
    }
    return (
        <div
            className={cn(
                "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "h-screen"
            )}
        >
            <Sidebar open={open}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <LogoApp /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: user.email,
                                href: "#",
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
        </div>
    );
}
