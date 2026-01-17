import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import PoolMapImage from "@/components/PoolMapImage";
import SelectionPin from "@/components/SelectionPin";
import StatusCard from "@/components/StatusCard";
import SuccessScreen from "@/components/SuccessScreen";
import { usePoolMapSelection } from "@/hooks/usePoolMapSelection";

const Index = () => {
  const {
    containerRef,
    selection,
    savedLocation,
    isConfirmed,
    handleMapClick,
    confirmSelection,
    clearSelection,
    resetAll,
    getPinScreenPosition,
  } = usePoolMapSelection();

  // Show success screen after confirmation
  if (isConfirmed && savedLocation) {
    return <SuccessScreen savedLocation={savedLocation} onReset={resetAll} />;
  }

  const pinPosition = getPinScreenPosition();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 sm:py-6 border-b border-border bg-card shrink-0">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground text-center">
            Selecione sua mesa na piscina
          </h1>
          <p className="text-muted-foreground text-sm text-center mt-1">
            Toque na área verde para escolher sua posição
          </p>
        </div>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={3}
          centerOnInit
          wheel={{ step: 0.1 }}
          pinch={{ step: 5 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => zoomIn()}
                  className="shadow-lg"
                >
                  <ZoomIn className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => zoomOut()}
                  className="shadow-lg"
                >
                  <ZoomOut className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => resetTransform()}
                  className="shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>

              {/* Hint badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border">
                <Move className="w-3.5 h-3.5" />
                <span>Arraste para mover</span>
              </div>

              {/* Map */}
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center p-4"
              >
                <div 
                  className="relative w-full max-w-lg" 
                  ref={containerRef} 
                  onClick={handleMapClick}
                >
                  <PoolMapImage />
                  
                  {/* Selection Pin */}
                  {selection && pinPosition && (
                    <SelectionPin x={pinPosition.x} y={pinPosition.y} />
                  )}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Status Card */}
      <div className="shrink-0">
        <StatusCard
          selection={selection}
          onConfirm={confirmSelection}
          onClear={clearSelection}
        />
      </div>
    </div>
  );
};

export default Index;
