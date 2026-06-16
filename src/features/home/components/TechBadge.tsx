export function TechBadge({ icon, name }: { icon: React.ReactNode; name: string }) {
    return (
        <span className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:text-white">
            <span className="text-xl">{icon}</span>
            {name}
        </span>
    );
}