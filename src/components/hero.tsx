import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white w-full">
      {/* Background gradient with yard sign images */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-80" />

      {/* Overlapping yard sign images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-20 transform rotate-12 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1584753987666-a7e6f1f4e488?w=800&q=80"
            width={400}
            height={300}
            alt="Yard Sign"
            className="rounded-lg shadow-xl"
          />
        </div>
        <div className="absolute left-10 bottom-20 transform -rotate-6 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1588012886079-6c2a634ff667?w=800&q=80"
            width={350}
            height={250}
            alt="Yard Sign"
            className="rounded-lg shadow-xl"
          />
        </div>
        <div className="absolute right-1/4 bottom-10 transform rotate-3 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
            width={300}
            height={200}
            alt="Yard Sign"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 w-full">
        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Streamline Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Yard Sign Rental
              </span>{" "}
              Business
            </h1>

            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              The complete management solution for event yard sign rental
              companies. Simplify bookings, manage inventory, and grow your
              business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
              >
                Get Started Free
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all text-lg font-medium shadow-md hover:shadow-lg"
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
