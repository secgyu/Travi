import Image from "next/image";

interface CityHeroProps {
  name: string;
  country: string;
  description: string;
  heroImage: string;
}

export function CityHero({ name, country, description, heroImage }: CityHeroProps) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <Image src={heroImage || "/placeholder.svg"} alt={name} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12">
          <div className="mb-4">
            <h1 className="text-5xl font-bold text-white mb-2">{name}</h1>
            <p className="text-xl text-white/90">{country}</p>
          </div>
          <p className="text-lg text-white/90 max-w-3xl">{description}</p>
        </div>
      </div>
    </div>
  );
}
