export const COUPON_CODES = {
  NY2025: "NY2025",
  XMAS: "MERRRY",
  MAGH: "MAGH1ST",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
