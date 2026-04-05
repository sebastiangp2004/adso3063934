import { PrismaClient } from "@/app/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from "next/image";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

// ================================================================
//  DATA FETCHING
// ================================================================

async function getDashboardData() {
    const [consoles, games] = await Promise.all([
        prisma.consoles.findMany({
            include: { games: true },
            orderBy: { releasedate: "asc" },
        }),
        prisma.games.findMany({
            include: { console: true },
            orderBy: { releasedate: "desc" },
        }),
    ]);

    const totalConsoles   = consoles.length;
    const totalGames      = games.length;
    const avgPrice        = totalGames > 0
        ? games.reduce((sum, g) => sum + g.price, 0) / totalGames
        : 0;

    // Juego más caro
    const mostExpensive = games.reduce<typeof games[0] | null>(
        (max, g) => (!max || g.price > max.price ? g : max), null
    );

    // Géneros: contar cuántos juegos hay por género
    const genreMap = games.reduce<Record<string, number>>((acc, g) => {
        acc[g.genre] = (acc[g.genre] ?? 0) + 1;
        return acc;
    }, {});
    const topGenres = Object.entries(genreMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    // Consola con más juegos
    const richestConsole = [...consoles].sort(
        (a, b) => b.games.length - a.games.length
    )[0] ?? null;

    // Últimos 4 juegos añadidos
    const recentGames = games.slice(0, 4);

    return {
        totalConsoles, totalGames, avgPrice,
        mostExpensive, topGenres, richestConsole,
        recentGames, consoles,
    };
}

// ================================================================
//  SUB-COMPONENTES
// ================================================================

function StatCard({
    label, value, sub, accent = "primary",
}: {
    label: string;
    value: string | number;
    sub?: string;
    accent?: "primary" | "success" | "info" | "warning";
}) {
    const colors: Record<string, string> = {
        primary: "border-primary/20 bg-primary/5 text-primary",
        success: "border-success/20 bg-success/5 text-success",
        info:    "border-info/20    bg-info/5    text-info",
        warning: "border-warning/20 bg-warning/5 text-warning",
    };
    return (
        <div className={`rounded-2xl border p-5 ${colors[accent]} backdrop-blur-xl`}>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-1">{label}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {sub && <p className="text-[11px] font-mono opacity-50 mt-1 truncate">{sub}</p>}
        </div>
    );
}

// ================================================================
//  COMPONENTE PRINCIPAL
// ================================================================

export default async function DashboardPage() {
    const {
        totalConsoles, totalGames, avgPrice,
        mostExpensive, topGenres, richestConsole,
        recentGames, consoles,
    } = await getDashboardData();

    const maxGames = Math.max(...consoles.map((c) => c.games.length), 1);

    return (
        <div className="w-full min-h-screen bg-base-300 p-6 lg:p-10 space-y-10">

            {/* ── Header ── */}
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                    <p className="text-xs font-mono text-white/30 uppercase tracking-widest mt-0.5">
                        Overview of your game library
                    </p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Consoles"
                    value={totalConsoles}
                    sub="platforms registered"
                    accent="primary"
                />
                <StatCard
                    label="Total Games"
                    value={totalGames}
                    sub="across all platforms"
                    accent="success"
                />
                <StatCard
                    label="Avg. Price"
                    value={`$${avgPrice.toFixed(2)}`}
                    sub="per game"
                    accent="info"
                />
                <StatCard
                    label="Most Expensive"
                    value={mostExpensive ? `$${mostExpensive.price.toFixed(2)}` : "—"}
                    sub={mostExpensive?.title ?? "No games yet"}
                    accent="warning"
                />
            </div>

            {/* ── Fila media: Juegos por consola + Top géneros ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Juegos por consola — ocupa 2/3 */}
                <div className="lg:col-span-2 bg-base-100/40 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight">Games per Console</h2>
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">distribution</p>
                        </div>
                    </div>

                    {consoles.length === 0 ? (
                        <p className="text-white/20 text-sm font-mono text-center py-8">No consoles yet</p>
                    ) : (
                        <div className="space-y-4">
                            {consoles
                                .sort((a, b) => b.games.length - a.games.length)
                                .map((c) => {
                                    const pct = maxGames > 0 ? (c.games.length / maxGames) * 100 : 0;
                                    return (
                                        <div key={c.id} className="flex items-center gap-3">
                                            {/* Imagen miniatura */}
                                            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/[0.07]">
                                                <Image
                                                    src={`/imgs/${c.image}`}
                                                    alt={c.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            {/* Nombre + barra */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-mono text-white/70 truncate pr-2">{c.name}</span>
                                                    <span className="text-[10px] font-mono text-primary/70 shrink-0">
                                                        {c.games.length} {c.games.length === 1 ? "game" : "games"}
                                                    </span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all duration-500"
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>

                {/* Top géneros — ocupa 1/3 */}
                <div className="bg-base-100/40 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-7 h-7 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight">Top Genres</h2>
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">by game count</p>
                        </div>
                    </div>

                    {topGenres.length === 0 ? (
                        <p className="text-white/20 text-sm font-mono text-center py-8">No games yet</p>
                    ) : (
                        <div className="space-y-3">
                            {topGenres.map(([genre, count], i) => (
                                <div key={genre} className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-white/20 w-4 shrink-0">#{i + 1}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-mono text-white/70 truncate pr-1">{genre}</span>
                                            <span className="text-[10px] font-mono text-success/70 shrink-0">{count}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-success/60 to-success rounded-full"
                                                style={{ width: `${(count / (topGenres[0]?.[1] ?? 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Consola destacada */}
                    {richestConsole && (
                        <div className="mt-6 pt-5 border-t border-white/[0.06]">
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Top Platform</p>
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/[0.07] shrink-0">
                                    <Image
                                        src={`/imgs/${richestConsole.image}`}
                                        alt={richestConsole.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{richestConsole.name}</p>
                                    <p className="text-[10px] font-mono text-white/30">
                                        {richestConsole.games.length} games · {richestConsole.manufacturer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Últimos juegos añadidos ── */}
            <div className="bg-base-100/40 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-7 h-7 rounded-lg bg-info/10 border border-info/20 flex items-center justify-center">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-info">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white tracking-tight">Recently Added Games</h2>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">latest 4 entries</p>
                    </div>
                </div>

                {recentGames.length === 0 ? (
                    <p className="text-white/20 text-sm font-mono text-center py-8">No games yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentGames.map((game) => (
                            <div
                                key={game.id}
                                className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-info/30 transition-colors duration-200"
                            >
                                {/* Cover miniatura */}
                                <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-white/[0.07]">
                                    <Image
                                        src={`/imgs/${game.cover}`}
                                        alt={game.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* Info */}
                                <div className="min-w-0 flex flex-col justify-between py-0.5">
                                    <div>
                                        <p className="text-xs font-bold text-white/90 line-clamp-2 leading-snug">{game.title}</p>
                                        <p className="text-[10px] font-mono text-white/30 mt-0.5 truncate">{game.genre}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-[10px] font-mono text-primary font-bold">${game.price.toFixed(2)}</span>
                                        <span className="text-[9px] font-mono text-white/20 truncate ml-1">{game.console.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}