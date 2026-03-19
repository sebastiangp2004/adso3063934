import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from "next/image";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

export default async function GamesInfo() {
    const games = await prisma.games.findMany({
        include: {
            console: true,
        },
    });

    return (
        <div className="w-full min-h-screen bg-base-300 p-6 lg:p-10">

            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight whitespace-nowrap">
                    Games
                </h1>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                <span className="text-xs font-mono text-primary/60 uppercase tracking-widest whitespace-nowrap">
                    {games.length} titles
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="group card bg-base-100/40 backdrop-blur-xl border border-white/[0.07] hover:border-primary/40 shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        {/* Image */}
                        <figure className="relative h-44 overflow-hidden">
                            <Image
                                src={`/imgs/${game.cover}`}
                                alt={game.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-base-300/90 via-transparent to-transparent" />

                            {/* Genre badge */}
                            <div className="absolute top-3 right-3 badge badge-sm bg-primary/20 border border-primary/30 text-primary backdrop-blur-md font-medium">
                                {game.genre}
                            </div>
                        </figure>

                        {/* Body */}
                        <div className="card-body p-4 gap-0">
                            <h2 className="card-title text-base text-white font-bold leading-snug line-clamp-2 mb-3">
                                {game.title}
                            </h2>

                            {/* Meta info */}
                            <div className="space-y-1.5 mb-3">
                                <div className="flex items-center gap-2 text-xs">
                                    <svg className="w-3.5 h-3.5 text-primary/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                    </svg>
                                    <span className="text-white/30 uppercase tracking-widest font-semibold text-[10px] w-12 shrink-0">Dev</span>
                                    <span className="text-white/70 truncate">{game.developer}</span>
                                </div>

                                <div className="flex items-center gap-2 text-xs">
                                    <svg className="w-3.5 h-3.5 text-primary/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                                    </svg>
                                    <span className="text-white/30 uppercase tracking-widest font-semibold text-[10px] w-12 shrink-0">Console</span>
                                    <span className="text-white/70 truncate">{game.console.name}</span>
                                </div>

                                <div className="flex items-center gap-2 text-xs">
                                    <svg className="w-3.5 h-3.5 text-primary/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                    </svg>
                                    <span className="text-white/30 uppercase tracking-widest font-semibold text-[10px] w-12 shrink-0">Release</span>
                                    <span className="text-white/70">{new Date(game.releasedate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="divider my-0 before:bg-white/5 after:bg-white/5" />

                            {/* Description */}
                            <p className="text-white/30 text-[11px] leading-relaxed line-clamp-2 my-2">
                                {game.description}
                            </p>

                            {/* Footer */}
                            <div className="card-actions items-center justify-between mt-1">
                                <span className="text-primary font-mono font-bold text-lg tracking-tight">
                                    ${game.price.toFixed(2)}
                                </span>
                                <button className="btn btn-sm btn-ghost border border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-primary/80 hover:text-white text-[11px] uppercase tracking-widest font-semibold transition-all duration-200">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}