/** Mutating admin requests must originate from the same deployment. */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const originUrl = new URL(origin);
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  if (!host || originUrl.host !== host) return false;
  return forwardedProtocol
    ? originUrl.protocol === `${forwardedProtocol}:`
    : true;
}
