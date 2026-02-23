import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { updateSEO } from "@/lib/seo";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminGallery from "./pages/AdminGallery";
import AdminBlog from "./pages/AdminBlog";
import AdminMessages from "./pages/AdminMessages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SEOUpdater = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    updateSEO(pathname);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SEOUpdater />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/o-nama" element={<AboutPage />} />
          <Route path="/proizvodi" element={<ProductsPage />} />
          <Route path="/galerija" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="proizvodi" element={<AdminProducts />} />
            <Route path="galerija" element={<AdminGallery />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="poruke" element={<AdminMessages />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
