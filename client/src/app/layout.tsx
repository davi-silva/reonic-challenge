import './globals.css';

import { Footer, NavigationBar } from '@/layouts';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import styles from './layout.module.scss';

const roboto = Roboto({ weight: '400', subsets: ['latin'], preload: true });

export const metadata: Metadata = {
  title: 'Reonic Challenge',
  description: 'Reonic coding challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Reonic Challenge</title>
      </head>
      <body className={`${roboto.className}`}>
        <NavigationBar />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
