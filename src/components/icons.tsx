import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect
          x="10"
          y="30"
          width="80"
          height="60"
          rx="5"
          ry="5"
          fill="hsl(var(--primary))"
        />
        <rect x="20" y="40" width="20" height="15" fill="hsl(var(--background))" />
        <rect x="50" y="40" width="30" height="15" fill="hsl(var(--background))" />
        <rect x="20" y="65" width="30" height="15" fill="hsl(var(--background))" />
        <rect x="60" y="65" width="20" height="15" fill="hsl(var(--background))" />
        <path d="M 50,10 L 60,30 L 40,30 Z" fill="hsl(var(--accent))" />
      </g>
    </svg>
  ),
};
