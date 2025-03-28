import { verifyTokenEmail } from "@/apis/auth/auth.api";

const VerifyEmailPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const token = (await searchParams).token;
    const response = await verifyTokenEmail(token);

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            {response.success ? (
                <span className="text-green-500">
                    Email {response.data.email} verified success
                </span>
            ) : (
                <span className="text-red-500">Verified failed</span>
            )}
        </main>
    );
};

export default VerifyEmailPage;
