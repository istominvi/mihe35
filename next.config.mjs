/** @type {import('next').NextConfig} */
let basePath = process.env.BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH

if (basePath === undefined && process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.split('/')[1]
  basePath = `/${repo}`
}

if (basePath === '/') {
  basePath = ''
}

basePath = basePath || ''

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
