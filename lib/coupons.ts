import { Coupon } from "@/types";

/**
 * Hardcoded list of valid coupon codes for demonstration purposes
 */
export const VALID_COUPONS: Coupon[] = [
  {
    code: "SAVE10",
    discountPercent: 10,
    description: "10% off your order",
  },
  {
    code: "SAVE15",
    discountPercent: 15,
    description: "15% off your order",
  },
  {
    code: "SAVE20",
    discountPercent: 20,
    description: "20% off your order",
  },
  {
    code: "WELCOME25",
    discountPercent: 25,
    description: "25% off for new customers",
  },
];

/**
 * Validates a coupon code (case-insensitive) and returns the coupon if valid
 * @param code - The coupon code to validate (will be trimmed and uppercased)
 * @returns The valid coupon or null if invalid
 */
export function validateCoupon(code: string): Coupon | null {
  const normalizedCode = code.trim().toUpperCase();
  
  if (!normalizedCode) {
    return null;
  }
  
  const coupon = VALID_COUPONS.find(
    (c) => c.code === normalizedCode
  );
  
  return coupon || null;
}

/**
 * Calculates the discount amount for a given subtotal and coupon
 * @param subtotal - The cart subtotal
 * @param coupon - The applied coupon
 * @returns The discount amount (always positive)
 */
export function calculateDiscount(subtotal: number, coupon: Coupon): number {
  const discount = (subtotal * coupon.discountPercent) / 100;
  // Round to 2 decimal places
  return Math.round(discount * 100) / 100;
}

/**
 * Free shipping threshold after discount is applied
 */
export const FREE_SHIPPING_THRESHOLD = 25;
