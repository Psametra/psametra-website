/** Only cross-page, same-origin HTTP navigations participate in the eclipse transition. */
export function shouldTransition(current: URL, destination: URL): boolean {
  return (
    destination.origin === current.origin &&
    (destination.protocol === "http:" || destination.protocol === "https:") &&
    destination.pathname.replace(/\/$/, "") !==
      current.pathname.replace(/\/$/, "")
  );
}
