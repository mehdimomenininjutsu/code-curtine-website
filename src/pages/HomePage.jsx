import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductGrid } from '../components/ProductGrid';
import { CollectionShowcase } from '../components/CollectionShowcase';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { LookbookGallery } from '../components/LookbookGallery';
import { SampleRequestForm } from '../components/SampleRequestForm';
import { TradeInquirySection } from '../components/TradeInquirySection';
import { Testimonials } from '../components/Testimonials';
import { NewsletterForm } from '../components/NewsletterForm';
import { FAQAccordion } from '../components/FAQAccordion';
import { FinalCTA } from '../components/FinalCTA';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CategoryGrid />
      <ProductGrid />
      <CollectionShowcase />
      <WhyChooseUs />
      <LookbookGallery />
      <SampleRequestForm />
      <TradeInquirySection />
      <Testimonials />
      <NewsletterForm />
      <FAQAccordion />
      <FinalCTA />
    </>
  );
}
