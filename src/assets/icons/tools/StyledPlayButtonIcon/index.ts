import styled from "styled-components";
import {ReactComponent as PlayButtonIcon} from "./PlayButtonIcon.svg";

type PlayButtonIconProps = {
    circleBg: string,
    triangleBg: string
    circleBgHover: string,
    triangleBgHover: string
}

const StyledPlayButtonIcon = styled(PlayButtonIcon)`  
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    
    .st0-circleBg{
     fill: ${(props:PlayButtonIconProps) => props.circleBg}
    }
    
    .st0-tri{
      fill: ${(props:PlayButtonIconProps) => props.triangleBg}
    }
    
    &:active {
      opacity: 0.7;
    }
    
    &:hover .st0-circleBg{
      fill: ${(props:PlayButtonIconProps) => props.circleBgHover}
    }
    
    &:hover .st0-tri{
      fill: ${(props:PlayButtonIconProps) => props.triangleBgHover}
    }
`

export default StyledPlayButtonIcon;