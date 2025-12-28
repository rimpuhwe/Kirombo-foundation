import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";

const Biography = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-deep-green text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Abdallah Kiromba
              </h1>
              <p className="text-2xl text-white/90">
                Founder & Visionary Leader
              </p>
            </motion.div>
          </div>
        </section>
        {/* Our Founder & Legacy */}
        <section className="py-16 bg-background text-foreground">
          <div className="container mx-auto px-4 max-w-4xl">
            <SectionHeader title="Our Founder & Legacy" centered={false} />
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              The{" "}
              <strong className="text-primary">
                Abdallah Kiromba Foundation
              </strong>{" "}
              is a Rwandan non-profit organization founded by{" "}
              <strong className="text-primary">Higiro Issa</strong>,{" "}
              <strong className="text-primary">Bbale Bwanika Sullaiman</strong>,
              and <strong className="text-primary">Niyonsaba Donat</strong>. The
              foundation was established in loving memory of the late{" "}
              <strong className="text-primary">Abdallah Kiromba</strong>, whose
              life was guided by strong values of family unity, compassion, and
              service to other.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              The founders came together with a shared vision: to preserve{" "}
              <strong className="text-primary">
                Abdallah Kiromba’s legacy
              </strong>
              by transforming empathy into action and ensuring that vulnerable
              communities are supported through dignity-centered and sustainable
              initiatives .
            </p>
          </div>
        </section>

        {/* Honoring a Life of Purpose */}
        <section className="py-16 bg-muted text-foreground">
          <div className="container mx-auto px-4 max-w-4xl">
            <SectionHeader
              title="Honoring a Life of Purpose"
              centered={false}
            />
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              <strong className="text-primary">Abdallah Kiromba’s life</strong>{" "}
              continues to inspire the foundation’s mission. His belief in
              empowering people rather than offering temporary relief shaped the
              core philosophy of the organization. The foundation reflects his
              values by focusing on long-term impact by helping individuals and
              families build{" "}
              <span className="font-bold text-primary">self-reliance</span>,{" "}
              <span className="font-bold text-primary">confidence</span>, and{" "}
              <span className="font-bold text-primary">
                hope for the future
              </span>
              .
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Through every program and partnership, the foundation strives to
              reflect the principles he stood for:{" "}
              <span className="font-bold text-primary">generosity</span>,{" "}
              <span className="font-bold text-primary">responsibility</span>,
              and{" "}
              <span className="font-bold text-primary">
                commitment to community well-being
              </span>
              .
            </p>
          </div>
        </section>

        {/* Our Commitment to Communities */}
        <section className="py-16 bg-background text-foreground">
          <div className="container mx-auto px-4 max-w-4xl">
            <SectionHeader
              title="Our Commitment to Communities"
              centered={false}
            />
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              The Abdallah Kiromba Foundation is dedicated to uplifting
              communities through practical and sustainable solutions that
              improve both livelihoods and social well-being . Our work spans
              multiple areas of impact, including:
            </p>
            <ul className="list-disc pl-6 text-lg md:text-xl mb-8 space-y-2">
              <li>
                Livestock and nutrition programs that strengthen food security
              </li>
              <li>
                Skills training and economic empowerment for teenage mothers and
                youth
              </li>
              <li>Orphan care and access to education</li>
              <li>
                Islamic seasonal giving grounded in compassion and shared
                responsibility
              </li>
              <li>Tailoring initiatives that promote long-term independence</li>
            </ul>
            <p className="text-lg md:text-xl leading-relaxed">
              Each initiative is designed to address real community needs while
              fostering
              <span className="font-bold text-primary">resilience</span>,{" "}
              <span className="font-bold text-primary">dignity</span>, and{" "}
              <span className="font-bold text-primary">opportunity</span>.
            </p>
          </div>
        </section>

        {/* A Living Legacy */}
        <section className="py-16 bg-muted text-foreground">
          <div className="container mx-auto px-4 max-w-4xl">
            <SectionHeader title="A Living Legacy" centered={false} />
            <p className="text-lg md:text-xl leading-relaxed">
              Today, the
              <strong className="text-primary">
                Abdallah Kiromba Foundation
              </strong>
              stands as more than a foundation, it is a{" "}
              <span className="font-bold text-primary">living legacy</span>.
              Guided by the vision of its founders and inspired by the life of{" "}
              <strong className="text-primary">Abdallah Kiromba</strong>, the
              foundation continues to serve as a bridge between{" "}
              <span className="font-bold text-primary">compassion</span> and{" "}
              <span className="font-bold text-primary">action</span>, ensuring
              that vulnerable individuals are not only supported, but empowered
              to shape their own futures .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Biography;
