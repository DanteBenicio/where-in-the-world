interface ArrowBackProps {
  fillColor?: string
}

export default function ArrowBack({ fillColor }: ArrowBackProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 8H2.5"
        stroke={fillColor || '#A1A1AA'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 3.5L2.5 8L7 12.5"
        stroke={fillColor || '#A1A1AA'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
