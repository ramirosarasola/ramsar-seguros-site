// Dynamic import keeps posthog-js out of the initial bundle entirely.
// posthog-js queues events internally, so capture() calls before init are safe.
const initPostHog = () =>
  import("posthog-js").then(({ default: posthog }) =>
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      defaults: "2026-01-30",
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    })
  );

if ("requestIdleCallback" in window) {
  requestIdleCallback(initPostHog, { timeout: 5000 });
} else {
  setTimeout(initPostHog, 3000);
}
