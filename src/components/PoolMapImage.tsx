import piscinaMap from "@/assets/piscina-mapa.jpg";

const PoolMapImage = () => {
  return (
    <div className="pool-map-image relative w-full h-auto">
      <img 
        src={piscinaMap} 
        alt="Mapa da área da piscina"
        className="w-full h-auto"
        draggable={false}
      />
      
      {/* SVG overlay for clickable green areas */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 489 537"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left green area - curved shape */}
        <polygon
          className="st8-area"
          data-sector="A"
          points="0,40 85,0 85,100 100,100 100,480 85,480 85,537 0,500"
          fill="transparent"
          style={{ cursor: "pointer" }}
        />
        
        {/* Right green area - curved shape */}
        <polygon
          className="st8-area"
          data-sector="B"
          points="400,30 489,70 489,470 400,510 400,480 385,480 385,100 400,100"
          fill="transparent"
          style={{ cursor: "pointer" }}
        />
      </svg>
    </div>
  );
};

export default PoolMapImage;
