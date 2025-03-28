import { FormComponent } from "./form.types";

export const componentsInForm: { [key: string]: FormComponent[] } = {
    login: [
        {
            type: "email",
            name: "email",
            placeHolder: "Email address",
            label: "Email Address",
            autoComplete: "off",
            required: true,
        },
        {
            type: "password",
            name: "password",
            placeHolder: "Password",
            label: "Password",
            autoComplete: "off",
            required: true,
        },
    ],
    register: [
        {
            type: "text",
            name: "name",
            placeHolder: "Name",
            label: "Name",
            autoComplete: "off",
            required: true,
        },
        {
            type: "email",
            name: "email",
            placeHolder: "Email address",
            label: "Email Address",
            autoComplete: "off",
            required: true,
        },
        {
            type: "password",
            name: "password",
            placeHolder: "Password",
            label: "Password",
            autoComplete: "off",
            required: true,
        },
        {
            type: "password",
            name: "confirmPassword",
            placeHolder: "Confirm Password",
            label: "Confirm Password",
            autoComplete: "off",
            required: true,
        },
    ],
    task: [
        {
            type: "text",
            name: "name",
            placeHolder: "Task Name",
            label: "Task Name",
            autoComplete: "off",
            required: true,
        },
        {
            type: "datetime-local",
            name: "startDate",
            placeHolder: "Start Date",
            label: "Start Date",
            autoComplete: "off",
            required: true,
        },
        {
            type: "datetime-local",
            name: "dueDate",
            placeHolder: "Due Date",
            label: "Due Date",
            autoComplete: "off",
            required: true,
        },
        {
            type: "text",
            name: "description",
            placeHolder: "Description",
            label: "Description",
            autoComplete: "off",
            required: false,
        },
    ]
};