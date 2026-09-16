import assert from "node:assert/strict";
import test from "node:test";
import {
  isAdminPasswordHash,
  validatePasswordChange,
} from "../src/lib/admin-password.ts";

test("admin password policy accepts a long mixed password", () => {
  assert.equal(
    validatePasswordChange(
      "Existing-Password-7",
      "Fresh-Founder-Key-42!",
      "Fresh-Founder-Key-42!",
    ),
    null,
  );
});

test("admin password policy rejects unsafe changes", () => {
  assert.match(
    validatePasswordChange("", "Example-Password-4!", "")!,
    /current/,
  );
  assert.match(
    validatePasswordChange("Old-Password-3!", "short", "short")!,
    /at least 14/,
  );
  assert.match(
    validatePasswordChange(
      "Old-Password-3!",
      "alllowercaseletters",
      "alllowercaseletters",
    )!,
    /three groups/,
  );
  assert.match(
    validatePasswordChange(
      "Old-Password-3!",
      "Different-Password-7!",
      "Mismatch-Password-8!",
    )!,
    /do not match/,
  );
});

test("admin credential hash format is strict", () => {
  assert.equal(
    isAdminPasswordHash(`${"a".repeat(32)}:${"b".repeat(128)}`),
    true,
  );
  assert.equal(isAdminPasswordHash("plaintext-password"), false);
  assert.equal(
    isAdminPasswordHash(`${"a".repeat(16)}:${"b".repeat(64)}`),
    false,
  );
});
