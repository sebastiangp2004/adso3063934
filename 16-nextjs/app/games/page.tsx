import SideBar from "@/components/SideBar";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import GamesInfo from "@/components/GamesInfo";


export default async function GamesPage({
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
            <SideBar currentPath={'/games'}>
                <GamesInfo />
            </SideBar>
        </div>
    );
}