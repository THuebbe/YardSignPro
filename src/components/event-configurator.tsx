"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import EventDisplay from "./event-display";
import {
  DEFAULT_EVENT_CONFIG,
  DECORATIONS,
  EVENT_TYPES,
  FONT_STYLES,
  EventConfig,
} from "@/types/event";

export default function EventConfigurator() {
  const [config, setConfig] = useState<EventConfig>(DEFAULT_EVENT_CONFIG);

  const handleChange = (field: keyof EventConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDecoration = (decoration: string) => {
    setConfig((prev) => {
      const decorations = [...prev.decorations];
      if (decorations.includes(decoration)) {
        return {
          ...prev,
          decorations: decorations.filter((d) => d !== decoration),
        };
      } else {
        return { ...prev, decorations: [...decorations, decoration] };
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Event Sign Configurator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="decorations">Decorations</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>
                    Enter the basic information about your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input
                      id="eventName"
                      placeholder="Enter event name"
                      value={config.eventName}
                      onChange={(e) =>
                        handleChange("eventName", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !config.eventDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {config.eventDate
                            ? format(config.eventDate, "PPP")
                            : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={config.eventDate || undefined}
                          onSelect={(date) => handleChange("eventDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select
                      value={config.eventType}
                      onValueChange={(value) =>
                        handleChange("eventType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {EVENT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Input
                      id="message"
                      placeholder="Enter your message"
                      value={config.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how your sign looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signColor">Sign Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="signColor"
                        type="color"
                        className="w-12 h-12 p-1 cursor-pointer"
                        value={config.signColor}
                        onChange={(e) =>
                          handleChange("signColor", e.target.value)
                        }
                      />
                      <span className="text-sm">{config.signColor}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        className="w-12 h-12 p-1 cursor-pointer"
                        value={config.textColor}
                        onChange={(e) =>
                          handleChange("textColor", e.target.value)
                        }
                      />
                      <span className="text-sm">{config.textColor}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fontStyle">Font Style</Label>
                    <Select
                      value={config.fontStyle}
                      onValueChange={(value) =>
                        handleChange("fontStyle", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font style" />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_STYLES.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            <span className={font.value}>{font.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="decorations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Decorations</CardTitle>
                  <CardDescription>
                    Add decorative elements to your sign
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {DECORATIONS.map((decoration) => (
                      <div
                        key={decoration.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={decoration.value}
                          checked={config.decorations.includes(
                            decoration.value,
                          )}
                          onCheckedChange={() =>
                            toggleDecoration(decoration.value)
                          }
                        />
                        <Label htmlFor={decoration.value}>
                          {decoration.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <Button className="w-full max-w-md bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
              Save Configuration
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="w-full max-w-md">
            <EventDisplay config={config} />
          </div>
          <div className="mt-8 bg-gray-50 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-2">Configuration Summary</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Event Name:</strong>{" "}
                {config.eventName || "Not specified"}
              </li>
              <li>
                <strong>Event Date:</strong>{" "}
                {config.eventDate
                  ? format(config.eventDate, "PPP")
                  : "Not specified"}
              </li>
              <li>
                <strong>Event Type:</strong> {config.eventType}
              </li>
              <li>
                <strong>Message:</strong> {config.message}
              </li>
              <li>
                <strong>Sign Color:</strong> {config.signColor}
              </li>
              <li>
                <strong>Text Color:</strong> {config.textColor}
              </li>
              <li>
                <strong>Font Style:</strong>{" "}
                {FONT_STYLES.find((f) => f.value === config.fontStyle)?.name ||
                  config.fontStyle}
              </li>
              <li>
                <strong>Decorations:</strong>{" "}
                {config.decorations.length > 0
                  ? config.decorations
                      .map(
                        (d) => DECORATIONS.find((dec) => dec.value === d)?.name,
                      )
                      .join(", ")
                  : "None"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
