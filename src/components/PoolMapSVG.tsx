import { forwardRef } from "react";

interface PoolMapSVGProps {
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const PoolMapSVG = forwardRef<SVGSVGElement, PoolMapSVGProps>(({ onClick }, ref) => {
  return (
    <svg
      ref={ref}
      onClick={onClick}
      id="Camada_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 595.28 841.89"
      className="w-full h-auto"
    >
      <defs>
        <style>
          {`
            .st0 {
              stroke-width: .25px;
            }
            .st0, .st1 {
              fill: #1d1d1b;
            }
            .st0, .st2, .st3 {
              stroke: #1d1d1b;
              stroke-miterlimit: 10;
            }
            .st1 {
              font-family: 'Inter', sans-serif;
              font-size: 12px;
            }
            .st2 {
              stroke-width: .5px;
            }
            .st2, .st3 {
              fill: none;
            }
            .st4 {
              opacity: .12;
            }
            .st4, .st5 {
              display: none;
            }
            .st6 {
              fill: #36a9e1;
            }
            .st7 {
              fill: #fff;
            }
            .st8 {
              fill: #95c11f;
              cursor: pointer;
              transition: filter 0.2s ease;
            }
            .st8:hover {
              filter: brightness(1.15);
            }
            .st9 {
              fill: #fcc570;
            }
          `}
        </style>
      </defs>
      
      {/* Pool Area */}
      <rect className="st6" x="142.52" y="295.31" width="310.24" height="251.27" rx="20" ry="20" />
      
      {/* Green Zone A - Left Side */}
      <polygon
        className="st8"
        data-sector="A"
        points="42.52 295.31 132.52 295.31 132.52 546.58 42.52 546.58"
      />
      
      {/* Green Zone B - Right Side */}
      <polygon
        className="st8"
        data-sector="B"
        points="462.76 295.31 552.76 295.31 552.76 546.58 462.76 546.58"
      />
      
      {/* Green Zone C - Top */}
      <polygon
        className="st8"
        data-sector="C"
        points="142.52 195.31 452.76 195.31 452.76 285.31 142.52 285.31"
      />
      
      {/* Green Zone D - Bottom */}
      <polygon
        className="st8"
        data-sector="D"
        points="142.52 556.58 452.76 556.58 452.76 646.58 142.52 646.58"
      />
      
      {/* Pool label */}
      <text className="st1" x="297.64" y="425" textAnchor="middle" fontSize="18" fill="#fff">
        PISCINA
      </text>
      
      {/* Sector Labels */}
      <text className="st1" x="87.52" y="425" textAnchor="middle" fontSize="14" fill="#fff">
        Setor A
      </text>
      <text className="st1" x="507.76" y="425" textAnchor="middle" fontSize="14" fill="#fff">
        Setor B
      </text>
      <text className="st1" x="297.64" y="245" textAnchor="middle" fontSize="14" fill="#fff">
        Setor C
      </text>
      <text className="st1" x="297.64" y="606" textAnchor="middle" fontSize="14" fill="#fff">
        Setor D
      </text>
      
      {/* Decorative Tables - Sector A */}
      <circle className="st7" cx="67.52" cy="340" r="12" opacity="0.6" />
      <circle className="st7" cx="107.52" cy="340" r="12" opacity="0.6" />
      <circle className="st7" cx="67.52" cy="400" r="12" opacity="0.6" />
      <circle className="st7" cx="107.52" cy="400" r="12" opacity="0.6" />
      <circle className="st7" cx="67.52" cy="460" r="12" opacity="0.6" />
      <circle className="st7" cx="107.52" cy="460" r="12" opacity="0.6" />
      <circle className="st7" cx="67.52" cy="520" r="12" opacity="0.6" />
      <circle className="st7" cx="107.52" cy="520" r="12" opacity="0.6" />
      
      {/* Decorative Tables - Sector B */}
      <circle className="st7" cx="487.76" cy="340" r="12" opacity="0.6" />
      <circle className="st7" cx="527.76" cy="340" r="12" opacity="0.6" />
      <circle className="st7" cx="487.76" cy="400" r="12" opacity="0.6" />
      <circle className="st7" cx="527.76" cy="400" r="12" opacity="0.6" />
      <circle className="st7" cx="487.76" cy="460" r="12" opacity="0.6" />
      <circle className="st7" cx="527.76" cy="460" r="12" opacity="0.6" />
      <circle className="st7" cx="487.76" cy="520" r="12" opacity="0.6" />
      <circle className="st7" cx="527.76" cy="520" r="12" opacity="0.6" />
      
      {/* Decorative Tables - Sector C */}
      <circle className="st7" cx="180" cy="220" r="12" opacity="0.6" />
      <circle className="st7" cx="240" cy="220" r="12" opacity="0.6" />
      <circle className="st7" cx="300" cy="220" r="12" opacity="0.6" />
      <circle className="st7" cx="360" cy="220" r="12" opacity="0.6" />
      <circle className="st7" cx="420" cy="220" r="12" opacity="0.6" />
      <circle className="st7" cx="180" cy="260" r="12" opacity="0.6" />
      <circle className="st7" cx="240" cy="260" r="12" opacity="0.6" />
      <circle className="st7" cx="300" cy="260" r="12" opacity="0.6" />
      <circle className="st7" cx="360" cy="260" r="12" opacity="0.6" />
      <circle className="st7" cx="420" cy="260" r="12" opacity="0.6" />
      
      {/* Decorative Tables - Sector D */}
      <circle className="st7" cx="180" cy="580" r="12" opacity="0.6" />
      <circle className="st7" cx="240" cy="580" r="12" opacity="0.6" />
      <circle className="st7" cx="300" cy="580" r="12" opacity="0.6" />
      <circle className="st7" cx="360" cy="580" r="12" opacity="0.6" />
      <circle className="st7" cx="420" cy="580" r="12" opacity="0.6" />
      <circle className="st7" cx="180" cy="620" r="12" opacity="0.6" />
      <circle className="st7" cx="240" cy="620" r="12" opacity="0.6" />
      <circle className="st7" cx="300" cy="620" r="12" opacity="0.6" />
      <circle className="st7" cx="360" cy="620" r="12" opacity="0.6" />
      <circle className="st7" cx="420" cy="620" r="12" opacity="0.6" />
      
      {/* Border */}
      <rect
        className="st3"
        x="32.52"
        y="185.31"
        width="530.24"
        height="471.27"
        rx="10"
        ry="10"
        strokeWidth="2"
      />
    </svg>
  );
});

PoolMapSVG.displayName = "PoolMapSVG";

export default PoolMapSVG;
