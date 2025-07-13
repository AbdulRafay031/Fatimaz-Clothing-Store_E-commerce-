"use client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const CheckoutButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleCheckout = () => {
    if (status === "loading") return;

    if (!session) {
      toast.warning("Please sign in to continue to checkout.");
      router.push("/SignIn?callbackUrl=/checkout");
      return;
    }

    router.push("/checkout");
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
