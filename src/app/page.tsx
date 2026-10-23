import { Hero } from "@/components/landing/hero";
import {
  CategoriesSection,
  NewArrivalsSection,
  TestimonialsSection,
  WhyUsSection,
} from "@/components/landing/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <NewArrivalsSection />
      <WhyUsSection />
      <TestimonialsSection />
    </>
  );
}
