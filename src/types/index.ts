import type { ReactNode } from "react"

export interface Section {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  content?: ReactNode
  showButton?: boolean
  buttonText?: string
  buttonHref?: string
  showRoster?: boolean
  showPartner?: boolean
  showSocials?: boolean
}

export interface SectionProps extends Section {
  isActive: boolean
}
