import { CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SavedLocation {
  tableId: number;
  sector: string;
  timestamp: number;
}

interface SuccessScreenProps {
  savedLocation: SavedLocation;
  onReset: () => void;
}

const SuccessScreen = ({ savedLocation, onReset }: SuccessScreenProps) => {
  const formattedDate = new Date(savedLocation.timestamp).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        {/* Success icon with animation */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <CheckCircle2 className="w-24 h-24 text-primary mx-auto relative" strokeWidth={1.5} />
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Local salvo com sucesso!
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Sua mesa foi registrada
        </p>

        {/* Saved data card */}
        <div className="glass-card rounded-xl p-4 mb-8 text-left">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2">
              <span className="text-muted-foreground">Mesa</span>
              <p className="font-mono font-bold text-2xl text-primary">
                #{savedLocation.tableId}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Setor</span>
              <p className="font-medium text-primary">{savedLocation.sector}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Data/Hora</span>
              <p className="font-medium text-foreground">{formattedDate}</p>
            </div>
          </div>
        </div>

        <Button onClick={onReset} variant="outline" size="lg" className="gap-2 w-full">
          <RotateCcw className="w-5 h-5" />
          Selecionar novamente
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
