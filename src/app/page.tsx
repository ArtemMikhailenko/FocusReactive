import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "@/components/Hero/Hero";
import CaseShowcase from "@/components/CaseShowcase/CaseShowcase";
import LogoCarousel from "@/components/LogoCarousel/LogoCarousel";
import AnimatedHeadline from "@/components/AnimatedHeadline/AnimatedHeadline";
import ScrollMetrics from "@/components/ScrollMetrics/ScrollMetrics";
import CustomerReviews from "@/components/CustomerReviews/CustomerReviews";
import ExactMetrics from "@/components/ScrollMetrics/ScrollMetrics";
import StackedMetrics from "@/components/ScrollMetrics/ScrollMetrics";
import MetricsAnimation from "@/components/ScrollMetrics/ScrollMetrics";
import SliderSection from "@/components/CaseShowcase/CaseShowcase";
const caseData = [
  {
    id: 'alchemy',
    title: 'Alchemy',
    subtitle: 'The most reliable way to build web3 apps',
    imageUrl: '/images/showcase/alchemy-case.jpg',
    caseUrl: '/case-studies/alchemy',
    tags: ['UX Consultancy', 'Performance', 'Technical SEO & Data Layer']
  },
  {
    id: 'calvin-klein',
    title: 'Calvin Klein',
    subtitle: 'An Iconic Shopify Online Store Reborn',
    imageUrl: '/images/showcase/calvin-klein-case.jpg',
    caseUrl: '/case-studies/calvin-klein',
    tags: ['UX Consultancy', 'Performance', 'Technical SEO & Data Layer']
  },
  {
    id: 'meta',
    title: 'Meta',
    subtitle: 'Building the foundation of the Metaverse',
    imageUrl: '/images/showcase/meta-case.jpg',
    caseUrl: '/case-studies/meta',
    tags: ['UX Consultancy', 'Performance', '3D Development']
  },
  {
    id: 'spotify',
    title: 'Spotify',
    subtitle: 'Redesigning the creator experience',
    imageUrl: '/images/showcase/spotify-case.jpg',
    caseUrl: '/case-studies/spotify',
    tags: ['UX Design', 'Frontend Development', 'Animation']
  },
  {
    id: 'nike',
    title: 'Nike',
    subtitle: 'Enhancing the digital shopping experience',
    imageUrl: '/images/showcase/nike-case.jpg',
    caseUrl: '/case-studies/nike',
    tags: ['eCommerce', 'Headless CMS', 'Performance']
  }
];

export default function Home() {
  return (
    <div >
      <HeroSection/>
      <SliderSection/>
      <LogoCarousel 
        speed={55} 
        pauseOnHover={true} 
      />
       <AnimatedHeadline />
       <ScrollMetrics />
       <CustomerReviews/>
    </div>
  );
}
