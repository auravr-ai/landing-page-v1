import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWaitlistConfirmation({
  fullName,
  email,
}: {
  fullName: string
  email: string
}) {
  await resend.emails.send({
    from: "Aura <general@auravr.net>",
    to: email,
    subject: "You're on the Aura waitlist",
    html: `
      <p>Hi ${fullName},</p>
      <p>Thanks for joining the Aura waitlist. We'll be in touch soon.</p>
      <p>— The Aura Team</p>
    `,
  })
}
