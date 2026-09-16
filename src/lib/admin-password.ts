export const ADMIN_PASSWORD_MIN_LENGTH = 14;
export const ADMIN_PASSWORD_MAX_LENGTH = 128;

export function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  confirmation: string,
) {
  if (!currentPassword) return "Enter your current password.";
  if (newPassword !== confirmation) return "The new passwords do not match.";
  if (newPassword === currentPassword)
    return "Choose a password that differs from your current password.";
  if (newPassword.length < ADMIN_PASSWORD_MIN_LENGTH)
    return `Use at least ${ADMIN_PASSWORD_MIN_LENGTH} characters.`;
  if (newPassword.length > ADMIN_PASSWORD_MAX_LENGTH)
    return `Use no more than ${ADMIN_PASSWORD_MAX_LENGTH} characters.`;

  const characterGroups = [
    /[a-z]/.test(newPassword),
    /[A-Z]/.test(newPassword),
    /\d/.test(newPassword),
    /[^A-Za-z0-9]/.test(newPassword),
  ].filter(Boolean).length;
  if (characterGroups < 3)
    return "Use characters from at least three groups: lowercase, uppercase, numbers, and symbols.";
  return null;
}

export function isAdminPasswordHash(value: unknown): value is string {
  return typeof value === "string" && /^[a-f\d]{32}:[a-f\d]{128}$/i.test(value);
}
