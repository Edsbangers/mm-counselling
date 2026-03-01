import { siteConfig } from "@/lib/site-config";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Client Feedback and Trusted Counselling
          </h2>
          <p className="text-muted-foreground">
            MM-Counselling has received extensive positive client feedback,
            demonstrating trust and effectiveness in counselling services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {siteConfig.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 border border-border"
            >
              <p className="text-muted-foreground leading-relaxed italic mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-sm text-foreground">
                &mdash; {testimonial.attribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
