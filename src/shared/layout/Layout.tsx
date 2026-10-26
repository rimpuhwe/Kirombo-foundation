import Navbar from "@/shared/layout/Navbar";
import Footer from "@/shared/layout/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
