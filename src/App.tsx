import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Biography from "./pages/Biography";
import Speeches from "./pages/Speeches";
import About from "./pages/About";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Press from "./pages/Press";
import Programs from "./pages/Programs";
import EducationPrograms from "./pages/EducationPrograms";
import HealthcarePrograms from "./pages/HealthcarePrograms";
import YouthEmpowerment from "./pages/YouthEmpowerment";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/founder/biography" element={<Biography />} />
          <Route path="/founder/speeches" element={<Speeches />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/partners" element={<Partners />} />
          <Route path="/press" element={<Press />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/education" element={<EducationPrograms />} />
          <Route path="/programs/healthcare" element={<HealthcarePrograms />} />
          <Route
            path="/programs/youth-empowerment"
            element={<YouthEmpowerment />}
          />
          <Route path="/donate" element={<Donate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
