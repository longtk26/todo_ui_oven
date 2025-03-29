import TaskContainer from "@/containers/task/task-container";

export default async function Home() {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <TaskContainer />
        </main>
    );
}
