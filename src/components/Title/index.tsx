import Typography, {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import * as React from "react";
import { useTheme } from "@mui/material";

type Props = {
    title: string,
    variant:OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
    style?: React.CSSProperties;
}
const Title = (props: Props) =>{
    const theme = useTheme()

    return <Box sx={{ textAlign: "left"}}>
        <Typography color={theme.palette.primary.main} variant={"h3"} style={{marginBottom: "1rem"}}> {"< >"} </Typography>
        <Typography color={theme.palette.primary.main} variant={props.variant}>{props.title}</Typography>
    </Box>

}

export default Title;