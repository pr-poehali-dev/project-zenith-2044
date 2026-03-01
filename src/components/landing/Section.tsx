import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"
import { useState, useEffect } from "react"

const roster = [
  { nick: 'amullet', lvl: 8, flag: '🇺🇦', role: 'Rifler', captain: true },
  { nick: 'xinxed', lvl: 9, flag: '🇷🇺', role: 'Rifler' },
  { nick: 'kironixx', lvl: 8, flag: '🇷🇺', role: 'Rifler' },
  { nick: 's1per', lvl: 8, flag: '🇷🇺', role: 'Rifler' },
  { nick: 'for4ward', lvl: 8, flag: '🇷🇺', role: 'AWP' },
]

const achievements = [
  { place: '5', medal: '🥈', tournament: 'ESL League', label: '5-е место' },
  { place: '3', medal: '🥉', tournament: 'W CUP 5x5', label: '3-е место' },
]

const bench = [
  { nick: 'hulsey', lvl: 7, flag: '🇷🇺', role: 'Rifler' },
  { nick: 'winda', lvl: 8, flag: '🇷🇺', role: 'Rifler' },
]

const socials = [
  { label: 'Twitch for4ward', href: 'https://www.twitch.tv/f0w4rdd', icon: 'Tv', color: '#9146FF' },
  { label: 'Telegram канал', href: 'https://t.me/team1337cs2', icon: 'Send', color: '#29B6F6' },
]

const tournaments = [
  { name: 'StarLadder', date: new Date('2026-03-04T00:00:00'), color: '#FFB800' },
  { name: 'RIEM RIO', date: new Date('2026-03-07T00:00:00'), color: '#0099ff' },
]

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      done: false,
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function TournamentCard({ t, index, isActive }: { t: typeof tournaments[0], index: number, isActive: boolean }) {
  const { d, h, m, s, done } = useCountdown(t.date)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <motion.div
      className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + 0.15 * index }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: t.color }} />
        <p className="text-white font-black text-xl md:text-2xl tracking-tight">{t.name}</p>
        <span className="ml-auto text-xs text-neutral-500 uppercase tracking-widest">
          {t.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
        </span>
      </div>
      {done ? (
        <p className="text-neutral-400 text-sm uppercase tracking-widest">Турнир начался!</p>
      ) : (
        <div className="flex gap-4">
          {[{ v: d, l: 'дней' }, { v: h, l: 'часов' }, { v: m, l: 'минут' }, { v: s, l: 'секунд' }].map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white tabular-nums" style={{ color: t.color }}>{pad(v)}</span>
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest mt-1">{l}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, buttonHref, showRoster, showPartner, showSocials, showAchievements, showUpcoming }: SectionProps) {
  const scrollToRoster = () => {
    const el = document.getElementById('roster')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {subtitle && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}


      <motion.h2
        className="text-5xl md:text-7xl lg:text-[6rem] font-black leading-[1] tracking-tight max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      {content && (
        <motion.p
          className="text-lg md:text-xl max-w-2xl mt-5 text-neutral-400"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}

      {showRoster && (
        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Основной состав</p>
          <div className="flex flex-col gap-2">
            {roster.map((p, i) => (
              <motion.div
                key={p.nick}
                className="flex items-center gap-4 group"
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <span className="text-neutral-600 text-sm w-5">{i + 1}</span>
                <span className="text-white font-bold text-base md:text-lg w-28">{p.nick}</span>
                <span className="text-neutral-500 text-sm">{p.flag}</span>
                <span className="text-xs px-2 py-0.5 rounded border border-neutral-700 text-neutral-400">{p.role}</span>
                <span className="text-xs text-neutral-600">Lvl {p.lvl}</span>
                {p.captain && <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white">CEO</span>}
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-neutral-600 mb-3">Запасные</p>
            <div className="flex flex-col gap-2">
              {bench.map((p, i) => (
                <motion.div
                  key={p.nick}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + 0.1 * i }}
                >
                  <span className="text-neutral-700 text-sm w-5">·</span>
                  <span className="text-neutral-400 font-medium text-base w-28">{p.nick}</span>
                  <span className="text-neutral-600 text-sm">{p.flag}</span>
                  <span className="text-xs px-2 py-0.5 rounded border border-neutral-800 text-neutral-600">{p.role}</span>
                  <span className="text-xs text-neutral-700">Lvl {p.lvl}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {showPartner && (
        <motion.div
          className="mt-8 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-neutral-400 text-base md:text-lg mb-6">
            Используй промокод <span className="text-white font-black tracking-widest bg-white/10 px-3 py-1 rounded">1337CS2</span> при регистрации на 1Win и получи:
          </p>
          <ul className="space-y-3">
            {[
              '500% бонус к первым 4 депозитам',
              '500 фриспинов на первые четыре депозита',
              'Другие приятные бонусы для старта',
            ].map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-neutral-300 text-sm md:text-base"
                initial={{ opacity: 0, x: -15 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
              >
                <span className="text-[#0099ff] mt-0.5">—</span>
                {item}
              </motion.li>
            ))}
          </ul>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a href="https://1wfetj.life/v3/landing-page/cyber?p=2gci" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#0099ff] hover:bg-[#0088ee] text-white font-bold px-8 py-3 text-base">
                Перейти на 1Win
              </Button>
            </a>
          </motion.div>
        </motion.div>
      )}

      {showAchievements && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col gap-6 mt-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.tournament}
                className="flex items-center gap-6 group"
                initial={{ opacity: 0, x: -30 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + 0.15 * i }}
              >
                <span className="text-5xl md:text-6xl">{a.medal}</span>
                <div>
                  <p className="text-white font-black text-2xl md:text-3xl">{a.tournament}</p>
                  <p className="text-neutral-500 text-sm mt-1 uppercase tracking-widest">{a.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {showUpcoming && (
        <motion.div
          className="mt-8 flex flex-col gap-4 max-w-xl w-full"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          {tournaments.map((t, i) => (
            <TournamentCard key={t.name} t={t} index={i} isActive={isActive} />
          ))}
        </motion.div>
      )}

      {showSocials && (
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
            >
              <Icon name={s.icon} fallback="Link" size={18} style={{ color: s.color }} />
              {s.label}
            </motion.a>
          ))}
        </motion.div>
      )}

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: showSocials ? 0.5 : 0.4 }}
          className="mt-6"
        >
          {buttonHref ? (
            <a href={buttonHref} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="text-[#0099ff] bg-transparent border-[#0099ff] hover:bg-[#0099ff] hover:text-white transition-colors font-bold">
                {buttonText}
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToRoster}
              className="text-[#0099ff] bg-transparent border-[#0099ff] hover:bg-[#0099ff] hover:text-white transition-colors font-bold"
            >
              {buttonText}
            </Button>
          )}
        </motion.div>
      )}
    </section>
  )
}