import { test } from "node:test";
import assert from "node:assert/strict";
import { runTransition } from "../src/lib/transition-sequence.ts";

test("order-violation regression: delayed route commit blocks reveal deterministically", async () => {
  const events: string[] = [];
  const commitGate = Promise.withResolvers<void>();
  const commitStarted = Promise.withResolvers<void>();
  const transition = runTransition({
    reducedMotion: false,
    cover: async () => {
      events.push("cover");
    },
    rotate: async () => {
      events.push("rotate");
    },
    commit: async () => {
      events.push("commit");
      commitStarted.resolve();
      await commitGate.promise;
    },
    reveal: async () => {
      events.push("reveal");
    },
  });
  await commitStarted.promise;
  assert.deepEqual(events, ["cover", "rotate", "commit"]);
  commitGate.resolve();
  await transition;
  assert.deepEqual(events, ["cover", "rotate", "commit", "reveal"]);
});

test("reduced motion skips rotation while retaining the route barrier", async () => {
  const events: string[] = [];
  await runTransition({
    reducedMotion: true,
    cover: async () => {
      events.push("fade in");
    },
    rotate: async () => {
      assert.fail("rotation must be skipped");
    },
    commit: async () => {
      events.push("commit");
    },
    reveal: async () => {
      events.push("fade out");
    },
  });
  assert.deepEqual(events, ["fade in", "commit", "fade out"]);
});

test("route failure propagates to its owner without revealing a stale page", async () => {
  const failure = new Error("route unavailable");
  await assert.rejects(
    runTransition({
      reducedMotion: false,
      cover: async () => {},
      rotate: async () => {},
      commit: async () => {
        throw failure;
      },
      reveal: async () => {
        assert.fail("stale content revealed");
      },
    }),
    failure,
  );
});
