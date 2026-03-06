{
  "name": "askimiz-static-vercel",
  "private": true,
  "version": "0.2.1",
  "scripts": {
    "dev": "vercel dev",
    "build": "echo \"Static build: using public/\"",
    "start": "node -e \"console.log('askimiz.com')\""
  },
  "dependencies": {
    "@vercel/postgres": "^0.10.0",
    "@vercel/blob": "^0.27.0",
    "bcryptjs": "^2.4.3"
  },
  "engines": {
    "node": "24.x"
  }
}