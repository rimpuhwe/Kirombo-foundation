import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Heart } from "lucide-react";

const Donate = () => {
  const donationLevels = [
    {
      amount: "$50",
      title: "Education Supporter",
      description: "Provides school supplies and textbooks for 5 students for one semester",
      benefits: [
        "Monthly impact newsletter",
        "Digital thank-you certificate",
        "Annual impact report",
      ],
    },
    {
      amount: "$150",
      title: "Healthcare Champion",
      description: "Funds medical supplies for a mobile clinic serving 50 patients",
      benefits: [
        "Quarterly program updates",
        "Recognition on donor wall",
        "Exclusive webinar invitations",
        "Impact stories from the field",
      ],
      featured: true,
    },
    {
      amount: "$500",
      title: "Community Builder",
      description: "Supports vocational training programs for 10 community members",
      benefits: [
        "VIP facility tour opportunity",
        "Direct updates from program directors",
        "Featured in annual report",
        "Exclusive donor events",
        "Photo updates from projects",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-deep-green text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Heart size={64} className="mx-auto mb-6 text-secondary" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Make a Difference Today</h1>
              <p className="text-2xl text-white/90">
                Your generosity transforms lives and builds stronger communities
              </p>
            </motion.div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              subtitle="Your Impact"
              title="Where Your Donation Goes"
              description="We maintain complete transparency in how donations are used to create maximum community impact."
            />

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card p-8 rounded-2xl shadow-soft text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-primary">85%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Programs</h3>
                <p className="text-muted-foreground">
                  Directly funds education, healthcare, and development initiatives
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-soft text-center"
              >
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-secondary">10%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Operations</h3>
                <p className="text-muted-foreground">
                  Ensures efficient program delivery and community support
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card p-8 rounded-2xl shadow-soft text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-primary">5%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Fundraising</h3>
                <p className="text-muted-foreground">
                  Enables us to grow our reach and serve more communities
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Donation Levels */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionHeader
              subtitle="Donation Options"
              title="Choose Your Impact Level"
              description="Every contribution makes a difference. Select a giving level that works for you."
            />

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {donationLevels.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all ${
                    level.featured ? "ring-2 ring-secondary transform md:scale-105" : ""
                  }`}
                >
                  {level.featured && (
                    <div className="bg-secondary text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <div className="text-5xl font-bold text-primary mb-2">{level.amount}</div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{level.title}</h3>
                  <p className="text-muted-foreground mb-6">{level.description}</p>

                  <div className="space-y-3 mb-8">
                    {level.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      level.featured
                        ? "bg-secondary hover:bg-secondary/90"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                    size="lg"
                  >
                    Donate {level.amount}
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-lg text-muted-foreground mb-6">
                Want to make a different amount or set up a recurring donation?
              </p>
              <Button variant="outline" size="lg">
                Custom Donation Amount
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              subtitle="More Options"
              title="Other Ways to Support Our Work"
              description="Explore additional opportunities to make a meaningful impact."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                { title: "Corporate Matching", desc: "Double your impact through employer matching" },
                { title: "Legacy Giving", desc: "Include AKF in your estate planning" },
                { title: "In-Kind Donations", desc: "Contribute goods and services" },
                { title: "Fundraise for Us", desc: "Start your own fundraising campaign" },
              ].map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl shadow-soft hover:shadow-medium transition-all text-center"
                >
                  <h3 className="font-bold text-lg mb-2 text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.desc}</p>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Learn More
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Donate;
