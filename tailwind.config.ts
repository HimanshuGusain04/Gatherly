import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  				colors: {
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			},
			// Custom color palette
			sage: {
				DEFAULT: '#7DB991',
				50: '#E8F5ED',
				100: '#D1EBD9',
				200: '#A3D7B4',
				300: '#7DB991',
				400: '#5CA372',
				500: '#4A8A5C',
				600: '#3A6B47',
				700: '#2B5036',
				800: '#1C3524',
				900: '#0E1A12'
			},
			teal: {
				DEFAULT: '#537B7D',
				50: '#E6EEEF',
				100: '#CDDCDE',
				200: '#9BB9BC',
				300: '#69969B',
				400: '#537B7D',
				500: '#42626F',
				600: '#344E55',
				700: '#263A3C',
				800: '#182728',
				900: '#0C1314'
			},
			cream: {
				DEFAULT: '#EEE7DA',
				50: '#FDFCFA',
				100: '#FAF8F3',
				200: '#F5F1E7',
				300: '#EEE7DA',
				400: '#E2D5C2',
				500: '#D5C2A8',
				600: '#C2A788',
				700: '#A8886A',
				800: '#8A6E52',
				900: '#6B553F'
			},
			amber: {
				DEFAULT: '#FCCE77',
				50: '#FEF9ED',
				100: '#FDF2DB',
				200: '#FBE5B7',
				300: '#FDD893',
				400: '#FCCE77',
				500: '#F9BD4A',
				600: '#F5A623',
				700: '#D18A0D',
				800: '#A56B0A',
				900: '#794F08'
			}
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};

export default config; 