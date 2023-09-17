import { IconButton, Button } from "@mui/material"
import { FC } from "react"
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface Props {
    handleAutoFill: () => void
}

export const AutoFill:FC<Props> = ({handleAutoFill}) => {

  return (

    <>
    <IconButton
        sx={{mt:0.5, ml:0.5, display:{xs:'flex', sm:'none'}}}
        onClick={handleAutoFill}
    >
        <AutorenewIcon/>
    </IconButton>
    <Button
        sx={{mt:0.5, ml:0.5, display:{xs:'none', sm:'flex'}}}
        variant="outlined"
        onClick={handleAutoFill}
    >
        Autocompletar
    </Button>
  </>
  )
}
