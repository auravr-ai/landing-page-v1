import { z } from "zod"

export const waitlistSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  workEmail: z.string().trim().email(),
  company: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(80),
  teamSize: z.enum(["1-5", "6-20", "21-50", "51-200", "201+"]),
  useCase: z.string().trim().min(30).max(500),
})

export type WaitlistPayload = z.infer<typeof waitlistSchema>
