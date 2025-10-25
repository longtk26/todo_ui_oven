"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Link from "next/link";
import { BottomGradient, LabelInputContainer } from "./form-common";
import { IFormSignUpInput } from "./form.types";
import { registerAction } from "./form.actions";
import { useRouter } from "next/navigation";

export function FormSignup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormSignUpInput>();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormSignUpInput> = async (data) => {
        try {
            await registerAction(data);
            router.push("/");
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };
    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black border">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Welcome to Todo App
            </h2>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Tyler"
                            type="text"
                            {...register("name", {
                                required: true,
                                minLength: {
                                    value: 2,
                                    message:
                                        "Name must be at least 2 characters long",
                                },
                            })}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name?.type === "minLength" && (
                            <span className="text-red-500 text-[12px] ml-1">
                                Name must be at least 2 characters long
                            </span>
                        )}
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="abc@gmail.com"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email?.type === "pattern" && (
                        <span className="text-red-500 text-[12px] ml-1">
                            Email is not valid
                        </span>
                    )}
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters long",
                            },
                        })}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password?.type === "minLength" && (
                        <span className="text-red-500 text-[12px] ml-1">
                            Password must be at least 6 characters long
                        </span>
                    )}
                </LabelInputContainer>

                <Button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </Button>
                <Link href={"/login"}>
                    <Button
                        variant="link"
                        className="mt-4 w-full text-center text-sm text-blue-500 hover:underline cursor-pointer"
                    >
                        Already have an account? Sign in
                    </Button>
                </Link>

                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            </form>
        </div>
    );
}
