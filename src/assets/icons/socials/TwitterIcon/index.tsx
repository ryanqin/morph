import styled from "styled-components";
import {ReactComponent as Twitter} from "./TwitterLight.svg";

type TitterIconProps = {
    height: string,
    width: string,
    fill: string,
    hover?: string
}


const TitterIcon = styled(Twitter)`

    height: ${(props: TitterIconProps) => props.height};
    width: ${(props: TitterIconProps) => props.width};
    fill: ${(props: TitterIconProps) => props.fill};
    
    &:hover{
      fill: ${(props: TitterIconProps) => props.hover??props.fill};
    }

`

export default TitterIcon;
