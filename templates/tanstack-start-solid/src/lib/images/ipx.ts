import { createIPX, createIPXFetchHandler, ipxFSStorage, ipxHttpStorage } from 'ipx';

const remoteDomains = (process.env.IPX_HTTP_DOMAINS ?? '')
  .split(',')
  .map((domain) => domain.trim())
  .filter(Boolean);

const ipx = createIPX({
  storage: ipxFSStorage({
    dir: './public',
    maxAge: 60 * 60 * 24 * 30,
  }),
  httpStorage: ipxHttpStorage({
    domains: remoteDomains,
    maxAge: 60 * 60,
  }),
});

const handle = createIPXFetchHandler(ipx);

export function handleImageRequest(request: Request) {
  return handle(stripMountPath(request));
}

function stripMountPath(request: Request) {
  const url = new URL(request.url);
  url.pathname = url.pathname.replace(/^\/ipx\/?/, '/');
  return new Request(url, request);
}
