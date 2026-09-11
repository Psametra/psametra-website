import { test } from "node:test";
import assert from "node:assert/strict";
import { formatProjectBrief } from "../src/lib/project-brief.ts";

test("brief preserves Unicode, multiline requirements, and omitted optional company", () => {
  const result = formatProjectBrief({
    name: "  Zoë  ",
    email: "zoe@example.com",
    company: "  ",
    service: "AI Systems",
    details: "Source references.\nHuman review & approval.",
  });
  assert.ok(result.includes("Name: Zoë\n"));
  assert.ok(result.includes("Company: Not specified\n"));
  assert.ok(result.endsWith("Source references.\nHuman review & approval."));
});
