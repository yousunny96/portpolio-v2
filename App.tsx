import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatedText } from './components/AnimatedText'
import { ContactButton, LiveProjectButton } from './components/Buttons'
import { FadeIn } from './components/FadeIn'
import { Magnet } from './components/Magnet'

/* ─────────────────────────────────────────────
   ✏️ 내용 수정은 이 파일 위쪽의 데이터만 고치면 돼요.
   - 프로필 사진: public 폴더에 profile.png 를 넣으면 자동으로 보여요.
   - 프로젝트 이미지: public 폴더에 넣고 image: '/파일이름.png' 로 적어 주세요.
   ───────────────────────────────────────────── */

export const EMAIL = '0yousun0@gmail.com'
const profileImage = '/profile.png'

const keywordsRowOne = ['Service Planning', 'FO · BO 기획', '결제 · 혜택 정책', 'GA4 데이터 분석', 'SQL', 'UX Writing', 'Wireframe', 'Prototype']
const keywordsRowTwo = ['KR · JP · CN · COM', '4개 언어 현지화', 'Global Commerce', 'Figma', 'Jira', '정책 설계', 'User Flow', 'IA']

const services = [
  {
    number: '01',
    name: '서비스 기획 (FO · BO)',
    description: '사용자가 보는 화면과 운영자가 쓰는 관리 화면을 함께 설계해요. 화면 하나가 운영에 어떤 영향을 주는지까지 같이 봐요.',
  },
  {
    number: '02',
    name: '결제 · 혜택 정책',
    description: '쿠폰, 할인, 지원금처럼 돈이 오가는 기능의 규칙을 정해요. 중복 적용, 예외 상황까지 빠짐없이 정리해요.',
  },
  {
    number: '03',
    name: '데이터 분석',
    description: 'GA4와 SQL로 숫자를 직접 확인하고, 문제를 찾고, 기획의 결과를 수치로 증명해요. (SQLD 보유)',
  },
  {
    number: '04',
    name: 'UX 설계 · UX 라이팅',
    description: '디자이너 출신이라 와이어프레임과 프로토타입을 직접 만들어 빠르게 검증해요. 버튼 문구 한 줄까지 다듬어요.',
  },
  {
    number: '05',
    name: '글로벌 서비스 운영',
    description: '한국 · 일본 · 중국 · 글로벌 4개 스토어를 기획하며, 나라별로 다른 사용자와 언어를 고려해 화면을 만들어요.',
  },
]

interface Project {
  number: string
  category: string
  name: string
  problem: string
  actions: string[]
  results: { value: string; label: string }[]
  resultNote?: string
  image?: string
  link?: string
}

const projects: Project[] = [
  {
    number: '01',
    category: 'Ktown4u · 결제 정책',
    name: '쇼핑 지원금',
    problem: '쿠폰 프로모션 반응이 약했고, 오래 쌓인 재고(앨범·굿즈, 유통기한이 가까운 뷰티·식품)를 줄일 방법이 필요했어요.',
    actions: [
      '상품 단위로 할인해 주는 혜택을 사업부에 직접 제안',
      '기존 쿠폰 기능으로 먼저 테스트해 반응 확인',
      '일반 쿠폰과 함께 쓸 수 있는 정식 기능으로 확장 기획',
    ],
    results: [
      { value: '+60.6%', label: '일평균 거래 건수' },
      { value: '+76.5%', label: '일평균 활성 사용자' },
    ],
    resultNote: '쿠폰 테스트 기간, 직전 14일 대비',
  },
  {
    number: '02',
    category: 'Ktown4u · 글로벌 UX',
    name: '상점 선택 & 스토어 전환',
    problem: '한국·일본·중국·글로벌 4개 스토어가 있어서, 사용자가 자기에게 맞는 상점을 쉽게 고르고 바꿀 수 있어야 했어요.',
    actions: [
      '상점 선택 온보딩 화면 문구를 여러 번 다듬고 4개 언어로 현지화',
      '왼쪽 메뉴의 스토어 전환 UI를 인터랙티브 와이어프레임으로 검증',
      "'기본 상점으로 설정' 버튼의 동작과 문구 확정",
    ],
    results: [
      { value: '4', label: '개 스토어 (KR · JP · CN · COM)' },
      { value: '4', label: '개 언어 (KR · EN · JP · CN)' },
    ],
  },
  {
    number: '03',
    category: 'Personal · 앱 기획',
    name: '캠프독 Campdog',
    problem: '반려견과 함께 갈 수 있는 오토캠핑장 정보가 여기저기 흩어져 있어서 찾기가 어려웠어요.',
    actions: [
      '정보 구조(IA) · 사용자 흐름 · 와이어프레임 · 최종 화면까지 전 과정 진행',
      '소셜 로그인과 위치 권한 흐름 기획서 작성',
      '반려견 안전 기온 기준을 담은 날씨 기능 기획',
    ],
    results: [
      { value: '49', label: '곳 캠핑장 편의시설 데이터 직접 수집' },
      { value: 'A → Z', label: '리서치부터 최종 화면까지' },
    ],
  },
]

const experience = [
  { period: '2025.10 — 현재', company: '케이타운포유 (Ktown4u)', role: 'PO · 서비스기획자' },
  { period: '2021.09 — 2025.10', company: '아메바', role: '서비스기획자 (셀 리더)' },
  { period: '2020.05 — 2021.08', company: '이언커뮤니케이션즈', role: 'UI/UX 디자이너' },
]

const aboutCopy = 'UI/UX 디자이너로 시작해 5년째 서비스를 기획하고 있어요. 지금은 글로벌 K-POP 커머스 케이타운포유에서 4개 스토어의 사용자 화면과 운영 화면을 기획해요. 데이터로 문제를 찾고, 정책으로 풀고, 화면으로 완성하는 일을 좋아해요.'

function Portrait() {
  const [hasImage, setHasImage] = useState(true)

  if (hasImage) {
    return <img src={profileImage} alt="박유선 프로필 사진" className="h-auto w-full object-contain" fetchPriority="high" onError={() => setHasImage(false)} />
  }

  return (
    <div aria-hidden="true" className="mx-auto mb-10 aspect-square w-[70%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#BBCCD7_0%,#646973_45%,#1a1a1d_75%)] opacity-70 blur-[2px]" />
  )
}

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[660px] flex-col overflow-x-clip bg-[#0C0C0C]">
      <header className="relative z-30 px-6 pt-6 md:px-10 md:pt-8">
        <FadeIn y={-20} className="flex items-center justify-between gap-3">
          {[
            ['About', '#about'],
            ['Skills', '#services'],
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
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading w-full whitespace-nowrap text-center text-[11.5vw] font-black uppercase leading-none tracking-tight sm:text-[12vw] md:text-[12.5vw]">
          Hi, i&apos;m yuseon
        </FadeIn>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet className="pointer-events-auto" padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <Portrait />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-30 mt-auto flex items-end justify-between gap-5 px-6 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-[170px] text-[clamp(0.8rem,1.4vw,1.4rem)] font-light leading-snug text-[#D7E2EA] sm:max-w-[240px] md:max-w-[300px]">
          문제를 정책과 화면으로 풀어내는 서비스 기획자, 박유선입니다
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

function KeywordRow({ words }: { words: string[] }) {
  const repeated = [...words, ...words, ...words]
  return (
    <>
      {repeated.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="flex h-[110px] shrink-0 items-center rounded-2xl border border-[#D7E2EA]/15 bg-[#151517] px-10 text-[clamp(1.6rem,3vw,2.6rem)] font-medium uppercase tracking-tight text-[#D7E2EA]/80 sm:h-[140px]"
        >
          {word}
        </span>
      ))}
    </>
  )
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowOneX = useMotionValue(-200)
  const rowTwoX = useMotionValue(200)

  useEffect(() => {
    const updateOffset = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      rowOneX.set(offset - 600)
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
    <section ref={sectionRef} aria-label="핵심 키워드" className="overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <motion.div className="flex w-max gap-3" style={{ x: rowOneX, willChange: 'transform' }}>
          <KeywordRow words={keywordsRowOne} />
        </motion.div>
        <motion.div className="flex w-max gap-3" style={{ x: rowTwoX, willChange: 'transform' }}>
          <KeywordRow words={keywordsRowTwo} />
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <FadeIn as="h2" y={40} className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' } as CSSProperties}>
          About me
        </FadeIn>
        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText text={aboutCopy} className="mx-auto max-w-[600px] text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]" />
        </div>

        <FadeIn y={24} className="mt-14 w-full max-w-[600px] text-left sm:mt-16">
          <ul className="divide-y divide-[#D7E2EA]/15 border-y border-[#D7E2EA]/15">
            {experience.map((item) => (
              <li key={item.company} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="shrink-0 text-xs tracking-wider text-[#D7E2EA]/50 sm:w-[150px] sm:text-sm">{item.period}</span>
                <span className="text-base font-medium text-[#D7E2EA] sm:text-lg">{item.company}</span>
                <span className="text-sm text-[#D7E2EA]/60 sm:ml-auto">{item.role}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[#D7E2EA]/50">강남대학교 시각디자인 · SQLD · TOEIC Speaking IH</p>
        </FadeIn>

        <div className="mt-14 sm:mt-16 md:mt-20">
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
        What I do
      </h2>
      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1} y={24} className="border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:py-10 md:py-12">
            <article className="flex gap-5 sm:gap-8 md:gap-12">
              <p className="shrink-0 font-black leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                {service.number}
              </p>
              <div className="pt-1.5 sm:pt-3">
                <h3 className="text-[clamp(1.05rem,2.2vw,2rem)] font-semibold leading-tight">{service.name}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.9rem,1.6vw,1.2rem)] font-light leading-relaxed opacity-60 sm:mt-4">{service.description}</p>
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
  const panel = 'min-h-0 overflow-hidden rounded-[24px] bg-[#161618] p-5 sm:rounded-[32px] sm:p-7 md:rounded-[40px] md:p-9'
  const panelLabel = 'text-[10px] font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/50 sm:text-xs'

  return (
    <div ref={cardRef} className="h-[85vh]" style={stackStyle}>
      <motion.article style={{ scale }} className="sticky top-[calc(5rem+var(--stack-offset))] flex h-[85vh] flex-col rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 text-[#D7E2EA] shadow-[0_-12px_32px_rgba(12,12,12,0.25)] sm:rounded-[50px] sm:p-6 md:top-[calc(8rem+var(--stack-offset))] md:rounded-[60px] md:p-8">
        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-6">
          <p className="font-black leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
            {project.number}
          </p>
          <div className="min-w-[110px] pt-1 sm:pt-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#D7E2EA]/60 sm:text-xs">{project.category}</p>
            <h3 className="mt-1 text-lg font-semibold leading-tight sm:text-2xl md:text-3xl">{project.name}</h3>
          </div>
          {project.link && <LiveProjectButton href={project.link} className="ml-auto" />}
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_1fr_auto] gap-3 sm:mt-4 sm:gap-4 md:grid-cols-5 md:grid-rows-2">
          <div className={`${panel} md:col-span-2`}>
            <p className={panelLabel}>Problem</p>
            <p className="mt-3 text-[clamp(0.85rem,1.3vw,1.15rem)] leading-relaxed text-[#D7E2EA]/85">{project.problem}</p>
          </div>

          <div className={`${panel} flex flex-col justify-end md:col-span-2 md:row-start-2`}>
            <p className={panelLabel}>Result{project.resultNote ? ` · ${project.resultNote}` : ''}</p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              {project.results.map((result) => (
                <div key={result.label}>
                  <p className="hero-heading font-black leading-none tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}>
                    {result.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-[#D7E2EA]/60 sm:text-sm">{result.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${panel} row-start-2 md:col-span-3 md:col-start-3 md:row-span-2 md:row-start-1 ${project.image ? 'p-0 sm:p-0 md:p-0' : 'flex flex-col'}`}>
            {project.image ? (
              <img src={project.image} alt={`${project.name} 화면`} loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <>
                <p className={panelLabel}>What I did</p>
                <ol className="mt-4 flex flex-1 flex-col justify-center gap-4 sm:gap-6">
                  {project.actions.map((action, actionIndex) => (
                    <li key={action} className="flex gap-4 text-[clamp(0.9rem,1.5vw,1.35rem)] leading-snug">
                      <span className="shrink-0 font-black text-[#D7E2EA]/40">{String(actionIndex + 1).padStart(2, '0')}</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-20 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 pb-8 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn as="h2" y={40} className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' } as CSSProperties}>
        Projects
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="relative z-30 bg-[#0C0C0C] px-5 pt-32 pb-10 text-center sm:px-8 md:px-10 md:pt-48">
      <FadeIn as="h2" y={40} className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' } as CSSProperties}>
        Let&apos;s talk
      </FadeIn>
      <FadeIn y={20} delay={0.2} className="mt-8 text-[clamp(1rem,2vw,1.35rem)] text-[#D7E2EA]/80">
        함께 일하고 싶거나 궁금한 점이 있다면 편하게 연락 주세요.
      </FadeIn>
      <FadeIn y={20} delay={0.3} className="mt-10">
        <a href={`mailto:${EMAIL}`} className="text-[clamp(1.2rem,3.5vw,2.8rem)] font-medium text-[#D7E2EA] underline decoration-[#D7E2EA]/30 underline-offset-8 transition-opacity hover:opacity-70">
          {EMAIL}
        </a>
      </FadeIn>
      <p className="mt-32 text-xs uppercase tracking-widest text-[#D7E2EA]/40">© 2026 Park Yuseon</p>
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
      <ContactSection />
    </main>
  )
}
