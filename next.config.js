// * Before defining your Security Headers
// * add Content Security Policy directives using a template string.
// * When a directive uses a keyword such as self, wrap it in single quotes ''.

// * Content Security Policy
/* const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';  
` */

// * You can choose which headers to add to the list
const securityHeaders = [
  /* { // * Set by default in vercel
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }, */  
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
 /*  {// In the header's value, replace the new line with an empty string.
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }   */
    
  
]

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  images: {
    domains: ['images.unsplash.com'],
  },

  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  }
}