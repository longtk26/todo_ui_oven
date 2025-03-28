import Link from "next/link";
import { loginAction, registerAction } from "./form.actions";
import { componentsInForm } from "./form.data";

const FormAuth = ({ type }: { type: string }) => {
    const listInfoInform = componentsInForm[type];
    const messgeRedirect =
        type === "login"
            ? "or register an account?"
            : "or login with an existing account?";
    const formAction = type === "login" ? loginAction : registerAction;

    return (
        <section className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold capitalize">
                                {type}
                            </h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form
                                action={formAction}
                                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                            >
                                {listInfoInform.map((item) => (
                                    <div className="relative mt-2" key={item.name}>
                                        <input
                                            autoComplete={item.autoComplete}
                                            id={item.name}
                                            name={item.name}
                                            type={item.type}
                                            required={item.required}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder={item.placeHolder}
                                        />
                                        <label
                                            htmlFor={item.name}
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            {item.label}
                                        </label>
                                    </div>
                                ))}
                                <div className="relative">
                                    <button
                                        className="bg-cyan-500 text-white rounded-md px-2 py-1 cursor-pointer"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="relative text-sm">
                                    <Link
                                        href={`/${
                                            type === "login"
                                                ? "register"
                                                : "login"
                                        }`}
                                        className="text-cyan-500 text-right"
                                    >
                                        {messgeRedirect}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormAuth;
