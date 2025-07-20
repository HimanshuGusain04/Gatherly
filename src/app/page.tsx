"use client"

import { MainLayout } from "../components/main-layout";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <MainLayout activePage="home">
      <HomeContent />
    </MainLayout>
  );
}
