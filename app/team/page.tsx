"use client"

import * as React from "react"
import { Trophy, Award, Users as UsersIcon, TrendingUp, BookOpen, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const honorificPrefixes = ["mr", "mr.", "mrs", "mrs.", "ms", "ms.", "dr", "dr.", "prof", "prof.", "sir", "dame"]

const teamAvatarColors = ["bg-orange-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-teal-500"]
const advisorAvatarColors = ["bg-indigo-500", "bg-pink-500", "bg-yellow-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"]
const achievementIcons = [Trophy, Award, UsersIcon, Star, BookOpen, TrendingUp]

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

  const teamMembers = React.useMemo(() => {
    const data = t("teamPage.teamMembers", { returnObjects: true }) as Record<string, any>
    if (!data) return []

    return Object.entries(data)
      .filter(([key]) => key !== "title")
      .map(([, member], index) => ({
        ...member,
        avatarColor: teamAvatarColors[index % teamAvatarColors.length],
      }))
  }, [t])

  const advisors = React.useMemo(() => {
    const data = t("teamPage.advisors", { returnObjects: true }) as Record<string, any>
    if (!data) return []

    return Object.entries(data)
      .filter(([key]) => key !== "title")
      .map(([, advisor], index) => ({
        ...advisor,
        avatarColor: advisorAvatarColors[index % advisorAvatarColors.length],
      }))
  }, [t])

  const achievements = React.useMemo(() => {
    const data = t("teamPage.achievements", { returnObjects: true }) as Record<string, any>
    if (!data) return []

    return Object.entries(data)
      .filter(([key]) => key !== "title")
      .map(([, achievement], index) => ({
        ...achievement,
        icon: achievementIcons[index % achievementIcons.length],
      }))
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
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInVariants}>
                <Card 
                  className={cn(
                    "group h-full border-orange-200 hover:border-orange-500 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-orange-500/20"
                  )}
                >
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-orange-200 group-hover:border-orange-500 transition-colors">
                      <AvatarImage src="" alt={member.name} />
                      <AvatarFallback className={cn(member.avatarColor, "text-white text-xl font-semibold")}>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm text-orange-500 font-medium">{member.role}</p>
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
            {advisors.map((advisor, index) => (
              <motion.div key={index} variants={fadeInVariants}>
                <Card 
                  className={cn(
                    "group h-full border-orange-200 hover:border-orange-500 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-orange-500/20"
                  )}
                >
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-orange-200 group-hover:border-orange-500 transition-colors">
                      <AvatarImage src="" alt={advisor.name} />
                      <AvatarFallback className={cn(advisor.avatarColor, "text-white text-xl font-semibold")}>
                        {getInitials(advisor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{advisor.name}</h3>
                    <p className="text-sm text-orange-500 font-medium">{advisor.role}</p>
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
                    "group h-full border-orange-200 hover:border-orange-500 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-orange-500/20"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4 mx-auto">
                      <achievement.icon className="w-8 h-8 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">{achievement.title}</h3>
                    <p className="text-sm text-orange-500 font-medium text-center">{achievement.year}</p>
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
