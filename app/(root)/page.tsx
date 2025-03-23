import { getUserProfileApi } from "@/apis/user/user.api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
        redirect("/login");
    }

    const data = await getUserProfileApi(accessToken);
    if (!data.success) {
        redirect("/login");
    }

    console.log(data.data);

    return <>Hello {data.data.email}</>;
}
