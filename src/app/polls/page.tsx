"use client"

import { MainLayout } from "../../components/main-layout";
import PollsContent from "./PollsContent";

export default function PollsPage() {
  return (
    <MainLayout activePage="polls">
      <PollsContent />
    </MainLayout>
  );
} 