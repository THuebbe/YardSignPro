"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { supabase } from "../../supabase/supabase";
import { Check } from "lucide-react";
import { useState } from "react";

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Handle checkout process
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/sign-in?redirect=pricing";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Mock features for each plan
  const getFeatures = (planName: string) => {
    const baseFeatures = [
      "Unlimited sign listings",
      "Basic inventory management",
      "Customer booking portal",
    ];

    if (planName.toLowerCase().includes("pro")) {
      return [
        ...baseFeatures,
        "Advanced inventory tracking",
        "Payment processing",
        "Email notifications",
      ];
    } else if (
      planName.toLowerCase().includes("enterprise") ||
      planName.toLowerCase().includes("business")
    ) {
      return [
        ...baseFeatures,
        "Advanced inventory tracking",
        "Payment processing",
        "Email notifications",
        "Custom branding",
        "API access",
        "Priority support",
      ];
    }

    return baseFeatures;
  };

  const features = getFeatures(item.name || "");

  return (
    <Card
      className={`w-[350px] relative overflow-hidden transition-all duration-300 ${isHovered ? "transform -translate-y-2" : ""} ${item.popular ? "border-2 border-green-500 shadow-xl scale-105" : "border border-gray-200"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient with depth effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.popular ? "from-green-50 via-white to-blue-50" : "from-gray-50 via-white to-gray-100"} opacity-${isHovered ? "50" : "30"} transition-opacity duration-300`}
      />

      <CardHeader className="relative">
        {item.popular && (
          <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-fit mb-4 shadow-md">
            Most Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
          {item.name}
        </CardTitle>
        <CardDescription className="flex items-baseline gap-2 mt-2">
          <span className="text-4xl font-bold text-gray-900">
            ${item?.amount / 100}
          </span>
          <span className="text-gray-600">/{item?.interval}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="relative">
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          className={`w-full py-6 text-lg font-medium bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"} shadow-md hover:shadow-lg transition-all duration-200`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
