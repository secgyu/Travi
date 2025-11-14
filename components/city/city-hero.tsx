interface CityHeroProps {
  name: string;
  country: string;
  emoji: string;
  description: string;
  heroImage: string;
}

export function CityHero({ name, country, emoji, description, heroImage }: CityHeroProps) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <img src={heroImage || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-6xl">{emoji}</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{name}</h1>
              <p className="text-xl text-white/90">{country}</p>
            </div>
          </div>
          <p className="text-lg text-white/90 max-w-3xl">{description}</p>
        </div>
      </div>
    </div>
  );
}
