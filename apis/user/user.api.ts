import { apiClient, handleApiError, Result } from "..";
import { UserProfileResponseData } from "./user.api.types";
import { AxiosError } from "axios";

export const getUserProfileApi = async (
    accessToken: string
): Promise<Result<UserProfileResponseData>> => {
    try {
        const response = await apiClient.get("/user/profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};
