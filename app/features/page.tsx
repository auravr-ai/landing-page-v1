"use client"

import * as React from "react"
import {
  Gamepad2,
  Bot,
  Globe,
  Users,
  Monitor,
  Sparkles,
  CheckCircle2,
  type LucideIcon
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselDots
} from "@/components/ui/carousel"
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

export default function FeaturesPage() {
  const { t, i18n } = useTranslation()

  const iconByKey: Record<string, LucideIcon> = {
    immersiveGameplay: Gamepad2,
    aiPoweredNPCs: Bot,
    dynamicEnvironments: Globe,
    multiplayerExperience: Users,
    crossPlatform: Monitor,
    regularUpdates: Sparkles,
  }

  const fallbackIcons: LucideIcon[] = [
    Gamepad2,
    Bot,
    Globe,
    Users,
    Monitor,
    Sparkles,
  ]

  const features = React.useMemo(() => {
    const bundle = i18n.getResourceBundle(i18n.language, "translation") as
      | { featuresPage?: { keyFeatures?: Record<string, unknown> } }
      | undefined

    const keyFeatures = bundle?.featuresPage?.keyFeatures ?? {}

    return Object.entries(keyFeatures)
      .filter(([key, value]) => key !== "title" && typeof value === "object")
      .map(([key], index) => {
        const icon = iconByKey[key] ?? fallbackIcons[index % fallbackIcons.length]

        return {
          icon,
          title: t(`featuresPage.keyFeatures.${key}.title`),
          description: t(`featuresPage.keyFeatures.${key}.description`),
        }
      })
  }, [i18n, t])

  const environments = [
    {
      name: t('featuresPage.environments.forestRealm.name'),
      description: t('featuresPage.environments.forestRealm.description'),
      gradient: 'from-green-600 to-emerald-800'
    },
    {
      name: t('featuresPage.environments.urbanCityscape.name'),
      description: t('featuresPage.environments.urbanCityscape.description'),
      gradient: 'from-blue-600 to-purple-800'
    },
    {
      name: t('featuresPage.environments.desertWasteland.name'),
      description: t('featuresPage.environments.desertWasteland.description'),
      gradient: 'from-orange-400 to-red-700'
    },
    {
      name: t('featuresPage.environments.underwaterWorld.name'),
      description: t('featuresPage.environments.underwaterWorld.description'),
      gradient: 'from-cyan-600 to-blue-900'
    },
    {
      name: t('featuresPage.environments.mountainPeaks.name'),
      description: t('featuresPage.environments.mountainPeaks.description'),
      gradient: 'from-slate-500 to-zinc-800'
    },
    {
      name: t('featuresPage.environments.spaceStation.name'),
      description: t('featuresPage.environments.spaceStation.description'),
      gradient: 'from-indigo-600 to-slate-900'
    },
  ]

  const adaptiveCards = [
    {
      key: "personalizedPrograms",
      accent: "bg-purple-600",
      image: "/media/personalized.png"
    },
    {
      key: "therapistToolkit",
      accent: "bg-emerald-600",
      image: "/media/therapist.jpeg"
    },
  ] as const

  const sceneCards = [
    {
      key: "school",
      gradient: "from-amber-400/70 via-orange-300/60 to-yellow-200/70",
      image: "/scenes/school.png"
    },
    {
      key: "home",
      gradient: "from-purple-500/70 via-pink-400/60 to-rose-300/70",
      image: "/scenes/home.png"
    },
    {
      key: "park",
      gradient: "from-green-500/70 via-emerald-400/60 to-lime-300/70",
      image: "/scenes/park.png"
    }
  ]

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
              {t('featuresPage.title')}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('featuresPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Adaptive Learning Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t('featuresPage.keyFeatures.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('featuresPage.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-10">
            {adaptiveCards.map((card, index) => (
              <motion.div
                key={card.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={containerVariants}
                className="grid gap-8 lg:grid-cols-2 items-center"
              >
                <motion.div
                  variants={fadeInVariants}
                  className={cn(
                    "order-2 lg:order-1",
                    index % 2 === 1 && "lg:order-2"
                  )}
                >
                  <Card className="border border-purple-200/70 shadow-sm">
                    <CardHeader className="pb-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white", card.accent)}>
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-semibold">
                        {t(`featuresPage.keyFeatures.${card.key}.title`)}
                      </h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {t(`featuresPage.keyFeatures.${card.key}.description`)}
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {[1,2,3,4].map((num) => (
                          <li key={num} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                            <span>{t(`featuresPage.keyFeatures.${card.key}.bullet${num}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={fadeInVariants}
                  className={cn(
                    "order-1 lg:order-2",
                    index % 2 === 1 && "lg:order-1"
                  )}
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-video shadow-md">
                    <Image
                      src={card.image}
                      alt={t(`featuresPage.keyFeatures.${card.key}.title`)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customizable Scenes Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeInVariants}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t('featuresPage.customizableScenes.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              {t('featuresPage.customizableScenes.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {sceneCards.map((scene) => (
              <motion.div key={scene.key} variants={fadeInVariants}>
                <Card className="h-full overflow-hidden border-purple-200/70">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={scene.image}
                      alt={t(`featuresPage.customizableScenes.scenes.${scene.key}.title`)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      priority={scene.key === "school"}
                    />
                  </div>
                  <CardContent className="space-y-2 pt-4">
                    <h3 className="text-xl font-semibold">
                      {t(`featuresPage.customizableScenes.scenes.${scene.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(`featuresPage.customizableScenes.scenes.${scene.key}.description`)}
                    </p>
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
