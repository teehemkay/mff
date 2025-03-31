export default {
  content: ['./src/html/**/*.html'],
  theme: {
    extend: {
      margin: {
        '18px': '1.125rem',
        '27px': '1.688rem',
        '54px': '3.375rem',
        '72px': '4.5rem',
      },
      padding: {
        '60px': '3.75rem',
      },
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      EPGammaRegular: ['EPGammaRegular', 'Arial', 'sans-serif'],
      EPGammaBold: ['EPGammaBold', 'Arial', 'sans-serif'],
      EuropeaSemiBold: ['EuropeaSemiBold', 'Arial', 'sans-serif'],
      EuropeaMedium: ['EuropeaMedium', 'Arial', 'sans-serif'],
      EPGammaNarrowUltra: ['EPGammaNarrowUltra', 'Arial', 'sans-serif'],
      EPGammaNarrowExtraBold: ['EPGammaNarrowExtraBold', 'Arial', 'sans-serif'],
      EuropeaVar: ['EuropeaVar', 'Arial', 'sans-serif'],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      lg: [
        '1.125rem;',
        {
          /* 18px */ lineHeight: '1.75rem' /* 28px */,
        },
      ],
      '2sm': [
        '0.875rem;',
        {
          /* 22.5px */ lineHeight: '1.2rem' /* 28px */,
        },
      ],
      '2lg': [
        '1.406rem;',
        {
          /* 22.5px */ lineHeight: '1.75rem' /* 28px */,
        },
      ],
      '3lg': [
        '1.781rem;',
        {
          lineHeight: '2rem',
        },
      ],
      xl: '1.25rem',
      '2xl': [
        '1.5rem',
        {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        },
      ],
      'brand-title': [
        'clamp(1rem, 2vw + 1rem, 1.5rem)',
        {
          lineHeight: 'clamp(1rem, 2vw + 1rem, 1.5rem)',
        },
      ],
      'brand-title-page': [
        'clamp(1rem, 1.5vw + 1rem, 1.2rem)',
        {
          lineHeight: 'clamp(1rem, 1.5vw + 1rem, 1.2rem)',
        },
      ],
      '2.5xl': '2.197rem', // 35.15px
      '3xl': [
        '1.875rem',
        {
          lineHeight: '2.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        },
      ],
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      'etr-body-text': [
        '1.394rem;',
        {
          /* 22.5px */ lineHeight: '2.25rem' /* 28px */,
        },
      ],
    },
    colors: {
      transparent: 'transparent',
      white: {
        default: '#fff',
        lightWarningText: '#FFF3F2',
      },
      yellow: {
        default: '#FFF200',
        active: '#FDE021',
      },
      black: {
        default: '#1F1F1F',
        greydark: '#1E1E1F',
        heroDark: '#363636',
        heroGrey: '#919191',
        buttonHero: '#2B2D30',
        grey: '#505154',
        greymiddle: '#BFBFBF',
        greydefault: '#7A868E',
        greyBorder: '#BDBDBD',
        greyBG: '#D9D9D9',
        greyText: '#6E6E6E',
        greylight: '#D0D0CE',
        greylighter: '#F7F7F7',
      },
      blue: {
        default: '#004DA0',
        focus: '#1E6CFF',
        linkbody: '#024EA2',
        linkbodyhover: '#1E6CFF',
        utvBaseLine: '#1B9FD0',
        heroBlue: '#0C4DA2',
      },
      green: {
        default: '#008400',
      },
      red: {
        default: '#ED0100',
        warning: '#ce2d3c',
        bgFieldError: '#F9A3A3',
      },
    },
    screens: {
      sm: '480px',
      md: '650px',
      lg: '768px',
      xl: '1024px',
      xxl: '1176px',
    },
  },
};
