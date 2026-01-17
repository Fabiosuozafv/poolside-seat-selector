import { MapPin } from "lucide-react";

interface SelectionPinProps {
  x: number;
  y: number;
}

const SelectionPin = ({ x, y }: SelectionPinProps) => {
  return (
    <div
      className="selection-pin"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {/* Pulse effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/40 pin-pulse" />
      
      {/* Pin icon */}
      <div className="relative">
        <MapPin
          className="w-10 h-10 text-primary drop-shadow-lg"
          fill="hsl(var(--primary))"
          strokeWidth={1.5}
        />
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary-foreground" />
      </div>
    </div>
  );
};

export default SelectionPin;
