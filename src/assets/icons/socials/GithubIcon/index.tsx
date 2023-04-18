import styled from "styled-components";
import {ReactComponent as Github} from "./GithubLight.svg";

type GithubIconProps = {
    height: string,
    width: string,
    fill: string,
    hover?: string
}


const GithubIcon = styled(Github)`

    height: ${(props: GithubIconProps) => props.height};
    width: ${(props: GithubIconProps) => props.width};
        
   fill: ${(props: GithubIconProps) => props.fill};
   
   &:hover{
    fill: ${(props: GithubIconProps) => props.hover??props.fill};
    }
    
`

export default GithubIcon;
