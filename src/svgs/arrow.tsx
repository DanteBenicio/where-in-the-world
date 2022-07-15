interface ArrowIconProps {
  size?: string | number
  fillColor?: string
}

export default function ArrowIcon({ fillColor, size }: ArrowIconProps) {
  return (
    <svg
      width={size || '25px'}
      height={size || '25px'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          id="svg_1"
          d="m186.67439,248.8372l38,39"
          strokeWidth="3"
          stroke={fillColor || '#000000'}
          fill="none"
        />
        <line
          transform="rotate(91.0349 245.736 269.045)"
          stroke={fillColor || '#000000'}
          strokeWidth="3"
          id="svg_5"
          y2="288.54541"
          x2="264.73617"
          y1="249.54541"
          x1="226.73617"
          fill="none"
        />
        <path
          stroke={fillColor || '#000000'}
          id="svg_7"
          d="m225.173,289.15893c-0.84073,0 -1.52172,-0.62424 -1.52172,-1.39491c0,-0.77067 0.68099,-1.39491 1.52172,-1.39491c0.84073,0 1.52172,0.62424 1.52172,1.39491c0,0.77067 -0.68099,1.39491 -1.52172,1.39491z"
          fill={fillColor || '#000000'}
        />
      </g>
    </svg>
  );
}
