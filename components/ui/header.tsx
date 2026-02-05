"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Code, Moon, Sun } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useTranslation } from "react-i18next"
import i18n from "i18next"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

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

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="bg-orange-500 rounded-lg p-2">
        <Code className="h-6 w-6 text-white" />
      </div>
      <span className="text-xl font-bold">BBros</span>
    </div>
  )
}

export function Header() {
  const { t } = useTranslation()
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    document.documentElement.classList.toggle("dark")
    setTheme(newTheme)
  }

  return (
    <header>
      <nav data-state={menuState && "active"} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            "mx-auto mt-1 px-4 transition-all duration-300 lg:px-8",
            isScrolled
            ? "bg-background/50 max-w-3xl rounded-2xl border backdrop-blur-lg lg:px-4"
            : "max-w-4xl",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-0">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      <Menu className="h-5 w-5" />
                    </MenubarTrigger>
                    <MenubarContent className="w-auto">
                      <MenubarGroup>
                        <MenubarItem>{t('header.menu.home')}</MenubarItem>
                        <MenubarItem>{t('header.menu.features')}</MenubarItem>
                        <MenubarItem>{t('header.menu.team')}</MenubarItem>
                        <MenubarItem>{t('header.menu.getStarted')}</MenubarItem>
                      </MenubarGroup>
                      <MenubarSeparator />
                      <MenubarGroup>
                        <div className="flex gap-2">
                          <MenubarItem onClick={toggleTheme}>
                            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                          </MenubarItem>
                          <MenubarItem onClick={() => {
                            const currentLang = i18n.language
                            i18n.changeLanguage(currentLang === 'en' ? 'zh-TW' : 'en')
                          }}>
                            {i18n.language === 'en' ? '中文' : 'EN'}
                          </MenubarItem>
                        </div>
                      </MenubarGroup>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState === true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button variant="outline" size="sm" className={cn(isScrolled && "lg:hidden")}>
                  <span>{t('header.login')}</span>
                </Button>
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <span>{t('header.getStarted')}</span>
                </Button> 
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
