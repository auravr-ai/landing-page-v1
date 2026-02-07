"use client"

import * as React from "react"
import { 
  Gamepad2, 
  Bot, 
  Globe, 
  Users, 
  Monitor, 
  Sparkles 
} from "lucide-react"
import { motion } from "framer-motion"
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
  const { t } = useTranslation()

  const features = [
    {
      icon: Gamepad2,
      title: t('featuresPage.keyFeatures.immersiveGameplay.title'),
      description: t('featuresPage.keyFeatures.immersiveGameplay.description'),
    },
    {
      icon: Bot,
      title: t('featuresPage.keyFeatures.aiPoweredNPCs.title'),
      description: t('featuresPage.keyFeatures.aiPoweredNPCs.description'),
    },
    {
      icon: Globe,
      title: t('featuresPage.keyFeatures.dynamicEnvironments.title'),
      description: t('featuresPage.keyFeatures.dynamicEnvironments.description'),
    },
    {
      icon: Users,
      title: t('featuresPage.keyFeatures.multiplayerExperience.title'),
      description: t('featuresPage.keyFeatures.multiplayerExperience.description'),
    },
    {
      icon: Monitor,
      title: t('featuresPage.keyFeatures.crossPlatform.title'),
      description: t('featuresPage.keyFeatures.crossPlatform.description'),
    },
    {
      icon: Sparkles,
      title: t('featuresPage.keyFeatures.regularUpdates.title'),
      description: t('featuresPage.keyFeatures.regularUpdates.description'),
    },
  ]

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

      {/* Key Features Section */}
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
              {t('featuresPage.keyFeatures.title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInVariants}>
                <Card 
                  className={cn(
                    "group h-full border-orange-200 hover:border-orange-500 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-orange-500/20"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-4">
                      <feature.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Game Environments Carousel Section */}
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
              {t('featuresPage.environments.title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <Carousel 
              className="w-full max-w-5xl mx-auto"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {environments.map((env, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="border-orange-200 overflow-hidden group">
                      <div className={cn(
                        "relative h-48 bg-gradient-to-br",
                        env.gradient,
                        "transition-transform duration-300 group-hover:scale-105"
                      )}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-white font-semibold text-lg">{env.name}</h3>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">{env.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-orange-200 hover:bg-orange-50 hover:border-orange-500" />
              <CarouselNext className="border-orange-200 hover:bg-orange-50 hover:border-orange-500" />
              <CarouselDots count={environments.length} />
            </Carousel>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
