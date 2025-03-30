import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  Calendar,
  CreditCard,
  Users2,
  ClipboardList,
  Star,
  BarChart3,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white w-full" id="features">
        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Features for Yard Sign Rentals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your yard sign rental business in
              one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users2 className="w-8 h-8" />,
                title: "Renter Management",
                description:
                  "Keep track of all your customers, their rental history, and preferences in one centralized database.",
                image:
                  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
              },
              {
                icon: <ClipboardList className="w-8 h-8" />,
                title: "Event Package Creation",
                description:
                  "Create and customize packages for different events, with flexible pricing and inventory options.",
                image:
                  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
              },
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: "Payment Processing",
                description:
                  "Accept payments online, track invoices, and manage deposits and refunds seamlessly.",
                image:
                  "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-10 left-6 w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-6">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden w-full">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-green-50 to-transparent opacity-70" />
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-blue-50 to-transparent opacity-70" />

        <div className="w-full max-w-[1180px] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from yard sign rental businesses that have transformed their
              operations with YardSignPro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "YardSignPro has completely transformed how we manage our yard sign rentals. The inventory tracking alone has saved us countless hours.",
                author: "Sarah Johnson",
                company: "Celebration Signs",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                quote:
                  "The customer portal makes it so easy for clients to book signs. Our bookings have increased by 40% since implementing YardSignPro.",
                author: "Michael Rodriguez",
                company: "Party Perfect Signs",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                quote:
                  "Payment processing used to be a nightmare. Now it's all automated and we can focus on growing our business instead of chasing payments.",
                author: "Jennifer Lee",
                company: "SignMasters Events",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg relative"
              >
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="mb-6 pt-4">
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-green-500">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80')] opacity-10 bg-cover bg-center" />
        <div className="w-full max-w-[1180px] mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Active Businesses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="text-green-100">Signs Managed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-green-100">Processed Annually</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-green-100">Uptime Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white relative w-full" id="pricing">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="w-full max-w-[1180px] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your yard sign rental business. No
              hidden fees.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <stripe-pricing-table
              pricing-table-id="prctbl_1R71a9FdwpVXW8mDGmhQYCUe"
              publishable-key="pk_test_51R4pW5FdwpVXW8mDWjNidCueG8MHCs6nt7scxQm4SKLyZ9z1ZBYLEXdzNOLTKJuu9w92no74aW5HhIFE8dgsaYpq00UydS2LJi"
            ></stripe-pricing-table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588012886079-6c2a634ff667?w=1200&q=80')] opacity-5 bg-cover bg-center" />
        <div className="w-full max-w-[1180px] mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Yard Sign Business?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of yard sign rental companies already growing with
            YardSignPro.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-medium"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
