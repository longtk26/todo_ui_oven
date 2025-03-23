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