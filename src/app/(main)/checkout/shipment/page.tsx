"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShipmentOptions } from "@/lib/hooks/useShipment";
import { useUIStore } from "@/lib/stores/uiStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ShipmentPage() {
  const router = useRouter();
  const { checkout, setShippingAddress, setSelectedCourier } = useUIStore();
  const [address, setAddress] = useState(checkout.shippingAddress);
  const [submitted, setSubmitted] = useState(false);

  const { data: options, isLoading } = useShipmentOptions(submitted ? address : "");

  const handleNext = () => {
    if (!checkout.selectedCourier) return;
    setShippingAddress(address);
    router.push("/checkout/payment");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Shipping Details</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">Delivery Address</label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full delivery address" />
        <Button variant="outline" size="sm" onClick={() => setSubmitted(true)}>
          Check Courier Options
        </Button>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading couriers...</p>}

      {options && (
        <div className="space-y-3">
          <p className="font-medium text-sm">Select Courier</p>
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedCourier(opt)}
              className={`w-full text-left border rounded-lg p-4 transition-colors ${checkout.selectedCourier?.id === opt.id ? "border-green-600 bg-green-50" : "hover:bg-gray-50"}`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{opt.label}</span>
                <span className="text-green-700 font-medium">Rp {opt.price.toLocaleString("id-ID")}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Estimated {opt.estimatedDays} days</p>
            </button>
          ))}
        </div>
      )}

      <Button onClick={handleNext} disabled={!checkout.selectedCourier} className="w-full bg-green-700 hover:bg-green-800 text-white">
        Continue to Payment
      </Button>
    </div>
  );
}
