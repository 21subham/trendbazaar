import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function NewYearBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.NY2025);
}

export default NewYearBanner;
