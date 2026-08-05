import { BorderColor, Height } from '@mui/icons-material'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  trelloCustom:{
    appBarHeight: 58,
    boardBarHeight: 60
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  // ...other properties
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '': {
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: 'red',
              borderRadius: '8px'
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root:( { theme } ) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem', '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main
              }
            },
            '& fieldset': {
              borderWidth: '1px !important'
            }
          }
        }
      }
    }
  }
})

export default theme