import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Orders() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = getMyOrders(userId);
  return <div></div>;
}

export default Orders;
