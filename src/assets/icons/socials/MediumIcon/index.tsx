import styled from "styled-components";
import {ReactComponent as Medium} from "./MediumLight.svg";

type MediumIconProps = {
    height: string,
    width: string,
    fill: string,
    hover?: string
}


const MediumIcon = styled(Medium)`

    height: ${(props: MediumIconProps) => props.height};
    width: ${(props: MediumIconProps) => props.width};
    
    .mediumIcon{
       fill: ${(props: MediumIconProps) => props.fill};
       
       &:hover{
        fill: ${(props: MediumIconProps) => props.hover??props.fill};
        }
    }
    
`

export default MediumIcon;
