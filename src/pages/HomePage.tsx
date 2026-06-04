import HeroSection from '@/features/home/HeroSection';
import MetricsSection from '@/features/home/MetricsSection';
import ServicesOverviewSection from '@/features/home/ServicesOverviewSection';
import TeamSection from '@/features/home/TeamSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetricsSection />
      <ServicesOverviewSection />
      <TeamSection />
    </>
  );
}
