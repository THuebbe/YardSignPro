import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import { createClient } from "../../../supabase/server";

export default async function Pricing() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Provide fallback data if the function call fails
  let plans = [];
  try {
    const { data, error } = await supabase.functions.invoke("get-plans");
    if (data && !error) {
      plans = data;
    }
  } catch (e) {
    console.error("Error fetching plans:", e);
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto  max-w-[1180px] px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <stripe-pricing-table
            pricing-table-id="prctbl_1R71a9FdwpVXW8mDGmhQYCUe"
            publishable-key="pk_test_51R4pW5FdwpVXW8mDWjNidCueG8MHCs6nt7scxQm4SKLyZ9z1ZBYLEXdzNOLTKJuu9w92no74aW5HhIFE8dgsaYpq00UydS2LJi"
          ></stripe-pricing-table>
        </div>
      </div>
    </>
  );
}
