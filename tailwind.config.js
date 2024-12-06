/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#069494',
  			primary100: '#cafdf7',
  			primary200: '#94fbf0',
  			primary300: '#57f1e7',
  			primary400: '#25dcd5',
  			primary500: '#0cc0bc',
  			modal: 'rgba(0, 0, 0, .8)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		animation: {
  			fadeIn: 'fadeIn 0.1s linear both',
  			modalSlideIn: 'modalSlideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) both'
  		},
  		keyframes: {
  			fadeIn: {
  				to: {
  					opacity: '1',
  					pointerEvents: 'initial'
  				}
  			},
  			modalSlideIn: {
  				to: {
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

