import { MapPin, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectionData {
  x: number;
  y: number;
  sector: string | null;
}

interface StatusCardProps {
  selection: SelectionData | null;
  onConfirm: () => void;
  onClear: () => void;
}

const StatusCard = ({ selection, onConfirm, onClear }: StatusCardProps) => {
  const hasSelection = selection !== null;

  return (
    <div className="glass-card rounded-t-2xl p-4 sm:p-6">
      {/* Status indicator */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-3 h-3 rounded-full transition-colors ${
            hasSelection ? "bg-primary animate-pulse" : "bg-muted-foreground/40"
          }`}
        />
        <span className="font-medium text-foreground">
          {hasSelection ? "Local selecionado" : "Nenhum local selecionado"}
        </span>
        {hasSelection && selection.sector && (
          <span className="ml-auto text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {selection.sector}
          </span>
        )}
      </div>

      {/* Coordinates */}
      {hasSelection && (
        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-medium">X:</span>
            <span className="font-mono text-foreground">{Math.round(selection.x)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-medium">Y:</span>
            <span className="font-mono text-foreground">{Math.round(selection.y)}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={onConfirm}
          disabled={!hasSelection}
          className="flex-1 gap-2 font-semibold"
          size="lg"
        >
          <Check className="w-5 h-5" />
          Confirmar Local
        </Button>
        
        {hasSelection && (
          <Button
            onClick={onClear}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <X className="w-5 h-5" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
