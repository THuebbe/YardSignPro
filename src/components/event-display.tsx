"use client";

import { EventConfig } from "@/types/event";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Balloon, Confetti, Heart, Flower, Star } from "lucide-react";

interface EventDisplayProps {
  config: EventConfig;
  className?: string;
}

export default function EventDisplay({ config, className }: EventDisplayProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderDecorations = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {config.decorations.includes("balloons") && (
          <div className="absolute top-2 right-2">
            <Balloon className="h-8 w-8 text-red-500" />
          </div>
        )}
        {config.decorations.includes("confetti") && (
          <div className="absolute top-2 left-2">
            <Confetti className="h-8 w-8 text-yellow-500" />
          </div>
        )}
        {config.decorations.includes("stars") && (
          <div className="absolute bottom-2 right-2">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          </div>
        )}
        {config.decorations.includes("hearts") && (
          <div className="absolute bottom-2 left-2">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          </div>
        )}
        {config.decorations.includes("flowers") && (
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <Flower className="h-8 w-8 text-pink-500" />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card
      className={cn(
        "relative w-full max-w-md mx-auto aspect-[3/2] flex flex-col items-center justify-center p-6 overflow-hidden shadow-lg",
        className,
      )}
      style={{ backgroundColor: config.signColor }}
    >
      {renderDecorations()}

      <div className="z-10 text-center">
        <h2
          className={cn("text-3xl font-bold mb-2", config.fontStyle)}
          style={{ color: config.textColor }}
        >
          {config.message}
        </h2>

        {config.eventName && (
          <p
            className={cn("text-xl mb-1", config.fontStyle)}
            style={{ color: config.textColor }}
          >
            {config.eventName}
          </p>
        )}

        {config.eventDate && (
          <p
            className={cn("text-lg", config.fontStyle)}
            style={{ color: config.textColor }}
          >
            {formatDate(config.eventDate)}
          </p>
        )}
      </div>
    </Card>
  );
}
