import Button from "@mui/material/Button/Button";
import Link from "@mui/material/Link/Link";
import {Link as RouterLink} from "react-router-dom";
import linkArrow from "../../../assets/linkarrow.svg";
import useTheme from "@mui/material/styles/useTheme";

interface ButtonSeconProps{
    text: string,
    arrow?: boolean,
    to: {
        link: string,
        isInternal: boolean,
    },
}


const ButtonSecond = (props: ButtonSeconProps) =>{
    const theme = useTheme()

    return <Link underline={"none"} color="textPrimary" component={props.to.isInternal?RouterLink:Link}
                          href={props.to.isInternal?undefined:props.to.link}
                          to={{ pathname: props.to.isInternal?props.to.link:undefined }}
                          target={!props.to.isInternal?"_blank":undefined} rel={!props.to.isInternal?"noopener noreferrer":undefined}>
        <Button  sx={{ borderRadius: "0",
            backgroundColor: theme.palette.secondary.main,
            padding: "1rem 1rem",
            color: theme.palette.text.secondary,
            ":hover":{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.text.secondary,
            },
            ":active":{
                color: theme.palette.action.active,
                backgroundColor: theme.palette.action.active,
            }
        }} variant={"text"}>
            {props.text}
            {
                props.arrow? <img src={linkArrow} alt={"arrow"} style={{ margin: "6px 0 6px 6px",
                    width: "8px",
                    height: "8px"}}/>:""
            }
        </Button>
    </Link>

}


export default ButtonSecond;