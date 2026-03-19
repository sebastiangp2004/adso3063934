import SideBar from "@/components/SideBar";

import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";


export default async function DashboardPage({
    Children,
}: {
    Children: React.ReactNode
}) {

    const user = await stackServerApp.getUser();
    if (!user) {
        redirect("/");

    }
    return (
        <div>
            <SideBar currentPath={'/dashboard'}>
                {Children}
            </SideBar>
        </div>
    );
}