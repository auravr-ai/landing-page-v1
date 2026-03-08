"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription as FormFieldDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { type WaitlistPayload } from "@/lib/waitlist"

const teamSizeOptions = [
  { value: "1-5", key: "size1to5" },
  { value: "6-20", key: "size6to20" },
  { value: "21-50", key: "size21to50" },
  { value: "51-200", key: "size51to200" },
  { value: "201+", key: "size201plus" },
] as const

const defaultFormValues: WaitlistPayload = {
  fullName: "",
  workEmail: "",
  company: "",
  role: "",
  teamSize: "1-5",
  useCase: "",
}

const valueHighlights = [
  {
    icon: Clock3,
    key: "priorityOnboarding",
  },
  {
    icon: Sparkles,
    key: "founderUpdates",
  },
  {
    icon: ShieldCheck,
    key: "clinicalTrust",
  },
]

export default function WaitlistPage() {
  const { t } = useTranslation()
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const formSchema = React.useMemo(
    () =>
      z.object({
        fullName: z
          .string()
          .min(2, t("waitlistPage.validation.fullNameMin"))
          .max(80, t("waitlistPage.validation.fullNameMax")),
        workEmail: z
          .string()
          .min(1, t("waitlistPage.validation.workEmailRequired"))
          .email(t("waitlistPage.validation.workEmailInvalid")),
        company: z
          .string()
          .min(2, t("waitlistPage.validation.companyMin"))
          .max(120, t("waitlistPage.validation.companyMax")),
        role: z
          .string()
          .min(2, t("waitlistPage.validation.roleMin"))
          .max(80, t("waitlistPage.validation.roleMax")),
        teamSize: z.enum(teamSizeOptions.map((option) => option.value) as [WaitlistPayload["teamSize"], ...WaitlistPayload["teamSize"][]], {
          error: t("waitlistPage.validation.teamSizeRequired"),
        }),
        useCase: z
          .string()
          .min(30, t("waitlistPage.validation.useCaseMin"))
          .max(500, t("waitlistPage.validation.useCaseMax")),
      }),
    [t]
  )

  const form = useForm<WaitlistPayload>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: defaultFormValues,
  })

  async function onSubmit(values: WaitlistPayload) {
    setSubmitError(null)
    setSubmittedEmail(null)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { code?: string } | null

        if (data?.code === "DUPLICATE_EMAIL") {
          throw new Error(t("waitlistPage.submitErrors.duplicateEmail"))
        }
        if (data?.code === "DATABASE_MISSING") {
          throw new Error(t("waitlistPage.submitErrors.databaseMissing"))
        }
        if (data?.code === "DATABASE_CONNECTION_FAILED") {
          throw new Error(t("waitlistPage.submitErrors.databaseConnection"))
        }
        if (data?.code === "TABLE_MISSING") {
          throw new Error(t("waitlistPage.submitErrors.tableMissing"))
        }
        if (data?.code === "COLUMN_MISMATCH") {
          throw new Error(t("waitlistPage.submitErrors.columnMismatch"))
        }
        throw new Error(t("waitlistPage.submitErrors.fallback"))
      }

      setSubmittedEmail(values.workEmail)
      form.reset(defaultFormValues)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t("waitlistPage.submitErrors.unexpected"))
    }
  }

  return (
    <main className="relative overflow-hidden pt-32 pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(147,51,234,0.16),transparent_60%),radial-gradient(80%_60%_at_90%_20%,rgba(59,130,246,0.12),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.6)_40%,transparent_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(23,23,23,0.4)_40%,transparent_100%)]"
      />

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-300">
                <Sparkles className="size-4" />
                {t("waitlistPage.badge")}
              </p>
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight md:text-6xl">
                {t("waitlistPage.title")}
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                {t("waitlistPage.subtitle")}
              </p>
            </div>

            <Card className="border-purple-200/70 bg-card/80 shadow-md backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">{t("waitlistPage.whyJoin.title")}</CardTitle>
                <CardDescription>{t("waitlistPage.whyJoin.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {valueHighlights.map((item) => (
                  <div key={item.key} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-purple-100 p-2 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200">
                      <item.icon className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium">{t(`waitlistPage.highlights.${item.key}.title`)}</p>
                      <p className="text-sm text-muted-foreground">{t(`waitlistPage.highlights.${item.key}.description`)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Card className="border-purple-200/80 shadow-xl shadow-purple-600/10">
              <CardHeader>
                <CardTitle>{t("waitlistPage.form.title")}</CardTitle>
                <CardDescription>{t("waitlistPage.form.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {submittedEmail && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle2 className="mt-0.5 size-5" />
                    <p className="text-sm">
                      {t("waitlistPage.form.success", { email: submittedEmail })}
                    </p>
                  </div>
                )}

                {submitError && (
                  <div
                    className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                    role="alert"
                  >
                    {submitError}
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("waitlistPage.form.fields.fullName.label")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("waitlistPage.form.fields.fullName.placeholder")} autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="workEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("waitlistPage.form.fields.workEmail.label")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("waitlistPage.form.fields.workEmail.placeholder")} autoComplete="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("waitlistPage.form.fields.company.label")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("waitlistPage.form.fields.company.placeholder")} autoComplete="organization" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("waitlistPage.form.fields.role.label")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("waitlistPage.form.fields.role.placeholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("waitlistPage.form.fields.teamSize.label")}</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className={cn(
                                "border-input bg-background flex h-9 w-full rounded-md border px-3 text-sm outline-none",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                              )}
                            >
                              {teamSizeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {t(`waitlistPage.form.fields.teamSize.options.${option.key}`)}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormFieldDescription>{t("waitlistPage.form.fields.teamSize.description")}</FormFieldDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("waitlistPage.form.fields.useCase.label")}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("waitlistPage.form.fields.useCase.placeholder")}
                              className="min-h-28 resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormFieldDescription>{t("waitlistPage.form.fields.useCase.description")}</FormFieldDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-purple-600 text-white hover:bg-purple-700"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? t("waitlistPage.form.submit.loading") : t("waitlistPage.form.submit.idle")}
                      {!form.formState.isSubmitting && <ArrowRight className="size-4" />}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {t("waitlistPage.form.legal")}
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
