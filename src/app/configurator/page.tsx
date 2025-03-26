import EventConfigurator from "@/components/event-configurator";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SubscriptionCheck } from "@/components/subscription-check";

export default function ConfiguratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="py-12">
        <SubscriptionCheck>
          <EventConfigurator />
        </SubscriptionCheck>
      </main>
      <Footer />
    </div>
  );
}
