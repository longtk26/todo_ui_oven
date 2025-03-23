import { config } from "@/configs/config";
import { createApiClient } from "./zod";

export const apiClient = createApiClient(config.serverUrl);

export type Result<T> = { success: true; data: T } | { success: false; error: string };

