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
    from: "AURA Team <general@auravr.net>",
    to: email,
    subject: "You're on the AURA waitlist 感謝您加入AURA等候名單",
    html: `
      <p>Hi ${fullName},</p>
      <p>Thanks for joining the AURA waitlist. We'll be in touch soon.</p>
      <p>— The AURA Team</p>
      <p style="margin:16px 0 0;">&nbsp;</p>
      <p>您好 ${fullName}，</p>
      <p>感謝您加入AURA等候名單，我們將盡快與您聯繫。</p>
      <p>— AURA團隊</p>
    `,
  })
}
