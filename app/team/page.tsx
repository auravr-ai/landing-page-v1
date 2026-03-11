"use client"

import * as React from "react"
import { Trophy, Award, Users as UsersIcon, TrendingUp, BookOpen, Star } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    }
  }
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const honorificPrefixes = ["mr", "mr.", "mrs", "mrs.", "ms", "ms.", "dr", "dr.", "prof", "prof.", "sir", "dame"]

const teamAvatarColors = ["bg-purple-600", "bg-blue-500", "bg-green-500", "bg-violet-500", "bg-red-500", "bg-teal-500"]
const advisorAvatarColors = ["bg-indigo-500", "bg-pink-500", "bg-yellow-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"]
const achievementIcons = [Trophy, Award, UsersIcon, Star, BookOpen, TrendingUp]

const teamPhotoByKey: Record<string, string> = {
  member1: "/member-jake.jpeg",
  member2: "/member-victor.jpeg",
  member3: "/member-alison.png",
  member4: "/member-kitty.jpeg",
  member5: "/member-amy.png",
  member6: "/member-fung.jpeg",
}

const advisorPhotoByKey: Record<string, string> = {
  advisor0: "/advisor-prof-yuk-lam-lo.png",
  advisor0b: "/advisor-dr-eric-lai.jpeg",
  advisor1: "/advisor-prof-yvonne-han.png",
  advisor2: "/advisor-prof-kathy-shum.png",
  advisor3: "/advisor-prof-will-chien.png",
  advisor4: "/advisor-mr-johnny-lam.png",
  advisor4b: "/advisor-ms-carmela-tin.png",
  advisor5: "/advisor-mr-eddie-lui.png",
}

function getInitials(name: string) {
  if (!name) return ""

  const parts = name
    .trim()
    .split(/\s+/)
    .filter((part, index) => !(index === 0 && honorificPrefixes.includes(part.toLowerCase())))

  const letters = parts
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .filter(Boolean)

  if (letters.length === 0) return ""
  if (letters.length === 1) return letters[0]
  return `${letters[0]}${letters[1]}`
}

export default function TeamPage() {
  const { t } = useTranslation()

  type TeamMember = { name: string; role: string; bio: string; key: string; avatarColor: string; avatarSrc?: string }
  type RawTeamMember = Omit<TeamMember, "key" | "avatarColor" | "avatarSrc">

  const teamMembers = React.useMemo(() => {
    const data = t("teamPage.teamMembers", { returnObjects: true }) as Record<string, RawTeamMember | { title?: string }>
    if (!data) return []

    return Object.entries(data)
      .filter(([key]) => key !== "title")
      .map(([key, member], index) => {
        const typedMember = member as RawTeamMember
        return {
          key,
          ...typedMember,
          avatarColor: teamAvatarColors[index % teamAvatarColors.length],
          avatarSrc: teamPhotoByKey[key],
        }
      })
  }, [t])

  type Advisor = { name: string; role: string; bio: string; key: string; avatarColor: string; avatarSrc?: string }
  type RawAdvisor = Omit<Advisor, "key" | "avatarColor" | "avatarSrc">

  const advisors = React.useMemo(() => {
    const data = t("teamPage.advisors", { returnObjects: true }) as Record<string, RawAdvisor | { title?: string }>
    if (!data) return []

    return Object.entries(data)
      .filter(([key]) => key !== "title")
      .map(([key, advisor], index) => {
        const typedAdvisor = advisor as RawAdvisor
        return {
          key,
          ...typedAdvisor,
          avatarColor: advisorAvatarColors[index % advisorAvatarColors.length],
          avatarSrc: advisorPhotoByKey[key],
        }
      })
  }, [t])

  type Achievement = { title: string; description: string; year: string }

  const achievements = React.useMemo(() => {
    const data = t("teamPage.achievements", { returnObjects: true }) as Record<string, Achievement | { title?: string }>
    if (!data) return []

    return Object.entries(data)
      .filter(([key]) => key !== "title")
      .map(([, achievement], index) => {
        const typedAchievement = achievement as Achievement
        return {
          ...typedAchievement,
          icon: achievementIcons[index % achievementIcons.length],
        }
      })
  }, [t])

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              {t('teamPage.title')}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('teamPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t('teamPage.teamMembers.title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.key} variants={fadeInVariants}>
                <Card 
                  className={cn(
                    "group h-full border-purple-300 hover:border-purple-600 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-purple-600/20"
                  )}
                >
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-purple-300 group-hover:border-purple-600 transition-colors">
                      <AvatarImage src={member.avatarSrc} alt={member.name} className="object-cover object-top" />
                      <AvatarFallback className={cn(member.avatarColor, "text-white text-xl font-semibold")}>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm text-purple-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t('teamPage.advisors.title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {advisors.map((advisor) => (
              <motion.div key={advisor.key} variants={fadeInVariants}>
                <Card 
                  className={cn(
                    "group h-full border-purple-300 hover:border-purple-600 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-purple-600/20"
                  )}
                >
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-purple-300 group-hover:border-purple-600 transition-colors">
                      <AvatarImage src={advisor.avatarSrc} alt={advisor.name} className="object-cover object-top" />
                      <AvatarFallback className={cn(advisor.avatarColor, "text-white text-xl font-semibold")}>
                        {getInitials(advisor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{advisor.name}</h3>
                    <p className="text-sm text-purple-600 font-medium">{advisor.role}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{advisor.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t('teamPage.achievements.title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={fadeInVariants}>
                <Card 
                  className={cn(
                    "group h-full border-purple-300 hover:border-purple-600 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-purple-600/20"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4 mx-auto">
                      <achievement.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">{achievement.title}</h3>
                    <p className="text-sm text-purple-600 font-medium text-center">{achievement.year}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
