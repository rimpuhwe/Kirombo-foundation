import ProgramSection from "./ProgramSection";
import { useTitle } from "@/hooks/useTitle";

export default function Page() {
  useTitle("Programs at Abdallah Kiromba Foundation");
  return <ProgramSection />;
}
