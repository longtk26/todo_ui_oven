import Dashboard from "@/components/dashboard/dashboard";
import { BaseLayout } from "@/containers/layout/base-layout";

export default async function Home() {
    return (
        <BaseLayout>
            <Dashboard />
        </BaseLayout>
    );
}
