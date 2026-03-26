import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CS Academy — Plataforma de Aprendizado',
  description:
    'Plataforma exclusiva de cursos e mentorias da Cássia Souza. Hipnoterapia, mentalidade e posicionamento de alto valor.',
  keywords: ['hipnoterapia', 'mentoria', 'posicionamento', 'cs academy'],
  authors: [{ name: 'Cássia Souza' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CS Academy',
  },
  applicationName: 'CS Academy',
}

export const viewport: Viewport = {
  themeColor: '#C9A435',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CS Academy" />
      </head>
      <body className="bg-cs-black text-cs-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
