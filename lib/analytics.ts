// Lazy wrapper around posthog-js so it's never in the critical bundle.
// posthog-js queues events internally, so calls before init() are safe.
export function capture(
  event: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  import("posthog-js").then(({ default: posthog }) => {
    posthog.capture(event, properties);
  });
}
