import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: 'DevConnect - Where Exceptional Talent Meets Unlimited Opportunity',
  description: 'Experience the future of talent connection with our AI-powered platform that transforms how exceptional developers discover extraordinary opportunities and build legendary careers.',
  keywords: 'developer jobs, tech careers, software engineering, AI-powered recruitment, elite developers, tech talent',
  authors: [{ name: 'DevConnect Team' }],
  creator: 'DevConnect',
  publisher: 'DevConnect',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://devconnect.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DevConnect - Where Exceptional Talent Meets Unlimited Opportunity',
    description: 'Experience the future of talent connection with our AI-powered platform that transforms how exceptional developers discover extraordinary opportunities and build legendary careers.',
    url: 'https://devconnect.com',
    siteName: 'DevConnect',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DevConnect - Elite Developer Network',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevConnect - Where Exceptional Talent Meets Unlimited Opportunity',
    description: 'Experience the future of talent connection with our AI-powered platform.',
    images: ['/twitter-image.jpg'],
    creator: '@devconnect',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${inter.variable} font-smooth scroll-smooth`}
    >
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional meta tags for better compatibility */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DevConnect" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS to prevent FOUC */
            body { 
              font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
            
            /* Prevent layout shift for main content */
            .min-h-screen {
              min-height: 100vh;
              min-height: 100dvh;
            }
            
            /* Ensure smooth scrolling works on all browsers */
            html {
              scroll-behavior: smooth;
            }
            
            @media (prefers-reduced-motion: reduce) {
              html {
                scroll-behavior: auto;
              }
            }
            
            /* Fix for potential hydration mismatches */
            * {
              box-sizing: border-box;
            }
          `
        }} />
      </head>
      <body 
        className={`${inter.className} font-smooth antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="devconnect-theme"
        >
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:font-medium"
          >
            Skip to main content
          </a>
          
          {/* Main content wrapper */}
          <div id="main-content" className="relative">
            {children}
          </div>
          
          {/* Toast notifications */}
          <Toaster />
          
          {/* Performance monitoring (optional) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Basic performance monitoring
                if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                  requestIdleCallback(() => {
                    // Log Core Web Vitals or other metrics
                    if ('PerformanceObserver' in window) {
                      try {
                        const observer = new PerformanceObserver((list) => {
                          list.getEntries().forEach((entry) => {
                            if (entry.entryType === 'largest-contentful-paint') {
                              console.log('LCP:', entry.startTime);
                            }
                          });
                        });
                        observer.observe({ entryTypes: ['largest-contentful-paint'] });
                      } catch (e) {
                        // Silently fail if not supported
                      }
                    }
                  });
                }
              `
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}