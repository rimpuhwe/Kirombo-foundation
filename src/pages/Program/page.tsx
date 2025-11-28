import ProgramSection from "./ProgramSection";
import { Helmet } from "react-helmet";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Programs</title>
        <meta
          name="description"
          content="Discover the impactful programs and initiatives of the Abdallah Kirombo Foundation, dedicated to youth empowerment, healthcare, education, and community development in Rwanda."
        />
        <meta
          property="og:title"
          content="Abdallah Kirombo Foundation Programs"
        />
        <meta
          property="og:description"
          content="Learn about our foundation's work in youth empowerment, healthcare, education, and community development."
        />
        <meta property="og:image" content="https://live.staticflickr.com/65535/54595422912_766f4e5f3a_z.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kirombo.org/programs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Abdallah Kirombo Foundation Programs"
        />
        <meta
          name="twitter:description"
          content="Learn about our foundation's work in youth empowerment, healthcare, education, and community development."
        />
        <meta name="twitter:image" content="https://live.staticflickr.com/65535/54595422912_766f4e5f3a_z.jpg" />
      </Helmet>
      <ProgramSection />
    </>
  );
}
