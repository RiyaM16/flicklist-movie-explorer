export const metadata = {
  title: 'Flicklist - Your Personal Movie Tracker',
  description: 'Discover, save, and rate your favorite movies'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
