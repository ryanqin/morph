import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@mui/material/Button';
import  logo from "../../../src/assets/logo.png";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink, useLocation } from "react-router-dom";
import {Link, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";

import useSettings from "../../hooks/aboutSettings/useSettings";
// import MediumIcon from "../../assets/icons/socials/MediumIcon";
import GithubIcon from '../../assets/icons/socials/GithubIcon';
import DiscordIcon from "../../assets/icons/socials/DiscordIcon";
import TitterIcon from "../../assets/icons/socials/TwitterIcon";
import MirrorIcon from "../../assets/icons/socials/MirrorIcon";
import styled from "styled-components";
import WalletConnect from "../WalletConnect";
import InfoBanner from "../InfoBanner";

interface Props {
    window?: () => Window;
    children: React.ReactElement | React.ReactElement[];
}


const drawerWidth = 240;
const navItems = ['Meta Apps', 'zkGraph', 'Developers'];

type StyledMenuItemProps = {
    menuBackgroundColor: string
}

const StyledMenu = styled(Menu)`
     .MuiMenu-list{
      background-color: ${(props:StyledMenuItemProps)=>props.menuBackgroundColor} !important;
      padding: 16px 23px 16px 23px !important;
    }

    .MuiMenuItem-root{
      font-size: 0.75rem !important;
    }

    .MuiMenuItem-root:hover{
      text-decoration: underline !important;
      background-color: ${(props:StyledMenuItemProps)=>props.menuBackgroundColor} !important;
    }

`

export default function AppNavBar(props: Props) {
    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const {settings} = useSettings();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const socialItems = [
        {
            logo: <MirrorIcon fill={theme.palette.primary.main} height={"1.5rem"} width={"1.5rem"} hover={theme.palette.primary.contrastText}/>,
            link: 'https://mirror.xyz/hyperoracleblog.eth'
        },
        // {
        //     // logo: <Medium fill={theme.palette.primary.main}  height={"1.5rem"} width={"1.5rem"}/>,
        //     logo: <MediumIcon fill={theme.palette.primary.main} height={"1.5rem"} width={"1.5rem"} hover={theme.palette.primary.contrastText}/>,
        //     link: 'https://hyperoracle.medium.com/'
        // },
        {
            logo: <DiscordIcon fill={theme.palette.primary.main} height={"1.5rem"} width={"1.5rem"} hover={theme.palette.primary.contrastText}/>,
            link: 'https://discord.gg/MgyYbW9dQj'
        },
        {
            logo: <TitterIcon fill={theme.palette.primary.main} height={"1.5rem"} width={"1.5rem"} hover={theme.palette.primary.contrastText}/>,
            link: 'https://twitter.com/hyperoracle'
        },
        {
            // logo: <Github fill={theme.palette.primary.main}  height={"1.5rem"} width={"1.5rem"}/>,
            logo: <GithubIcon fill={theme.palette.primary.main} height={"1.5rem"} width={"1.5rem"} hover={theme.palette.primary.contrastText}/>,
            link: 'https://github.com/hyperoracle'
        }
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    let location = useLocation();

    return (
        <React.Fragment>
            <CssBaseline />
            <Toolbar style={{display: 'flex', width: "auto", alignItems: "center", marginTop: '32px', marginBottom: "32px"}}>
                            <Grid container justifyContent={"space-between"}>
                                <Grid item>
                                    <Typography
                                        variant="h2"
                                        style={{background: "linear-gradient(93.6deg, #33C1CB 8%, #58AFEE 100%)",backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text', color: 'transparent'}}
                                        sx={{display: { xs: 'none', sm: 'block'} }}
                                    >
                                        Morph AI
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <WalletConnect/>
                                </Grid>
                            </Grid>

            </Toolbar>
                <Box component="nav">
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Box>

            {/*<Box sx={{width: "100%", height: "62px", backgroundColor: location.state === "app" ? theme.palette.secondary.main : "transparent", display: "flex", alignItems: "center", justifyContent: "center"}}>*/}
            {/*    {location.state === "app" && <Typography color={theme.palette.primary.main} variant={"body2"}>*/}
            {/*        {"< "}*/}
            {/*        <span style={{color:theme.palette.primary.main}}>Warning: This is for demo purpose only. Do not use in production. zkWASM for generating zk proofs is currently under development.</span>*/}
            {/*        { " >"}*/}
            {/*    </Typography>}*/}
            {/*</Box>*/}

            <InfoBanner/>

            <Toolbar />
            <Container >
                {props.children}
            </Container>
        </React.Fragment>
    );
}
