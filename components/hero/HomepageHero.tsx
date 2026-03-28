import { Link } from "@/components/ui/Link";
import Image from "next/image";
import { CompassIcon } from "@phosphor-icons/react/ssr";

const data = {
  image: "https://cwa85we8af.ufs.sh/f/SO1ud1ITdHjyIP0nAeCidjmX8w6aeCGnyT3zYINqLPOJQ50V",
  title: "Log your journey, your way",
  description:
    "From the urban pulse of Nairobi to the serene shores of Watamu, Tripni is the first travel logger designed specifically for the Kenyan traveler.",
  cta: [
    {
      label: "Start your trip",
      href: "/create",
    },
  ],
};

export function HomepageHero() {
  return (
    <header className="container container-grid py-container-block-sm md:py-container-block gap-y-12">
      <article className="col-span-full flex-center-col gap-y-3">
        <h1 className="font-display text-heading-medium text-primary capitalize md:text-heading-large max-w-[50ch] text-center">
          {data.title}
        </h1>
        <p className="max-w-[65ch] text-center text-sm">{data.description}</p>
        <div className="flex-row-start items-center mt-2">
          {data.cta.map((cta, index) => (
            <Link key={index} href={cta.href} variant="primary">
              <span>{cta.label}</span>
              <CompassIcon weight="fill" size={20} />
            </Link>
          ))}
        </div>
      </article>

      <div className="col-span-full flex-center-col">
        <Image
          src={data.image}
          width={1000}
          height={1000}
          className="object-contain max-w-full max-h-[35rem]"
          alt=""
          priority
        />
      </div>
    </header>
  );
}
