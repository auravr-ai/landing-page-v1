"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Award, TrendingUp, Users, Calendar } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export default function OurTeamPage() {
  const { t } = useTranslation()

  const teamMembers = [
    {
      nameKey: "ourTeam.teamMembers.member1.name",
      roleKey: "ourTeam.teamMembers.member1.role",
      descKey: "ourTeam.teamMembers.member1.description",
      initials: "SC",
    },
    {
      nameKey: "ourTeam.teamMembers.member2.name",
      roleKey: "ourTeam.teamMembers.member2.role",
      descKey: "ourTeam.teamMembers.member2.description",
      initials: "MW",
    },
    {
      nameKey: "ourTeam.teamMembers.member3.name",
      roleKey: "ourTeam.teamMembers.member3.role",
      descKey: "ourTeam.teamMembers.member3.description",
      initials: "EZ",
    },
    {
      nameKey: "ourTeam.teamMembers.member4.name",
      roleKey: "ourTeam.teamMembers.member4.role",
      descKey: "ourTeam.teamMembers.member4.description",
      initials: "DL",
    },
    {
      nameKey: "ourTeam.teamMembers.member5.name",
      roleKey: "ourTeam.teamMembers.member5.role",
      descKey: "ourTeam.teamMembers.member5.description",
      initials: "JL",
    },
    {
      nameKey: "ourTeam.teamMembers.member6.name",
      roleKey: "ourTeam.teamMembers.member6.role",
      descKey: "ourTeam.teamMembers.member6.description",
      initials: "JP",
    },
  ]

  const achievements = [
    {
      icon: Award,
      titleKey: "ourTeam.achievements.items.award1.title",
      descKey: "ourTeam.achievements.items.award1.description",
      metricKey: "ourTeam.achievements.items.award1.metric",
    },
    {
      icon: Users,
      titleKey: "ourTeam.achievements.items.award2.title",
      descKey: "ourTeam.achievements.items.award2.description",
      metricKey: "ourTeam.achievements.items.award2.metric",
    },
    {
      icon: TrendingUp,
      titleKey: "ourTeam.achievements.items.award3.title",
      descKey: "ourTeam.achievements.items.award3.description",
      metricKey: "ourTeam.achievements.items.award3.metric",
    },
    {
      icon: Calendar,
      titleKey: "ourTeam.achievements.items.award4.title",
      descKey: "ourTeam.achievements.items.award4.description",
      metricKey: "ourTeam.achievements.items.award4.metric",
    },
  ]

  return (
    <main className="overflow-hidden">
      {/* Background decorations */}
      <div
        aria-hidden
        className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(25,100%,50%,.08)_0,hsla(25,100%,45%,.02)_50%,hsla(25,100%,40%,0)_80%)]" />
      </div>

      {/* Hero Section */}
      <section className="pt-24 md:pt-36 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-bold">
              {t("ourTeam.title")}{" "}
              <span className="text-orange-500">
                {t("ourTeam.titleHighlight")}
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("ourTeam.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24 border-4 border-orange-500/20">
                        <AvatarImage src="" alt={t(member.nameKey)} />
                        <AvatarFallback className="text-2xl font-semibold bg-orange-500 text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-xl">
                      {t(member.nameKey)}
                    </CardTitle>
                    <CardDescription className="text-orange-500 font-medium">
                      {t(member.roleKey)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {t(member.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-balance text-4xl md:text-5xl font-bold">
              {t("ourTeam.achievements.title")}{" "}
              <span className="text-orange-500">
                {t("ourTeam.achievements.titleHighlight")}
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("ourTeam.achievements.description")}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">
                            {t(achievement.titleKey)}
                          </CardTitle>
                          <div className="text-sm text-orange-500 font-medium">
                            {t(achievement.metricKey)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {t(achievement.descKey)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
