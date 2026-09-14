export interface HeaderVisibilityInput {
  currentY: number;
  previousY: number;
  hovering: boolean;
}

/** Resolves a deliberate visibility change, or preserves the current state. */
export function headerVisibilityChange({
  currentY,
  previousY,
  hovering,
}: HeaderVisibilityInput): boolean | null {
  if (currentY <= 20 || currentY < previousY - 6) return false;
  if (currentY > previousY + 6 && currentY > 120 && !hovering) return true;
  return null;
}
