"use client";

import { OrderSummaryCard } from "@/components/order-summary-card";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import Link from "next/link";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   cardDetailsSchema,
//   CardDetailsFormData,
//   formatCardNumber,
//   formatExpiryDate,
// } from "@/validators/checkout-validators";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { useCheckout } from "@/context/checkout-context";
import { useMutation } from "@tanstack/react-query";
import { createOrder, CreateOrderPayload } from "@/services/api/order";

function CardDetails({
  handleNext,
  handlePrevious,
}: {
  handleNext: () => void;
  handlePrevious: () => void;
}) {
  const { cart, getCartTotal, clearCart } = useCart();
  const { formatPrice, currency, convertPrice } = useCurrency();
  const { checkoutData, clearCheckoutData } = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedLicencePolicy, setAcceptedLicencePolicy] = useState(false);

  // Logic for calculations
  const subtotal = getCartTotal();
  // const vatRate = 0.075; // 7.5%
  // const vatAmount = subtotal * vatRate;
  const total = subtotal; // + vatAmount;

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async (order) => {
      try {
        await fetch("/api/send-order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: checkoutData.email,
            customerName: `${checkoutData.firstName} ${checkoutData.lastName}`,
            orderId: order.order_number,
            orderDate: new Date().toLocaleDateString(),
            total: formatPrice(total),
            currency: currency.symbol,
            items: cart.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            })),
          }),
        });
        const paymentRes = await fetch("/api/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: convertPrice(total),
            currency: currency.code,
            email: checkoutData.email,
            name: `${checkoutData.firstName} ${checkoutData.lastName}`,
            tx_ref: order.tx_ref,
          }),
        });

        const paymentData = await paymentRes.json();

        if (!paymentData.link) {
          throw new Error("Payment link not returned");
        }
        window.location.href = paymentData.link;
      } catch (err) {
        console.error("Payment init failed:", err);
        setIsSubmitting(false);
      }
    },
    onError: (error) => {
      console.error("Order creation failed:", error);
      setIsSubmitting(false);
    },
  });

  /* Commented out card form handling
  const methods = useForm<CardDetailsFormData>({
    resolver: zodResolver(cardDetailsSchema),
  });

  const onSubmit = async (data: CardDetailsFormData) => {
    setIsSubmitting(true);

    // updateCheckoutData({
    //   cardNumber: data.card_number,
    //   cardHolder: data.card_holder,
    //   expiryDate: data.expiry_date,
    //   cvv: data.cvv,
    //   billingCountry: data.billing_country,
    //   billingState: data.billing_state,
    //   billingCity: data.billing_city,
    //   billingPostalCode: data.billing_postal_code,
    //   billingAddress: data.billing_address,
    // });
  };
  */

  const handlePayment = () => {
    setIsSubmitting(true);

    const tx_ref = `tx-${Date.now()}`;

    const orderPayload = {
      tx_ref,
      customer_name: `${checkoutData.firstName} ${checkoutData.lastName}`,
      customer_email: checkoutData.email,
      customer_phone: checkoutData.phoneNumber,
      customer_company: checkoutData.companyName,
      total_amount: convertPrice(total),
      currency: currency.code,
      product_id: cart.map((item) => item.productId),
      product_data: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
        exclusivity: item.exclusivity,
        image: item.image,
      })),

      /*
    shipping_address: {
      country: checkoutData.deliveryCountry,
      state: checkoutData.deliveryState,
      city: checkoutData.deliveryCity,
      postal_code: checkoutData.deliveryPostalCode,
      address: checkoutData.deliveryAddress,
    },
    */
    };

    createOrderMutation.mutate(orderPayload as CreateOrderPayload);
  };

  return (
    <section className="flex flex-col gap-4 items-start mt-10 md:mt-20">
      {/* Commented out card details form
      <div className='md:w-[60%] md:border-r border-black md:pr-6'>
        <FormProvider {...methods}>
          <section className='md:p-6 pt-0 w-full'>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col justify-center items-start mt-[30px] gap-6'
            >
              ... (form content)
            </form>
          </section>
        </FormProvider>
      </div>
      */}

      <section className="bg-[#E8E7D7] md:p-8 p-4 pt-8 mx-auto w-full lg:w-[60%] md:w-[80%] md:mt-0 mt-5">
        <h2 className="font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase">
          Order Summary
        </h2>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {cart.map((item) => (
            <OrderSummaryCard
              key={item.id}
              title={item.title}
              price={item.price}
              exclusivity={item.exclusivity.toUpperCase()}
              color={item.color || "Default"}
              colorCode={item.colorCode || "#8A8635"}
              quantity={item.quantity}
              size={item.size}
              image={item.image}
              images={item.images}
            />
          ))}
        </div>
        <div className="py-8 flex flex-col gap-3 font-satoshi">
          <div className="flex justify-between text-[20px] font-medium text-[#1C1B0B]">
            <p className="font-light">Subtotal</p>
            <p>{formatPrice(subtotal)}</p>
          </div>

          {/* VAT Row Added */}
          {/* <div className="flex justify-between text-[20px] font-medium text-[#1C1B0B]">
            <p className="font-light">VAT (7.5%)</p>
            <p>{formatPrice(vatAmount)}</p>
          </div> */}
        </div>

        <div className="bg-gray-400 w-full h-px" />
        <div className="flex justify-between pt-4 pb-4 text-[20px] font-medium text-[#1C1B0B]">
          <p>Total</p>
          <p>{formatPrice(total)}</p>
        </div>


      </section>
      <label className="flex items-center justify-center md:mx-auto gap-3 cursor-pointer mt-6 font-satoshi text-sm text-[#1C1B0B]">
        <Checkbox
          checked={acceptedLicencePolicy}
          onCheckedChange={(checked) =>
            setAcceptedLicencePolicy(checked === true)
          }
          aria-label="Accept licence policy"
        />
        <span>
          I accept the{" "}
          <Link
            href="/license"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#8A8635] transition-colors"
          >
            Licence Agreement
          </Link>
        </span>
      </label>
      <div className="md:flex hidden gap-4 items-center lg:w-[60%] md:w-[80%] mx-auto">
        <button
          type="button"
          className="mt-4 bg-white text-black border border-black h-16 px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal"
          onClick={handlePrevious}
          disabled={isSubmitting}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={isSubmitting || !acceptedLicencePolicy}
          className="mt-4 bg-black text-white px-6 py-3 h-16 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-50"
          onClick={handlePayment}
        >
          {isSubmitting ? "Processing..." : "Make Payment"}
        </button>
      </div>

      <div className="md:hidden flex flex-col gap-4 items-center w-full">
        <button
          type="button"
          className="mt-4 bg-white text-black border border-black h-13 px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal"
          onClick={handlePrevious}
          disabled={isSubmitting}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={isSubmitting || !acceptedLicencePolicy}
          className="mt-4 bg-black text-white px-6 py-3 h-13 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-50"
          onClick={handlePayment}
        >
          {isSubmitting ? "Processing..." : "Make Payment"}
        </button>
      </div>
    </section>
  );
}

export default CardDetails;