"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import {
  Sparkles,
  BarChart3,
  Brain,
  Cloud,
  Settings,
  Headphones,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

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

export default function ProductFeaturesPage() {
  const { t } = useTranslation()
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const features = [
    {
      icon: Sparkles,
      titleKey: "productFeatures.features.immersive.title",
      descKey: "productFeatures.features.immersive.description",
    },
    {
      icon: BarChart3,
      titleKey: "productFeatures.features.dataAnalytics.title",
      descKey: "productFeatures.features.dataAnalytics.description",
    },
    {
      icon: Brain,
      titleKey: "productFeatures.features.aiPowered.title",
      descKey: "productFeatures.features.aiPowered.description",
    },
    {
      icon: Cloud,
      titleKey: "productFeatures.features.cloudBased.title",
      descKey: "productFeatures.features.cloudBased.description",
    },
    {
      icon: Settings,
      titleKey: "productFeatures.features.customizable.title",
      descKey: "productFeatures.features.customizable.description",
    },
    {
      icon: Headphones,
      titleKey: "productFeatures.features.support.title",
      descKey: "productFeatures.features.support.description",
    },
  ]

  return (
    <main className="overflow-hidden">
      {/* Background decorations */}
      <div
        aria-hidden
        className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(25,100%,50%,.08)_0,hsla(25,100%,45%,.02)_50%,hsla(25,100%,40%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(25,100%,50%,.06)_0,hsla(25,100%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
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
              {t("productFeatures.title")}{" "}
              <span className="text-orange-500">
                {t("productFeatures.titleHighlight")}
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("productFeatures.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div variants={fadeInUp} className="h-full">
                        <Card className="h-full border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group">
                          <CardHeader>
                            <div className="mb-4 w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                              <IconComponent className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <CardTitle className="text-xl">
                              {t(feature.titleKey)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-base">
                              {t(feature.descKey)}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="bg-white hover:bg-orange-50 border-orange-200 text-orange-500 disabled:opacity-50" />
                <CarouselNext className="bg-white hover:bg-orange-50 border-orange-200 text-orange-500 disabled:opacity-50" />
              </div>
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* Grid Section - Alternative View */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group">
                    <CardHeader>
                      <div className="mb-4 w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                        <IconComponent className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <CardTitle className="text-xl">
                        {t(feature.titleKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {t(feature.descKey)}
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
