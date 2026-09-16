import { Footer } from "@/components/footer";
import { MotionObserver } from "@/components/motion-observer";
import { Header } from "@/components/navigation/header";
import { ScrollProvider } from "@/components/navigation/scroll-provider";
import { TransitionProvider } from "@/components/navigation/transition-provider";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function PublicSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();
  const themeVariables = {
    "--cms-light-surface": content.appearance.light.surface,
    "--cms-light-ink": content.appearance.light.ink,
    "--cms-light-muted": content.appearance.light.muted,
    "--cms-light-accent": content.appearance.light.accent,
    "--cms-dark-surface": content.appearance.dark.surface,
    "--cms-dark-ink": content.appearance.dark.ink,
    "--cms-dark-muted": content.appearance.dark.muted,
    "--cms-dark-accent": content.appearance.dark.accent,
  } as React.CSSProperties;

  return (
    <div className="public-site" style={themeVariables}>
      <ScrollProvider>
        <TransitionProvider>
          <MotionObserver />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header content={content} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer content={content} />
        </TransitionProvider>
      </ScrollProvider>
    </div>
  );
}
