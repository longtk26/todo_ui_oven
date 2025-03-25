import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const CreateUserDTO = z
  .object({ name: z.string(), email: z.string(), password: z.string() })
  .passthrough();
const AuthUserResponseDataDTO = z
  .object({
    id: z.string(),
    email: z.string(),
    accessToken: z.string(),
    refreshToken: z.string(),
  })
  .passthrough();
const AuthUserResponseDTO = z
  .object({
    status: z.number(),
    message: z.string(),
    data: AuthUserResponseDataDTO,
  })
  .passthrough();
const SignInDTO = z
  .object({ email: z.string(), password: z.string() })
  .passthrough();
const VerifyUserResponseDataDTO = z
  .object({ id: z.string(), email: z.string() })
  .passthrough();
const VerifyUserResponseDTO = z
  .object({
    status: z.number(),
    message: z.string(),
    data: VerifyUserResponseDataDTO,
  })
  .passthrough();
const VerifyEmailUserResponseDataDTO = z
  .object({ id: z.string(), email: z.string(), isVerified: z.boolean() })
  .passthrough();
const VerifyEmailUserResponseDTO = z
  .object({
    status: z.number(),
    message: z.string(),
    data: VerifyEmailUserResponseDataDTO,
  })
  .passthrough();
const GetUserResponseDataDTO = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    isVerified: z.boolean(),
  })
  .passthrough();
const GetUserResponseDTO = z
  .object({
    status: z.number(),
    message: z.string(),
    data: GetUserResponseDataDTO,
  })
  .passthrough();
const CreateTaskDTO = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    startDate: z.string(),
    dueDate: z.string().optional(),
  })
  .passthrough();
const TaskResponseDataDTO = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    startDate: z.string().datetime({ offset: true }),
    dueDate: z.string().datetime({ offset: true }),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
    userId: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CreateTaskResponseDTO = z
  .object({
    status: z.number(),
    message: z.string(),
    data: TaskResponseDataDTO,
  })
  .passthrough();
const GetTaskResponseDTO = z
  .object({
    status: z.number(),
    message: z.string(),
    data: z.array(TaskResponseDataDTO),
  })
  .passthrough();
const UpdateTaskDTO = z
  .object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    dueDate: z.string(),
    startDate: z.string(),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  })
  .passthrough();
const EditTaskResponseDataDTO = z.object({ id: z.string() }).passthrough();
const EditTaskResponseDTO = z
  .object({
    status: z.number(),
    message: z.string(),
    data: EditTaskResponseDataDTO,
  })
  .passthrough();

export const schemas = {
  CreateUserDTO,
  AuthUserResponseDataDTO,
  AuthUserResponseDTO,
  SignInDTO,
  VerifyUserResponseDataDTO,
  VerifyUserResponseDTO,
  VerifyEmailUserResponseDataDTO,
  VerifyEmailUserResponseDTO,
  GetUserResponseDataDTO,
  GetUserResponseDTO,
  CreateTaskDTO,
  TaskResponseDataDTO,
  CreateTaskResponseDTO,
  GetTaskResponseDTO,
  UpdateTaskDTO,
  EditTaskResponseDataDTO,
  EditTaskResponseDTO,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/task",
    alias: "TaskController_createTask",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTaskDTO,
      },
    ],
    response: CreateTaskResponseDTO,
  },
  {
    method: "get",
    path: "/task",
    alias: "TaskController_getTasks",
    requestFormat: "json",
    response: GetTaskResponseDTO,
  },
  {
    method: "patch",
    path: "/task/:taskId",
    alias: "TaskController_updateTask",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTaskDTO,
      },
      {
        name: "taskId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: EditTaskResponseDTO,
  },
  {
    method: "delete",
    path: "/task/:taskId",
    alias: "TaskController_deleteTask",
    requestFormat: "json",
    parameters: [
      {
        name: "taskId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: EditTaskResponseDTO,
  },
  {
    method: "get",
    path: "/user/profile",
    alias: "UserController_profile",
    requestFormat: "json",
    response: GetUserResponseDTO,
  },
  {
    method: "post",
    path: "/user/sign-in",
    alias: "UserController_signIn",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SignInDTO,
      },
    ],
    response: AuthUserResponseDTO,
  },
  {
    method: "post",
    path: "/user/sign-up",
    alias: "UserController_signUp",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateUserDTO,
      },
    ],
    response: AuthUserResponseDTO,
  },
  {
    method: "post",
    path: "/user/verify",
    alias: "UserController_verify",
    requestFormat: "json",
    response: VerifyUserResponseDTO,
  },
  {
    method: "get",
    path: "/user/verify-email",
    alias: "UserController_verifyEmail",
    requestFormat: "json",
    parameters: [
      {
        name: "token",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: VerifyEmailUserResponseDTO,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
