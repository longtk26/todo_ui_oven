export type FormComponent = {
    type: string;
    name: string;
    placeHolder: string;
    label: string;
    autoComplete: string;
    required?: boolean;
};

export type FormType = "login" | "register";

export type IFormSignInInput = {
    email: string;
    password: string;
};

export type IFormSignUpInput = IFormSignInInput & {
    name: string;
};
