"use client"

import * as React from "react"
import Link from "next/link"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, ChevronRight, Zap, Settings2, Sparkles } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useTranslation } from "react-i18next"

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

function AnimatedGroup({
  children,
  className,
  variants,
}: {
  children: React.ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
}) {
  const containerVariants = variants?.container || defaultContainerVariants
  const itemVariants = variants?.item || defaultItemVariants

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className={cn(className)}>
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
  >
    <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l border-purple-300">
      {children}
    </div>
  </div>
)

export default function SoftwareDevelopmentWebsite() {
  const { t } = useTranslation()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    video.play()
  }

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  return (
    <>
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(270,100%,50%,.08)_0,hsla(270,100%,45%,.02)_50%,hsla(270,100%,40%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(270,100%,50%,.06)_0,hsla(270,100%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        </div>

        <section>
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <h1 className="mt-8 max-w-5xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    {t('hero.titleStart')}{" "}
                    <span className="inline-block text-purple-600 text-6xl md:text-7xl xl:text-[5.25rem] font-semibold">
                      {t('hero.titleHighlight')}
                    </span>
                    {t('hero.titleEnd') && ` ${t('hero.titleEnd')}`}
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                    {t('hero.description')}
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div key={1} className="bg-purple-600/10 rounded-[14px] border border-purple-300 p-0.5">
                    <Button asChild size="lg" className="rounded-xl px-5 text-base bg-purple-600 hover:bg-purple-700">
                      <Link href="/features">
                        <span className="text-nowrap">{t('hero.consultation')}</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5 hover:text-purple-600"
                  >
                    <Link href="/team">
                      <span className="text-nowrap">{t('hero.viewWork')}</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-purple-300 p-4 shadow-lg shadow-purple-600/15 ring-1">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 aspect-video relative rounded-2xl border border-purple-300 overflow-hidden">
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster="/media/hero-poster.png"
                      src="/media/hero-demo.mp4"
                      playsInline
                      onPlay={handlePlay}
                      onPause={handlePause}
                    />
                    {!isPlaying && (
                      <button
                        type="button"
                        onClick={handlePlayClick}
                        className="absolute inset-0 flex items-center justify-center bg-black/25 text-white transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                        aria-label="Play hero video"
                      >
                        <span className="grid place-items-center rounded-full bg-white/90 text-black shadow-lg shadow-purple-600/20 size-16">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 translate-x-[1px]">
                            <path d="M8 5.14v13.72c0 .66.73 1.07 1.28.72l9.02-6.86a.9.9 0 0 0 0-1.44L9.28 4.42A.9.9 0 0 0 8 5.14Z" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <section className="bg-background pb-6 pt-10 md:pb-12 md:pt-12">
                <div className="group relative m-auto max-w-5xl px-6">
                  <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <a href="#contact" className="block text-sm duration-150 hover:opacity-75 text-purple-600">
                      <span>{t('hero.readyToStart')}</span>
                      <ChevronRight className="ml-1 inline-block size-3" />
                    </a>
                  </div>
                  <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-3 place-items-center gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                    <div className="flex">
                      <img
                        className="mx-auto h-8 w-auto dark:[filter:brightness(0)_invert(1)] opacity-70"
                        src="https://www.ent-fund.org/uploads/images/common/header/logo_en.png"
                        alt="Client Logo"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-14 w-auto dark:[filter:invert(1)_brightness(0)_invert(1)] opacity-70"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/HKSTP.png/1920px-HKSTP.png?20231029013544"
                        alt="Client Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-8 w-auto dark:[filter:invert(1)_brightness(0)_invert(1)] opacity-70"
                        src="https://www.med.hku.hk/-/media/HKU-Med-Fac/Header/HKU_LKS-Faculty-of-Medicine_Mast-390x60.png"
                        alt="Client Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedGroup>
          </div>
        </section>

        <section className="bg-muted/50 py-16 md:py-32 dark:bg-transparent">
          <div className="@container mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                {t('features.title')} <span className="text-purple-600">{t('features.titleHighlight')}</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t('features.description')}
              </p>
            </div>
            <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 border-purple-300 *:text-center md:mt-16">
              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Zap className="size-6 text-purple-600" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">{t('features.fastDevelopment.title')}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.fastDevelopment.description')}
                  </p>
                </CardContent>
              </div>

              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Settings2 className="size-6 text-purple-600" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">{t('features.scalable.title')}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.scalable.description')}
                  </p>
                </CardContent>
              </div>

              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Sparkles className="size-6 text-purple-600" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">{t('features.modern.title')}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.modern.description')}
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </>
  )
}
