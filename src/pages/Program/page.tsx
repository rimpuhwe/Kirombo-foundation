import ProgramSection from "./ProgramSection";
import { useTitle } from "@/hooks/useTitle";
import { Helmet } from "react-helmet";
export default function Page() {
  useTitle("Programs at Abdallah Kiromba Foundation");
  return (
    <>
      <Helmet>
        <title>Programs at Abdallah Kiromba Foundation</title>
        <meta
          name="description"
          content="Explore the various activities offered by the Abdallah Kiromba Foundation."
        />
        <meta
          property="og:title"
          content="Programs at Abdallah Kiromba Foundation"
        />
        <meta
          property="og:description"
          content="Education, health, livestock , saddaqah and social programs supporting communities in Rwanda."
        />
        <meta
          property="og:image"
          content="https://live.staticflickr.com/65535/54362469544_bfc6d29807_z.jpg"
        />
        <meta
          property="og:url"
          content="https://www.abdallahkirombafoundation.com/programs"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Programs at Abdallah Kiromba Foundation"
        />
        <meta
          name="twitter:description"
          content="Education, health, and social programs supporting communities in Rwanda."
        />
        <meta
          name="twitter:image"
          content="https://live.staticflickr.com/65535/54362469544_bfc6d29807_z.jpg"
        />
      </Helmet>
      
      <ProgramSection />
    </>
  );
}
