import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://adaptdee.xyz'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/login',
        '/signup',
        '/info-form',
        '/check-email',
        '/forgot-password',
        '/reset-password',
        '/api/',
        '/auth/',
        '/error',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
