"use client"

import HeroSection from "@/components/home/hero-section"
import EcosystemSection from "@/components/home/ecosystem-section"
import HowItWorksSection from "@/components/home/how-it-works"
import QuadraticFundingSection from "@/components/home/quadratic-funding"
import FAQSection from "@/components/home/faq-section"
import RecentActivitiesSection from "@/components/home/recent-activities"
import PartnersSection from "@/components/home/partners-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <EcosystemSection />
      <HowItWorksSection />
      <QuadraticFundingSection />
      <FAQSection />
      <RecentActivitiesSection />
      <PartnersSection />
    </>
  )
}
