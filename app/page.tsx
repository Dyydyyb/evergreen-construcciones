"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WorkLinesStrip } from "@/components/WorkLinesStrip";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { StagesAndBeforeAfter } from "@/components/StagesAndBeforeAfter";
import { MachinerySection } from "@/components/MachinerySection";
import { WhyAndProcessSections } from "@/components/WhyAndProcessSections";
import { QuoteStepperSection } from "@/components/QuoteStepperSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ClosingAndFooter } from "@/components/ClosingAndFooter";
import type { WorkTypeId } from "@/lib/config";
import type { ProjectCategory } from "@/lib/projects";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Todas");
  const [selectedWorkType, setSelectedWorkType] = useState<WorkTypeId>("Movimiento de suelos");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorkLinesStrip onSelectCategory={setActiveCategory} />
        <ServicesSection onSelectWorkType={setSelectedWorkType} />
        <ProjectsGallery
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          onSelectWorkType={setSelectedWorkType}
        />
        <StagesAndBeforeAfter />
        <MachinerySection />
        <WhyAndProcessSections />
        <QuoteStepperSection selectedWorkType={selectedWorkType} />
        <ReviewsSection />
      </main>
      <ClosingAndFooter />
    </>
  );
}
