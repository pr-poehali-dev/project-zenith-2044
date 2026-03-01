import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-white border-white/40 bg-white/5 tracking-widest text-xs uppercase">CS2 · Faceit · 1Win Partner</Badge>,
    title: <>1337<br /><span className="text-neutral-500">Team</span></>,
    content: 'Профессиональная киберспортивная организация. Играем, побеждаем, растём.',
    showButton: true,
    buttonText: 'Смотреть состав',
  },
  {
    id: 'roster',
    title: 'Состав',
    showRoster: true,
  },
  {
    id: 'partner',
    title: <>Партнёр<br /><span className="text-[#0099ff]">1Win</span></>,
    showPartner: true,
  },
  {
    id: 'join',
    title: <>Следи<br />за нами</>,
    content: 'Стримы, новости и анонсы турниров — всё в наших каналах.',
    showSocials: true,
    showButton: true,
    buttonText: 'Telegram канал',
    buttonHref: 'https://t.me/team1337cs2',
  },
]
