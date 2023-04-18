import Button from "@mui/material/Button/Button";
import Link from "@mui/material/Link/Link";
import useTheme from "@mui/material/styles/useTheme";
import linkArrow from "../../../assets/linkarrow.svg";
import {Link as RouterLink} from "react-router-dom";


type ButtonFirstProps = {
    text: string
    to: {
      link: string,
      isInternal: boolean,
    },
    textColor?: string,
    noArrow?: boolean
}

const ButtonFirst = (props: ButtonFirstProps) =>{
    const theme = useTheme()

    return <Link underline={"none"} color="textPrimary" component={props.to.isInternal?RouterLink:Link}
                 href={props.to.isInternal?undefined:props.to.link}
                 to={{ pathname: props.to.isInternal?props.to.link:undefined }}
                 target={!props.to.isInternal?"_blank":undefined} rel={!props.to.isInternal?"noopener noreferrer":undefined}>
        <Button disableRipple sx={{ borderRadius: "0",
            backgroundColor: "transparent",
            padding: "0",
            color: props.textColor??theme.palette.text.secondary,
            ':active':{
                color: theme.palette.action.active,
            },
            ':hover':{
                backgroundColor: "transparent",
            }
        }} variant={"text"}>
            {props.text}
            {!props.noArrow ? <img src={linkArrow} alt={"arrow"} style={{ margin: "6px 0 6px 6px",
                width: "8px",
                height: "8px"}}/> : "" }

        </Button>
    </Link>

}


export default ButtonFirst;