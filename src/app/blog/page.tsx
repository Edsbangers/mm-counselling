import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Mental Health Articles & Resources",
  description:
    "Helpful articles on ADHD, trauma, anxiety, depression and mental wellbeing from MM Counselling in Portsmouth, Hampshire.",
};

// Placeholder blog posts - in a real app, these would come from a CMS or database
const blogPosts = [
  {
    slug: "understanding-adhd-adults",
    title: "Understanding ADHD in Adults: More Than Just Distraction",
    excerpt:
      "ADHD is often misunderstood as simply being easily distracted. For adults living with ADHD, the reality is far more complex and affects many aspects of daily life.",
    date: "2024-01-15",
    category: "ADHD",
    readTime: "5 min read",
  },
  {
    slug: "what-is-trauma-informed-therapy",
    title: "What is Trauma-Informed Therapy?",
    excerpt:
      "Trauma-informed therapy is an approach that recognises the widespread impact of trauma and understands paths for recovery. Here's what you need to know.",
    date: "2024-01-08",
    category: "Trauma",
    readTime: "4 min read",
  },
  {
    slug: "anxiety-vs-worry",
    title: "Anxiety vs Everyday Worry: How to Tell the Difference",
    excerpt:
      "Everyone worries sometimes, but how do you know when worry has crossed the line into anxiety that might benefit from professional support?",
    date: "2024-01-01",
    category: "Anxiety",
    readTime: "4 min read",
  },
  {
    slug: "setting-boundaries-guide",
    title: "A Practical Guide to Setting Boundaries",
    excerpt:
      "Setting boundaries is essential for healthy relationships, but many of us struggle to do it. This guide offers practical steps for establishing and maintaining boundaries.",
    date: "2023-12-20",
    category: "Relationships",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Articles and resources on mental health, wellbeing, and the topics
              I specialise in. I hope you find something helpful here.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="border-border/50 hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl hover:text-sage transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-sage hover:text-sage-dark transition-colors"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coming Soon Note */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                More articles coming soon. Check back regularly for new content
                on mental health and wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Browse by Topic
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog?category=adhd"
                className="bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-sage/10 transition-colors"
              >
                ADHD
              </Link>
              <Link
                href="/blog?category=trauma"
                className="bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-sage/10 transition-colors"
              >
                Trauma
              </Link>
              <Link
                href="/blog?category=anxiety"
                className="bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-sage/10 transition-colors"
              >
                Anxiety
              </Link>
              <Link
                href="/blog?category=depression"
                className="bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-sage/10 transition-colors"
              >
                Depression
              </Link>
              <Link
                href="/blog?category=relationships"
                className="bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-sage/10 transition-colors"
              >
                Relationships
              </Link>
              <Link
                href="/blog?category=wellbeing"
                className="bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-sage/10 transition-colors"
              >
                Wellbeing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
