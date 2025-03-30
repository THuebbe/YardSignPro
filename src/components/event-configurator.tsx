"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Package,
  PlusCircle,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const signTypes = [
  { value: "birthday", label: "Birthday Signs" },
  { value: "graduation", label: "Graduation Signs" },
  { value: "anniversary", label: "Anniversary Signs" },
  { value: "welcome-home", label: "Welcome Home Signs" },
  { value: "congratulations", label: "Congratulations Signs" },
  { value: "baby", label: "New Baby Signs" },
];

const packages = [
  {
    id: "basic",
    name: "Basic Package",
    price: 49.99,
    signCount: 1,
    description: "Single yard sign with standard design",
  },
  {
    id: "standard",
    name: "Standard Package",
    price: 89.99,
    signCount: 2,
    description: "Two yard signs with premium design",
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 129.99,
    signCount: 3,
    description: "Three yard signs with deluxe design and add-ons",
  },
  {
    id: "deluxe",
    name: "Deluxe Package",
    price: 199.99,
    signCount: 5,
    description: "Five yard signs with custom design and premium add-ons",
  },
];

export default function EventConfigurator() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(packages[1]);
  const [selectedSignType, setSelectedSignType] = useState(signTypes[0]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [customText, setCustomText] = useState("");

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the event configuration
    console.log({
      eventDate: date,
      package: selectedPackage,
      signType: selectedSignType,
      customerInfo,
      customText,
    });
    // In a real app, you would send this to your backend
    alert("Event configuration submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      <Card className="border-2 border-gray-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardTitle className="text-2xl font-bold">
            Event Configurator
          </CardTitle>
          <CardDescription>
            Configure a new yard sign rental event for your customer
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="package">Package Selection</TabsTrigger>
            <TabsTrigger value="customer">Customer Info</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="details" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-type">Sign Type</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedSignType.label}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search sign types..." />
                      <CommandEmpty>No sign type found.</CommandEmpty>
                      <CommandGroup>
                        {signTypes.map((type) => (
                          <CommandItem
                            key={type.value}
                            value={type.value}
                            onSelect={() => {
                              setSelectedSignType(type);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedSignType.value === type.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-text">Custom Text for Signs</Label>
                <Input
                  id="custom-text"
                  placeholder="Enter custom text for the signs"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="package" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${selectedPackage.id === pkg.id ? "border-2 border-green-500 shadow-md" : "border border-gray-200"}`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Package className="mr-2 h-5 w-5 text-green-600" />
                        {pkg.name}
                      </CardTitle>
                      <CardDescription>${pkg.price.toFixed(2)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{pkg.description}</p>
                      <p className="text-sm mt-2 font-medium">
                        {pkg.signCount} sign{pkg.signCount > 1 ? "s" : ""}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="customer" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter customer name"
                  value={customerInfo.name}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={customerInfo.phone}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Installation Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter the address for sign installation"
                  value={customerInfo.address}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>
            </TabsContent>

            <CardFooter className="flex justify-between bg-gray-50 p-6">
              <Button variant="outline">Cancel</Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </CardFooter>
          </form>
        </Tabs>
      </Card>
    </div>
  );
}
