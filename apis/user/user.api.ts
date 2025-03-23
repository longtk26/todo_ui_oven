import { apiClient, Result } from "..";
import { UserProfileResponseData } from "./user.api.types";

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
        console.error(error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
