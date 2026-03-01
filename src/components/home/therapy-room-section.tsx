import Image from "next/image";

export function TherapyRoomSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
            A Warm, Welcoming Space
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My therapy room is designed to feel comfortable and safe &mdash; a
            space where you can relax, reflect, and begin your journey towards
            healing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/therapy-room-1.jpg"
              alt="Marion's counselling room in Southsea - a comfortable, welcoming therapeutic space"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/therapy-room-3.webp"
              alt="The therapy room with natural light, stained glass windows and comfortable seating"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/therapy-room-2.jpg"
              alt="Detail of the therapy room - Things I Can Control cushion in a cosy setting"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
