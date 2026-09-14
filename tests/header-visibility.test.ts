import test from "node:test";
import assert from "node:assert/strict";

import { headerVisibilityChange } from "../src/lib/header-visibility.ts";

test("header hides only after deliberate downward scrolling", () => {
  assert.equal(
    headerVisibilityChange({ currentY: 160, previousY: 140, hovering: false }),
    true,
  );
  assert.equal(
    headerVisibilityChange({ currentY: 110, previousY: 90, hovering: false }),
    null,
  );
  assert.equal(
    headerVisibilityChange({ currentY: 160, previousY: 140, hovering: true }),
    null,
  );
});

test("header returns near the top or after deliberate upward scrolling", () => {
  assert.equal(
    headerVisibilityChange({ currentY: 18, previousY: 42, hovering: false }),
    false,
  );
  assert.equal(
    headerVisibilityChange({ currentY: 180, previousY: 200, hovering: false }),
    false,
  );
  assert.equal(
    headerVisibilityChange({ currentY: 198, previousY: 200, hovering: false }),
    null,
  );
});
