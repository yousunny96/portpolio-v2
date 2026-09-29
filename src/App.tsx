import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { AnimatedText } from './components/AnimatedText'
import { ContactButton, LiveProjectButton } from './components/Buttons'
import { FadeIn } from './components/FadeIn'
import { Magnet } from './components/Magnet'

const portraitUrl = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const services = [
  {
    number: '01',
    name: '3D Modeling',
    description: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description: 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

interface Project {
  number: string
  category: string
  name: string
  leftTop: string
  leftBottom: string
  right: string
}

const projects: Project[] = [
  {
    number: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    leftTop: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    leftBottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    leftTop: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    leftBottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    category: 'Client',
    name: 'Solaris Digital',
    leftTop: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    leftBottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
]

const aboutAssets = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    className: 'top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    className: 'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    className: 'top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    className: 'right-[3%] bottom-[8%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
]

const aboutCopy = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[660px] flex-col overflow-x-clip bg-[#0C0C0C]">
      <header className="relative z-30 px-6 pt-6 md:px-10 md:pt-8">
        <FadeIn y={-20} className="flex items-center justify-between gap-3">
          {[
            ['About', '#about'],
            ['Price', '#services'],
            ['Projects', '#projects'],
            ['Contact', '#contact'],
          ].map(([label, target]) => (
            <a
              key={label}
              href={target}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-base md:text-lg lg:text-[1.4rem]"
            >
              {label}
            </a>
          ))}
        </FadeIn>
      </header>

      <div className="relative z-20 mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m jack
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <Magnet className="pointer-events-auto" padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <img src={portraitUrl} alt="Jack, 3D creator" className="h-auto w-full object-contain" fetchPriority="high" />
        </Magnet>
      </FadeIn>

      <div id="contact" className="relative z-30 mt-auto flex items-end justify-between gap-5 px-6 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
          a 3d creator driven by crafting striking and unforgettable projects
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowOneX = useMotionValue(-200)
  const rowTwoX = useMotionValue(200)
  const firstRow = [...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11)]
  const secondRow = [...marqueeImages.slice(11), ...marqueeImages.slice(11), ...marqueeImages.slice(11)]

  useEffect(() => {
    const updateOffset = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      rowOneX.set(offset - 200)
      rowTwoX.set(-(offset - 200))
    }

    updateOffset()
    window.addEventListener('scroll', updateOffset, { passive: true })
    window.addEventListener('resize', updateOffset)
    return () => {
      window.removeEventListener('scroll', updateOffset)
      window.removeEventListener('resize', updateOffset)
    }
  }, [rowOneX, rowTwoX])

  return (
    <section ref={sectionRef} aria-label="Selected motion work" className="overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <motion.div className="flex w-max gap-3" style={{ x: rowOneX, willChange: 'transform' }}>
          {firstRow.map((src, index) => (
            <img key={`${src}-${index}`} src={src} alt="Motion design preview" loading="lazy" className="h-[270px] w-[420px] min-w-[420px] rounded-2xl object-cover" />
          ))}
        </motion.div>
        <motion.div className="flex w-max gap-3" style={{ x: rowTwoX, willChange: 'transform' }}>
          {secondRow.map((src, index) => (
            <img key={`${src}-${index}`} src={src} alt="Motion design preview" loading="lazy" className="h-[270px] w-[420px] min-w-[420px] rounded-2xl object-cover" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      {aboutAssets.map((asset) => (
        <FadeIn key={asset.src} delay={asset.delay} duration={0.9} x={asset.x} y={0} className={`pointer-events-none absolute z-0 ${asset.className}`}>
          <img src={asset.src} alt="" loading="lazy" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <FadeIn as="h2" y={40} className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' } as CSSProperties}>
          About me
        </FadeIn>
        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText text={aboutCopy} className="mx-auto max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]" />
        </div>
        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="relative z-10 rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2 className="mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Services
      </h2>
      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1} y={24} className="border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:py-10 md:py-12">
            <article className="flex gap-5 sm:gap-8 md:gap-12">
              <p className="shrink-0 font-black leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                {service.number}
              </p>
              <div className="pt-1.5 sm:pt-3">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">{service.name}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60 sm:mt-4">{service.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  const stackStyle = { '--stack-offset': `${index * 28}px` } as CSSProperties

  return (
    <div ref={cardRef} className="h-[85vh]" style={stackStyle}>
      <motion.article style={{ scale }} className="sticky top-[calc(6rem+var(--stack-offset))] flex h-[85vh] flex-col rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 text-[#D7E2EA] shadow-[0_-12px_32px_rgba(12,12,12,0.25)] sm:rounded-[50px] sm:p-6 md:top-[calc(8rem+var(--stack-offset))] md:rounded-[60px] md:p-8">
        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-6">
          <p className="font-black leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
            {project.number}
          </p>
          <div className="min-w-[110px] pt-1 sm:pt-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/60 sm:text-xs">{project.category}</p>
            <h3 className="mt-1 text-base font-medium uppercase leading-tight sm:text-xl md:text-2xl">{project.name}</h3>
          </div>
          <LiveProjectButton projectName={project.name} className="ml-auto" />
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-5 gap-3 sm:mt-4 sm:gap-4">
          <div className="col-span-2 grid min-h-0 grid-rows-2 gap-3 sm:gap-4">
            <img src={project.leftTop} alt={`${project.name} project detail`} loading="lazy" className="h-full w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" />
            <img src={project.leftBottom} alt={`${project.name} project detail`} loading="lazy" className="h-full w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" />
          </div>
          <img src={project.right} alt={`${project.name} main project visual`} loading="lazy" className="col-span-3 h-full w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" />
        </div>
      </motion.article>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-20 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 pb-8 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn as="h2" y={40} className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' } as CSSProperties}>
        Project
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="site-shell font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  )
}
