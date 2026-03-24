import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { createGame } from "@/app/games/add/actions";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SideBar from "@/components/SideBar";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

const inputClass = "w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.07] focus:border-primary/30 rounded text-sm text-white/80 placeholder:text-white/15 outline-none transition-all duration-200 font-mono";
const labelClass = "block text-[10px] font-mono font-semibold uppercase tracking-widest text-white/30 mb-2";

export default async function AddGamePage() {
    const user = await stackServerApp.getUser();
    if (!user) redirect("/");

    const consoles = await prisma.consoles.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <SideBar currentPath="/games">
            <div className="w-full min-h-screen bg-base-300 p-6 lg:p-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-10">
                    <Link
                        href="/games"
                        className="flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors duration-200"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span className="text-xs font-mono uppercase tracking-widest">Games</span>
                    </Link>
                    <span className="text-white/10 font-mono">/</span>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Add Game
                    </h1>
                </div>

                {/* Centered form */}
                <div className="max-w-2xl mx-auto">
                    <form action={createGame} className="space-y-6">

                        {/* Cover upload — va primero para impacto visual */}
                        <div>
                            <label className={labelClass}>
                                Cover Image <span className="text-error">*</span>
                            </label>
                        </div>

                        {/* Título */}
                        <div>
                            <label className={labelClass}>
                                Title <span className="text-error">*</span>
                            </label>
                            <input
                                name="title"
                                type="text"
                                required
                                placeholder="e.g. Black Myth: Wukong"
                                className={inputClass}
                            />
                        </div>

                        {/* Desarrollador */}
                        <div>
                            <label className={labelClass}>
                                Developer <span className="text-error">*</span>
                            </label>
                            <input
                                name="developer"
                                type="text"
                                required
                                placeholder="e.g. Game Science"
                                className={inputClass}
                            />
                        </div>

                        {/* Género + Consola */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>
                                    Genre <span className="text-error">*</span>
                                </label>
                                <input
                                    name="genre"
                                    type="text"
                                    required
                                    placeholder="e.g. Action role-playing"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Console <span className="text-error">*</span>
                                </label>
                                <select
                                    name="consoleId"
                                    required
                                    defaultValue=""
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled className="bg-base-300 text-white/30">
                                        Select console...
                                    </option>
                                    {consoles.map((c) => (
                                        <option key={c.id} value={c.id} className="bg-base-300 text-white/80">
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Precio + Fecha */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>
                                    Price (USD) <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/50 font-mono text-sm font-bold pointer-events-none">$</span>
                                    <input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required
                                        placeholder="59.99"
                                        className={`${inputClass} pl-8`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Release Date <span className="text-error">*</span>
                                </label>
                                <input
                                    name="releasedate"
                                    type="date"
                                    required
                                    className={`${inputClass} [color-scheme:dark]`}
                                />
                            </div>
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className={labelClass}>
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                placeholder="A short description of the game..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* Divider */}
                        <div className="divider before:bg-white/5 after:bg-white/5 my-2" />

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3">
                            <Link
                                href="/games"
                                className="btn btn-sm btn-ghost text-[11px] uppercase tracking-widest font-semibold text-white/40 hover:text-white/70"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-sm btn-success text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 transform hover:scale-105"
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 3 7 8 15 8" />
                                </svg>
                                Save Game
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </SideBar>
    );
}