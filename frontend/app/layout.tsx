import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MaxForceDEV – Portfólio',
  description: 'Portfólio criado por Luis Felipe usando Next.js e Django.',
  generator: 'https://maxforcedev.com.br/',
  keywords: ['Luis Felipe', 'MaxForceDEV', 'Portfólio', 'Desenvolvedor', 'Django', 'Next.js', 'React', 'Python'],
  authors: [{ name: 'Luis Felipe', url: 'https://maxforcedev.com.br/' }],
  metadataBase: new URL('https://maxforcedev.com.br'),
  openGraph: {
    title: 'MaxForceDEV – Portfólio',
    description: 'Conheça os projetos de Luis Felipe, desenvolvedor fullstack com foco em Django, Next.js e automações.',
    url: 'https://maxforcedev.com.br',
    siteName: 'MaxForceDEV',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Capa do Portfólio MaxForceDEV',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  )
}
