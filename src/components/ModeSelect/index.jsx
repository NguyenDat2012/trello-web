import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleModeChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleModeChange}
      >
        <MenuItem value="light">
          <div style={{display: 'flex', alignItems: 'center', gap: 3 }}>
            <LightModeIcon fontSize='small' />
            Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <div style={{display: 'flex', alignItems: 'center', gap: 3 }}>
            <DarkModeIcon fontSize='small' />
            Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          <div style={{display: 'flex', alignItems: 'center', gap: 3 }}>
            <SettingsBrightnessIcon fontSize='small'/>
            System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
