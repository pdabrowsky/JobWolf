import nodemailer from 'nodemailer'

export const sendEmail = async (
  toEmail: string,
  subject: string,
  htmlContent: string
): Promise<{ type: string; msg: string }> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // TODO SECURE! Error: self-signed certificate in certificate chain
      },
    })

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${toEmail} successfully.`)
    return { type: 'success', msg: 'Email sent' }
  } catch (error) {
    console.error(`Error sending email to ${toEmail}:`, error)
    return { type: 'error', msg: 'Failed to send email' }
  }
}
