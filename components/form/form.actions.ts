import { loginApi, registerApi } from "@/apis/auth/auth.api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
    "use server";
    const email = formData.get("email")?.toString()!;
    const password = formData.get("password")?.toString()!;

    // Call the login API
    const response = await loginApi(email, password);
    if (!response.success) {
        console.error(response.error);
        return;
    }

    const { accessToken, refreshToken } = response.data;

    // Save the token to the cookies
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", accessToken);
    cookiesStore.set("refreshToken", refreshToken);

    // Redirect to the homepage
    redirect("/");
};

export const registerAction = async (formData: FormData) => {
    "use server";
    const email = formData.get("email")?.toString()!;
    const password = formData.get("password")?.toString()!;
    const name = formData.get("name")?.toString()!;

    // Call the register API
    const response = await registerApi({ email, password, name });
    if (!response.success) {
        console.error(response.error);
        return;
    }

    // Save the token to the cookies
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", response.data.accessToken);
    cookiesStore.set("refreshToken", response.data.refreshToken);

    // Redirect to the home page
    redirect("/");
}
