import { loginApi, registerApi } from "@/apis/auth/auth.api";
import cookies from "js-cookie";
import { IFormSignInInput, IFormSignUpInput } from "./form.types";

export const loginAction = async (formData: IFormSignInInput) => {
    // Call the login API
    const response = await loginApi(formData.email, formData.password);
    console.log("response", response);
    if (!response.success) {
        console.error(response.error);

        throw new Error(response.error);
    }
    // Save the token to the cookies
    const { accessToken, refreshToken } = response.data;
    await saveTokenToCookies(accessToken, refreshToken);

    // Redirect to the homepage
};

export const registerAction = async (formData: IFormSignUpInput) => {
    // Call the register API
    const response = await registerApi({
        email: formData.email,
        password: formData.password,
        name: formData.name,
    });
    if (!response.success) {
        console.error(response.error);

        throw new Error(response.error);
    }

    // Save the token to the cookies
    const { accessToken, refreshToken } = response.data;
    await saveTokenToCookies(accessToken, refreshToken);
};

export const saveTokenToCookies = async (
    accessToken: string,
    refreshToken: string
) => {
    // Save the tokens to cookies
    cookies.set("accessToken", accessToken, { expires: 7 });
    cookies.set("refreshToken", refreshToken, { expires: 7 });
};
