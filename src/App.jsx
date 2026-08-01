import Button from '@mui/material/Button'
import {
  useColorScheme
} from '@mui/material/styles'
import Container from '@mui/material/Container'
import { Box } from '@mui/material'



function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
      
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trelloCustom.boardBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Board bar
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          height: (theme) => `calc(100vh - ${theme.trelloCustom.appBarHeight}px - ${theme.trelloCustom.boardBarHeight}px)`,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Board content
      </Box>
    </Container>
  )
}