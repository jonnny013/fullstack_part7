import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { useState } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import WebIcon from '@mui/icons-material/Web'
import MenuBookIcon from '@mui/icons-material/MenuBook'


const Footer = () => {
  const onClick = (website) => {
    window.open(website, '_blank')
  }


  return (
    <Box>
      <BottomNavigation
        showLabels
        sx={{
          bgcolor: 'transparent',
          height: 'fit-content',
          alignItems: 'center',
          padding: 2,
          '& .MuiBottomNavigationAction-root, .Mui-selected, svg': {
            color: '#007A78',
            fontSize: 25,
          },
          '& .MuiBottomNavigationAction-label,': {
            fontSize: 15,
          },
        }}
      >
        <BottomNavigationAction
          label='Course Info'
          icon={<MenuBookIcon />}
          onClick={() => onClick('https://fullstackopen.com/en/')}
        />
        <BottomNavigationAction
          label='My Portfolio'
          icon={<WebIcon />}
          onClick={() => onClick('https://jon-love-portfolio.fly.dev')}
        />
        <BottomNavigationAction
          label='Source Code'
          icon={<GitHubIcon />}
          onClick={() => onClick('https://github.com/jonnny013/fullstack_part7')}
        />
      </BottomNavigation>
    </Box>
  )
}

export default Footer
