import Box from "@mui/material/Box";
import LinkCard from "../LinkCard";
import MediumIcon from "../../assets/icons/socials/MediumIcon";
import DiscordIcon from "../../assets/icons/socials/DiscordIcon";
import CommunityModal from "../CommunityModal";
import { useTheme } from "@mui/material";

const News = () =>{
  const theme = useTheme();

  return (
    <Box sx={{display: "flex", marginTop: "180px", flexDirection: "row", justifyContent:"space-between"}}>
      <LinkCard
          buttonType={"first"}
          to={{link: "https://mirror.xyz/hyperoracleblog.eth/qbefsToFgFxBZBocwlkX-HXbpeUzZiv2UB5CmxcaFTM", isInternal: false, linkText: "A Programmable zkOracle Network"}}
          tag={{type: "logo", logo: <MediumIcon fill={theme.palette.primary.main} height={"1.5rem"} width={"1.5rem"}/>}}
          title={'Latest Blog Post'}
      />
      <CommunityModal title={"Join us"} tag={{type: "logo", logo: <DiscordIcon fill={theme.palette.primary.main} height={"1.5rem"} width={"1.5rem"}/>}} disableFocusRipple hasPadding={false} linkText={"Learn more about our community"} />
    </Box>
  )
}

export default News;
