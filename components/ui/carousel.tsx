"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type CarouselApi = {
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollTo: (index: number) => void
}

type CarouselContextProps = {
  api?: CarouselApi
}

const CarouselContext = React.createContext<CarouselContextProps>({})

function useCarousel() {
  const context = React.useContext(CarouselContext)
  return context
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: {
    loop?: boolean
  }
  setApi?: (api: CarouselApi) => void
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, opts = {}, setApi, ...props }, ref) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const scrollToIndex = React.useCallback(
      (index: number) => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        const items = container.children
        if (items[index]) {
          const item = items[index] as HTMLElement
          const containerWidth = container.offsetWidth
          const scrollLeft = item.offsetLeft - containerWidth / 2 + item.offsetWidth / 2
          container.scrollTo({ left: scrollLeft, behavior: "smooth" })
          setSelectedIndex(index)
        }
      },
      []
    )

    const scrollPrev = React.useCallback(() => {
      if (!scrollContainerRef.current) return
      const container = scrollContainerRef.current
      const newIndex = opts.loop
        ? selectedIndex === 0
          ? container.children.length - 1
          : selectedIndex - 1
        : Math.max(0, selectedIndex - 1)
      scrollToIndex(newIndex)
    }, [selectedIndex, opts.loop, scrollToIndex])

    const scrollNext = React.useCallback(() => {
      if (!scrollContainerRef.current) return
      const container = scrollContainerRef.current
      const maxIndex = container.children.length - 1
      const newIndex = opts.loop
        ? selectedIndex === maxIndex
          ? 0
          : selectedIndex + 1
        : Math.min(maxIndex, selectedIndex + 1)
      scrollToIndex(newIndex)
    }, [selectedIndex, opts.loop, scrollToIndex])

    React.useEffect(() => {
      if (!scrollContainerRef.current) return
      const container = scrollContainerRef.current
      const maxIndex = container.children.length - 1
      setCanScrollPrev(opts.loop || selectedIndex > 0)
      setCanScrollNext(opts.loop || selectedIndex < maxIndex)
    }, [selectedIndex, opts.loop])

    const api: CarouselApi = React.useMemo(
      () => ({
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollTo: scrollToIndex,
      }),
      [scrollPrev, scrollNext, canScrollPrev, canScrollNext, selectedIndex, scrollToIndex]
    )

    React.useEffect(() => {
      if (setApi) {
        setApi(api)
      }
    }, [api, setApi])

    return (
      <CarouselContext.Provider value={{ api }}>
        <div ref={ref} className={cn("relative", className)} {...props}>
          <div className="overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex -ml-4"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {children}
            </div>
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex", className)}
    {...props}
  />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
    style={{ scrollSnapAlign: "start" }}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { api } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background p-2 shadow-md transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={!api?.canScrollPrev}
      onClick={api?.scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { api } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background p-2 shadow-md transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={!api?.canScrollNext}
      onClick={api?.scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { count: number }
>(({ className, count, ...props }, ref) => {
  const { api } = useCarousel()

  return (
    <div
      ref={ref}
      className={cn("flex justify-center gap-2 mt-4", className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            index === api?.selectedIndex
              ? "bg-purple-600 w-8"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
})
CarouselDots.displayName = "CarouselDots"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
