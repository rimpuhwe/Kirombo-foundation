import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Biography from "./pages/Biography";
import About from "./pages/About";

import Press from "./pages/Press";
import ProgramPage from "./pages/Program/page";

import JoinMission from "./pages/JoinMission";
import SupportContinue from "./pages/SupportContinue";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/founder/biography" element={<Biography />} />
            <Route path="/about" element={<About />} />
            <Route path="/press" element={<Press />} />
            <Route path="/programs" element={<ProgramPage />} />
            <Route path="/programs/:slug" element={<ProgramPage />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/join-the-mission" element={<JoinMission />} />
            <Route path="/support-continue" element={<SupportContinue />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
