export const resetPasswordTemplate = (resetPasswordToken: string): string => {
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Reset Your Password</title>
      </head>
      <body>
      <h1 style="color: #333333;">Reset Your Password</h1>
        <p style="margin-bottom: 20px;color: #333333;">To reset your password, please click the button</p>
        <a href="${process.env.BASE_URL}/reset-password?token=${resetPasswordToken}" style="background-color: #FFB81C; color: #333333; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;margin-bottom: 30px;">Reset Password</a>
      </body>
    </html>
  `
}
