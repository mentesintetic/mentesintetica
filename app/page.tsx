import { PageTransition } from "@/components/PageTransition";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { HowItWorks } from "@/components/HowItWorks";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Solutions } from "@/components/Solutions";
import { Portfolio } from "@/components/Portfolio";
import { Simulator } from "@/components/Simulator";
import { Calculator } from "@/components/Calculator";
import { Founder } from "@/components/Founder";
import { FAQ } from "@/components/FAQ";
import { FinalCTA, Footer } from "@/components/FinalCTA";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <PageTransition />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <BeforeAfter />
        <Solutions />
        <Portfolio />
        <Simulator />
        <Calculator />
        <Founder />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
