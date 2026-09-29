import { ArrowUpRight } from 'lucide-react'

interface ContactButtonProps {
  className?: string
}

interface LiveProjectButtonProps {
  href: string
  className?: string
}

export function ContactButton({ className = '' }: ContactButtonProps) {
  return (
    <a
      href="#contact"
      className={`group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(123deg,#18011F_7%,#B600A8_37%,#7621B0_72%,#BE4C00_100%)] px-8 py-3 text-xs font-medium uppercase tracking-widest text-white shadow-[0px_4px_4px_rgba(181,1,167,0.25),4px_4px_12px_#7721B1_inset] outline outline-2 outline-white outline-offset-[-3px] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      <span>Contact Me</span>
      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-5" strokeWidth={1.75} />
    </a>
  )
}

export function LiveProjectButton({ href, className = '' }: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 focus-visible:bg-[#D7E2EA]/10 sm:px-8 sm:py-3 sm:text-sm ${className}`}
    >
      View more
    </a>
  )
}
