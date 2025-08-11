/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240 5% 10%)',
        text: 'hsl(0 0% 95%)',
        'text-secondary': 'hsl(0 0% 85%)',
        muted: 'hsl(0 0% 70%)',
        'muted-light': 'hsl(0 0% 60%)',
        accent: 'hsl(180 70% 50%)',
        'accent-light': 'hsl(180 70% 60%)',
        primary: 'hsl(240 80% 60%)',
        'primary-light': 'hsl(240 80% 70%)',
        surface: 'hsl(240 5% 15%)',
        'surface-light': 'hsl(240 5% 18%)',
        border: 'hsl(240 5% 20%)',
        success: 'hsl(142 76% 36%)',
        error: 'hsl(0 84% 60%)',
        warning: 'hsl(38 92% 50%)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(0, 0%, 0%, 0.1)',
        glow: '0 0 20px hsla(180, 70%, 50%, 0.3)',
        hover: '0 6px 20px hsla(0, 0%, 0%, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'bounce': 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
}
