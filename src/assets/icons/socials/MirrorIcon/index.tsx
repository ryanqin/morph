import styled from "styled-components";
import {ReactComponent as Mirror} from "./MirrorLight.svg";

type MirrorIconProps = {
    height: string,
    width: string,
    fill: string,
    hover?: string
}


const MirrorIcon = styled(Mirror)`

    height: ${(props: MirrorIconProps) => props.height};
    width: ${(props: MirrorIconProps) => props.width};
    
    .mirrorIcon{
       fill: ${(props: MirrorIconProps) => props.fill};
                   
        &:hover{
            fill: ${(props: MirrorIconProps) => props.hover??props.fill};
        }
    }
     
`

export default MirrorIcon;
