import { Box } from '@mui/material'
import React from 'react'

const BoardContent = () => {
  return (
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
  )
}

export default BoardContent
