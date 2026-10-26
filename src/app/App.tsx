import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/shared/layout/ScrollToTop";
import Index from "@/pages/Home";
import Biography from "@/pages/Biography";
import About from "@/pages/About";
import Press from "@/features/press/pages/Press";
import PressDetail from "@/features/press/pages/PressDetail";
import ProgramPage from "@/features/programs/pages/ProgramsPage";
import JoinMission from "@/features/mission/pages/JoinMission";
import SupportContinue from "@/pages/SupportContinue";
import NotFound from "@/pages/NotFound";
import GalleryPage from "@/pages/GalleryPage";
import Layout from "@/shared/layout/Layout";
import AdminPage from "@/features/admin/pages/AdminPage";
import Login from "@/features/auth/pages/Login";
import ProtectedRoute from "@/features/admin/components/ProtectedRoute";
import { AuthProvider } from "@/features/auth/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/founder/biography" element={<Biography />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/press" element={<Press />} />
              <Route path="/press/:slug" element={<PressDetail />} />
              <Route path="/programs" element={<ProgramPage />} />
              <Route path="/programs/:slug" element={<ProgramPage />} />
              <Route path="/join-the-mission" element={<JoinMission />} />
              <Route path="/support-continue" element={<SupportContinue />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
