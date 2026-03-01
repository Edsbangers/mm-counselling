import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center">
      {/* Background image */}
      <Image
        src="/images/trees.webp"
        alt="Sunlight filtering through trees"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif leading-tight mb-6">
          Professional Counselling Services in Portsmouth
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          MM-Counselling offers empathic and approachable counselling services
          at my Southsea based practice, providing clients with professional
          support for anxiety, trauma, depression, relationship difficulties
          and more. Led by Marion Morris, a BACP-registered psychotherapeutic
          counsellor.
        </p>

        <Link
          href="/contact"
          className="inline-block border border-white text-white px-8 py-4 text-sm tracking-wide hover:bg-white hover:text-[#1b1b1b] transition-all duration-300"
        >
          Schedule an Introductory Session
        </Link>
      </div>
    </section>
  );
}
