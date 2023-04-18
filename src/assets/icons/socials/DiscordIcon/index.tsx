import styled from "styled-components";
import {ReactComponent as Discord} from "./DiscordLight.svg";

type DiscordIconProps = {
    height: string,
    width: string,
    fill: string,
    hover?: string
}


const DiscordIcon = styled(Discord)`

    height: ${(props: DiscordIconProps) => props.height};
    width: ${(props: DiscordIconProps) => props.width};
    
    .discordIcon{
        fill: ${(props: DiscordIconProps) => props.fill};
            
        &:hover{
            fill: ${(props: DiscordIconProps) => props.hover??props.fill};
        }
    }
`

export default DiscordIcon;
