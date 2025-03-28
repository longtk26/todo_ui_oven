import { verifyTokenEmail } from "@/apis/auth/auth.api";

const VerifyEmailPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const token = (await searchParams).token;
    const response = await verifyTokenEmail(token);

    return (
        <main className="flex flex-col justify-center items-center h-screen bg-gray-50">
            <span
                className={`
                    text-lg font-semibold p-4 rounded-lg shadow-md transition-all duration-300
                    ${
                        response.success
                            ? "text-green-600 bg-green-100 border border-green-400"
                            : "text-red-600 bg-red-100 border border-red-400"
                    }
                    animate-fadeIn
                `}
            >
                {response.success
                    ? `Email ${response.data.email} verified successfully!`
                    : "Verification failed!"}
            </span>
        </main>
    );
};

export default VerifyEmailPage;
