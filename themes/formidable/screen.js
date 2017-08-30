/*eslint-disable object-shorthand*/

const brand = {
  // black and its tints:
  black: '#242121', // black
  darkerGray: '#373534',
  darkGray: '#5f5c5b',
  gray: '#a19e9d',
  lightGray: '#e8e8e9',
  white: '#f1f1f2', // lightest gray
  // red and its tints:
  red: '#c43a31', // brand red
  darkestRed: '#cd5244',
  darkerRed: '#d56557',
  darkRed: '#dc7a6b',
  lightred: '#e58c7d',
  lighterRed: '#eb9f92',
  lightestRed: '#efb3a7',
  paleRed: '#f5c5bc',
  palerRed: '#f8d9d2',
  palestRed: '#f6ebe7', // palest red
  brown: '#797062',
  darkBrown: '#080808',
  yellowBrown: '#ACA37A',
  yellow: '#E6E655'
}

const colors = {
  primary: brand.yellow,
  secondary: brand.brown,
  tertiary: brand.yellowBrown,
  quartenary: brand.darkBrown
}

const fonts = {
  heading: "'Montserrat', sans-serif",
  body: "'Montserrat', serif",
  monospace:
    "'akkurta', 'Inconsolata', Consolas, 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', Monaco, Courier, monospace"
}

export default {
  colors: colors,
  fonts: fonts,
  global: {
    body: {
      background: colors.secondary,
      fontFamily: fonts.body,
      fontWeight: 'normal',
      fontSize: '2em',
      color: brand.white,
      overflow: 'hidden'
    },
    'html, body': {
      height: '100%'
    },
    '*': {
      boxSizing: 'border-box'
    }
  },
  fullscreen: {
    fill: colors.primary
  },
  controls: {
    prev: {
      position: 'absolute',
      top: '50%',
      left: 20,
      transform: 'translateY(-50%)',
      zIndex: 9999,
      background: 'none',
      border: 'none',
      outline: 0
    },
    prevIcon: {
      fill: brand.white
    },
    next: {
      position: 'absolute',
      top: '50%',
      right: 20,
      transform: 'translateY(-50%)',
      zIndex: 9999,
      background: 'none',
      border: 'none',
      outline: 0
    },
    nextIcon: {
      fill: brand.white
    }
  },
  progress: {
    pacman: {
      container: {
        position: 'absolute',
        bottom: '5px',
        left: '50%',
        transition: 'all 1s ease-in-out 0.2s',
        zIndex: 1000
      },
      pacman: {
        position: 'absolute',
        transition: 'left 0.3s ease-in-out 0.2s',
        width: '20px',
        height: '20px',
        transform: 'translate(-5px, -5px)'
      },
      pacmanTop: {
        position: 'absolute',
        content: '',
        width: '20px',
        height: '10px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        background: colors.quartenary
      },
      pacmanBottom: {
        position: 'absolute',
        content: '',
        width: '20px',
        height: '10px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        background: colors.quartenary,
        top: '10px'
      },
      point: {
        position: 'absolute',
        float: 'left',
        background: 'transparent',
        width: '10px',
        height: '10px',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: colors.quartenary,
        borderRadius: '50%',
        transition: 'all 0.01s ease-out 0.4s'
      }
    },
    bar: {
      container: {
        position: 'absolute',
        height: '10px',
        width: '100%',
        bottom: 0,
        left: 0,
        transition: 'all 1s ease-in-out 0.2s',
        zIndex: 1000
      },
      bar: {
        height: '100%',
        background: colors.quartenary,
        transition: 'all 0.3s ease-out'
      }
    },
    number: {
      container: {
        position: 'absolute',
        bottom: 20,
        right: 30,
        zIndex: 1000,
        color: colors.primary,
        fontFamily: fonts.monospace,
        letterSpacing: '-0.275em',
        fontSize: '1em'
      }
    }
  },
  components: {
    blockquote: {
      textAlign: 'left',
      position: 'relative',
      display: 'inline-block',
      margin: 20
    },
    quote: {
      borderLeft: `1px solid ${colors.primary}`,
      paddingLeft: 40,
      display: 'block',
      color: colors.primary,
      fontSize: '4.9rem',
      lineHeight: 1,
      fontWeight: 'bold'
    },
    cite: {
      color: colors.tertiary,
      display: 'block',
      clear: 'left',
      fontSize: '2rem',
      marginTop: '1rem'
    },
    content: {
      margin: '0 auto',
      textAlign: 'left'
    },
    codePane: {
      pre: {
        margin: 'auto',
        fontSize: '0.8rem',
        fontWeight: 'normal',
        fontFamily: fonts.monospace,
        height: '100%',
        minWidth: '100%',
        maxWidth: 800
      },
      code: {
        color: colors.primary,
        textAlign: 'left',
        fontFamily: fonts.monospace,
        fontWeight: 'normal'
      }
    },
    code: {
      color: 'black',
      fontSize: '2.66rem',
      fontFamily: fonts.monospace,
      margin: '0.25rem auto',
      backgroundColor: 'rgba(0,0,0,0.15)',
      padding: '0 10px',
      borderRadius: 3
    },
    heading: {
      h1: {
        color: colors.primary,
        fontSize: '7.05rem',
        fontFamily: fonts.heading,
        fontWeight: 600,
        letterSpacing: '0.175em',
        lineHeight: 1,
        textAlign: 'left',
        textTransform: 'uppercase',
        margin: '0 0 0 8%',
        zoom: 1
      },
      h2: {
        color: colors.primary,
        fontSize: '5.88rem',
        fontFamily: fonts.heading,
        fontWeight: 600,
        lineHeight: 1.2,
        margin: 0
      },
      h3: {
        color: colors.primary,
        fontSize: '4.9rem',
        fontFamily: fonts.heading,
        fontWeight: 600,
        lineHeight: 1.2,
        margin: '0.25rem auto'
      },
      h4: {
        color: colors.primary,
        fontSize: '3.82rem',
        fontFamily: fonts.heading,
        fontWeight: 600,
        lineHeight: 1.2,
        margin: '0.25rem auto'
      },
      h5: {
        color: colors.primary,
        fontSize: '3.19rem',
        fontFamily: fonts.heading,
        fontWeight: 600,
        lineHeight: 1.3,
        margin: '0.25rem auto'
      },
      h6: {
        color: colors.primary,
        fontSize: '2.66rem',
        fontFamily: fonts.heading,
        fontWeight: 600,
        lineHeight: 1.3,
        margin: '0.25rem auto'
      }
    },
    image: {
      display: 'block',
      margin: '0.5rem auto'
    },
    link: {
      textDecoration: 'none'
    },
    listItem: {
      fontSize: '2rem'
    },
    list: {
      textAlign: 'left',
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 'auto'
    },
    s: {
      strikethrough: {}
    },
    tableHeaderItem: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    tableItem: {
      fontSize: '2rem'
    },
    table: {
      width: '100%'
    },
    text: {
      color: brand.white,
      fontSize: '1.5rem',
      fontFamily: fonts.body,
      margin: '1.25rem auto',
      lineHeight: 1.5
    }
  }
}
