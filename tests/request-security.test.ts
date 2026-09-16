import assert from "node:assert/strict";
import test from "node:test";
import { isSameOrigin } from "../src/lib/request-security.ts";

test("same-origin admin writes accept local and forwarded deployments", () => {
  assert.equal(
    isSameOrigin(
      new Request("http://localhost:3000/api/admin/content", {
        headers: { origin: "http://localhost:3000", host: "localhost:3000" },
      }),
    ),
    true,
  );
  assert.equal(
    isSameOrigin(
      new Request("http://internal/api/admin/content", {
        headers: {
          origin: "https://psametra-website.vercel.app",
          host: "internal",
          "x-forwarded-host": "psametra-website.vercel.app",
          "x-forwarded-proto": "https",
        },
      }),
    ),
    true,
  );
});

test("same-origin admin writes reject foreign and missing origins", () => {
  assert.equal(
    isSameOrigin(
      new Request("https://psametra-website.vercel.app/api/admin/content", {
        headers: {
          origin: "https://attacker.example",
          host: "psametra-website.vercel.app",
        },
      }),
    ),
    false,
  );
  assert.equal(
    isSameOrigin(
      new Request("https://psametra-website.vercel.app/api/admin/content", {
        headers: { host: "psametra-website.vercel.app" },
      }),
    ),
    false,
  );
});
