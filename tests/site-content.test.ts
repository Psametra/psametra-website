import assert from "node:assert/strict";
import test from "node:test";
import { defaultSite } from "../src/content/site.ts";
import { validateSiteContent } from "../src/content/site-schema.ts";

test("version-controlled site content satisfies the CMS schema", () => {
  assert.equal(validateSiteContent(defaultSite), true);
});

test("CMS validation rejects unsafe colors and oversized collections", () => {
  const invalidColor = structuredClone(defaultSite);
  invalidColor.appearance.dark.accent = "url(javascript:alert(1))";
  assert.equal(validateSiteContent(invalidColor), false);

  const oversized = structuredClone(defaultSite);
  oversized.services = Array.from({ length: 51 }, () => oversized.services[0]);
  assert.equal(validateSiteContent(oversized), false);

  const unsafeLink = structuredClone(defaultSite);
  unsafeLink.navigation[0].href = "javascript:alert(1)";
  assert.equal(validateSiteContent(unsafeLink), false);

  const invalidMetric = structuredClone(defaultSite);
  invalidMetric.workStats[0].value = -1;
  assert.equal(validateSiteContent(invalidMetric), false);

  const unsafeProjectLink = structuredClone(defaultSite);
  unsafeProjectLink.projects[0].href = "javascript:alert(1)";
  assert.equal(validateSiteContent(unsafeProjectLink), false);

  const unsafeProjectImage = structuredClone(defaultSite);
  unsafeProjectImage.projects[0].image = "https://example.com/tracker.png";
  assert.equal(validateSiteContent(unsafeProjectImage), false);
});
