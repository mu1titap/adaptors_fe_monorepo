import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { Inter } from 'next/font/google';
import { options } from './api/auth/[...nextauth]/options';
import './globals.css';
import AuthContextProvider from './provider/AuthContextProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ADAPTORS',
    template: '%s | MULTITAP App',
  },
  description: 'Mentoring Platform',
  icons: { icon: '/assets/images/icons/icon.png' },
  metadataBase: new URL('https://adaptors.com'),
  openGraph: {
    url: 'https://adaptors.com',
    title: 'ADAPTORS',
    description: 'Mentoring Platform',
    images: [{ url: '/assets/images/og/og_image.png' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(options);
  const isAuth = session?.user ? true : false;

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthContextProvider isAuth={isAuth}>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
