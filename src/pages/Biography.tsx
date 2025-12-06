import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import founderPortrait from "@/assets/founder-portrait.jpg";

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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Abdallah Kiromba</h1>
              <p className="text-2xl text-white/90">Founder & Visionary Leader</p>
            </motion.div>
          </div>
        </section>

        {/* Biography Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-1"
                >
                  <div className="sticky top-24">
                    <img
                      src={founderPortrait}
                      alt="Abdallah Kiromba"
                      className="w-full rounded-2xl shadow-strong mb-6"
                    />
                    <div className="bg-card p-6 rounded-xl shadow-soft">
                      <h3 className="font-bold text-xl mb-4">Quick Facts</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-semibold text-muted-foreground">Born:</span>
                          <p className="text-foreground">Kampala, Uganda</p>
                        </div>
                        <div>
                          <span className="font-semibold text-muted-foreground">Education:</span>
                          <p className="text-foreground">MSc Development Studies</p>
                        </div>
                        <div>
                          <span className="font-semibold text-muted-foreground">Founded AKF:</span>
                          <p className="text-foreground">2008</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-2 space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-primary">Early Life & Education</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      Abdallah Kiromba was born and raised in Kampala, Uganda, where he witnessed
                      firsthand the challenges faced by underserved communities. Growing up in a
                      modest household, he understood the transformative power of education and the
                      importance of community support.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      His early experiences shaped his worldview and instilled in him a deep
                      commitment to social justice and community development. After completing his
                      primary and secondary education with distinction, he pursued higher education,
                      earning a Master's degree in Development Studies with a focus on sustainable
                      community development.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-primary">Professional Journey</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      Before founding the Abdallah Kiromba Foundation, Abdallah spent over a decade
                      working with various international NGOs and development organizations across
                      East Africa. His roles ranged from field coordinator to regional director,
                      giving him comprehensive insights into effective community development
                      strategies.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Through his work, he identified critical gaps in service delivery and
                      recognized the need for a more holistic, community-centered approach to
                      development. This realization became the catalyst for establishing the
                      foundation in 2008.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-primary">
                      Founding the Foundation
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      In 2008, Abdallah founded the Abdallah Kiromba Foundation with a clear
                      vision: to create sustainable, community-led development initiatives that
                      address the root causes of poverty. Starting with a small team and limited
                      resources, the foundation launched its first education program in rural
                      Uganda.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Under his leadership, the foundation has grown from serving a single village
                      to impacting over 100 communities across East Africa. His hands-on approach
                      and unwavering commitment to the mission have inspired countless volunteers,
                      donors, and partner organizations to join the cause.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-primary">Philosophy & Approach</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      Abdallah believes that true development comes from within communities
                      themselves. His approach emphasizes partnership, sustainability, and
                      empowerment rather than dependency. He often says, "We don't build
                      communities; we build with communities."
                    </p>
                    <p className="text-lg text-muted-foreground">
                      This philosophy is reflected in every program the foundation undertakes,
                      ensuring that community members are active participants in designing and
                      implementing solutions to their own challenges.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-primary">
                      Recognition & Awards
                    </h2>
                    <ul className="space-y-3 text-lg text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>
                          East African Humanitarian Award for Outstanding Community Service (2015)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>
                          Global Development Leadership Recognition from the United Nations (2018)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>
                          National Excellence in Education Award, Ministry of Education Uganda
                          (2020)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Honorary Doctorate in Development Studies, Makerere University (2022)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-primary">Personal Life</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      Despite his busy schedule, Abdallah remains deeply connected to his roots. He
                      regularly visits the communities served by the foundation, spending time with
                      students, farmers, and healthcare workers to understand their needs and
                      challenges firsthand.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      He is an avid reader, particularly interested in African history, philosophy,
                      and development economics. In his spare time, he enjoys mentoring young
                      professionals interested in social work and community development.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Biography;
