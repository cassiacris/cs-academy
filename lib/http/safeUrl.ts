const BLOCKED_HOSTNAMES = new Set(['localhost', '0.0.0.0', '::1'])

/**
 * Parses a user-supplied URL and rejects anything that isn't a plain https
 * URL to a public host, guarding against SSRF (internal services, cloud
 * metadata endpoints, loopback, etc.) when the server fetches it on the
 * caller's behalf.
 */
export function assertSafeExternalUrl(input: string): URL {
  let url: URL
  try {
    url = new URL(input)
  } catch {
    throw new Error('URL inválida.')
  }

  if (url.protocol !== 'https:') {
    throw new Error('Apenas URLs https são permitidas.')
  }

  const hostname = url.hostname.toLowerCase()
  const isPrivate =
    BLOCKED_HOSTNAMES.has(hostname) ||
    hostname.endsWith('.local') ||
    hostname === '127.0.0.1' ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname) ||
    /^169\.254\./.test(hostname)

  if (isPrivate) {
    throw new Error('Essa URL não pode ser usada.')
  }

  return url
}
