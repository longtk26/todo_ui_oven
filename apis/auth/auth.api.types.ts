export type AuthRegisterApiTypes = {
    name: string;
    email: string;
    password: string;
}

export type AuthUserResponseData = {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export type VerifyEmailResponseData = {
    id: string;
    email: string
}

export type VerifyEmailTokenResponseData = {
    id: string;
    email: string;
    isVerified: boolean
}