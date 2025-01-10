import { defineQuery } from "next-sanity";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("userId is required");
  }
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
    ...,
    product[]{
    ...,
    product->
    }
    }
    `);
}
