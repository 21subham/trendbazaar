"use client";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createCheckoutSession,
  Metadata,
} from "../../../../actions/createCheckoutSession";

function BasketPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const groupedItems = useBasketStore((state) => state.getGroupedItems());

  const handleCheckout = async () => {
    if (!isSignedIn) {
      return;
    }
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
        mode: "payment",
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error in checkout session: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Your basket</h1>
        <p className="text-xl font-semibold my-6 text-gray-600">
          Your basket is empty.
        </p>
        <p className="text-lg text-blue-500 animate-pulse ">
          Please add some items to your basket.
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Your basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 p-4 border rounded flex items-center justify between"
            >
              <div
                className="flex items-center sursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product Image"}
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-8">
                  <h2 className="text-lg sm:text-xl font-semibold truncate max-w-md">
                    {item.product.name}
                  </h2>
                  <span className="text-sm sm:text-base">
                    {" "}
                    In Stock: {item.product.stock}
                  </span>
                  <p className="text-sm sm:text-base">
                    Price: ${(item.product.price ?? 0) * item.quantity}
                  </p>
                </div>
              </div>
              {/* add to basket */}

              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton
                  product={item.product}
                  disabled={item.quantity >= (item.product.stock ?? 0)}
                />
              </div>
            </div>
          ))}
        </div>
        {/* sticky section */}
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white rounded p-6 border order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="justify-between flex">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>
                {useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              className="mt-4 w-full bg-blue-500 rounded hover:bg-blue-600 text-white font-bold py-2 px-4 disabled:bg-gray-500"
              disabled={isLoading}
              onClick={handleCheckout}
            >
              {isLoading ? (
                <>
                  <span>
                    Processing&nbsp;&nbsp;
                    <Loader2 className="animate-spin duration-1000 inline " />
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <ShoppingCart className="inline w-4 h-4 pb-0.5" />
                    &nbsp; Checkout
                  </span>
                </>
              )}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0">
          {/* space for fixed checkout on mobile */}
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
