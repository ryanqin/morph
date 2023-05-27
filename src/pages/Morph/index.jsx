import * as React from "react";
import { Grid, Typography, Button, Radio, RadioGroup, IconButton, Skeleton, useMediaQuery, FormControlLabel, LinearProgress, } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import useTheme from "@mui/material/styles/useTheme";
import TextField from "@material-ui/core/TextField";
import generateBg from "./generateBg.png";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RainEffect from "../../utils/rainEffect";
import Divider from "@mui/material/Divider";
import RainEffectSmall from "../../utils/rainEffectSmall";
import Link from "@mui/material/Link/Link";

const GenerateSection = () =>{
    const theme = useTheme()
    const model = "checkpoint-200";
    const [value, setValue] = useState('GIF');
    let inputRef = useRef();
    const [height, setHeight] = useState(0);
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false);
    const [generatedGif, setGeneratedGif] = useState(null);

    useEffect(() => {
        if (!inputRef?.current?.clientHeight) {
            return;
        }
        setHeight(inputRef?.current?.clientHeight);
    }, [inputRef?.current?.clientHeight]);


    const handleChange = (event ) => {
        setValue(event.value)
    };

    const handleGenerate = async () => {

        try{
            setLoading(true)
            const res = await fetch(`https://themorph.link/get_gif?prompt=${prompt}&model=${model} `, {
                method: "GET",
            })
            const data = await res.json();
            if(res.status === 200){
                console.log(data)
                setGeneratedGif(data["gif"])
            }

        }catch (e) {
            setLoading(false)
            console.log(e)
        }
        setLoading(false)
    }

    const handleShareClick = () => {
        const tweetText = encodeURIComponent(`Check out my awesome GIF created By Morph Ai! Prompt: ${prompt}`);
        const url = encodeURIComponent("https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif");
        const hashtags = encodeURIComponent('MyGifGenerator,Morph Ai, AIGC');

        const twitterShareURL = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}&hashtags=${hashtags}`;

        const twitterImageMetaTag = document.querySelector('meta[name="twitter:image"]');
        if (twitterImageMetaTag) {
            twitterImageMetaTag.setAttribute('content', "https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif");
        }

        window.open(
            twitterShareURL,
            'Share on Twitter',
            'width=600,height=300,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0'
        );
    };

    const isMobile = useMediaQuery("(max-width:600px)");


    return <Grid container sx={{my: 8}} xs={12} justifyContent={"space-between"}>
        <Grid item container xs={12} sm={5.95}>
            <Grid item xs={12}>
                <TextField ref={inputRef}
                    padding={2}
                    id="outlined-multiline-static"
                    color={ "info"}
                    sx={{
                        input: {
                            color: theme.palette.secondary.contrastText
                        }
                    }}
                    hiddenLabel
                    multiline
                    fullWidth
                    rows={15} value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    placeholder={"Describe the video you want to generate, as detail as possible."}
                />
            </Grid>
        </Grid>

        {
            !isMobile &&  <Grid item container xs={12} sm={5.95}>
                <Grid item  xs={12} sx={{ height: `${height}px`, backgroundImage: `url(${generateBg})`,  backgroundSize: "cover"}}>
                    { loading &&     <Stack sx={{ width: '100%', color: 'grey.800' }} spacing={2}>
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                    </Stack> }
                    { !loading && generatedGif &&  <img src={generatedGif} height={"100%"} width={"100%"} style={{padding: "1.5rem"}}/>}
                </Grid>
            </Grid>
        }

        <Grid item container xs={12}>
            <Grid item container xs={12}>
                <Grid item xs={12} sx={{mt: 2}}>
                    <Typography variant={"h4"} color={theme.palette.primary.main}>Length</Typography>
                </Grid>
                <Grid item conatiner xs={12} sx={{my: 2}}>
                    <RadioGroup veritical={isMobile} row={!isMobile}>

                                <Typography variant={"h5"} style={{marginLeft: isMobile ? "2rem" : ""}} > <FormControlLabel control={<Radio />} label="" />GIF</Typography>

                                <Typography variant={"h6"}  style={{marginLeft: "2rem"}}  color={theme.palette.divider}> <FormControlLabel value={"film_30"}  disabled control={<Radio size={"small"}/>} label="" />30s Film(coming soon)</Typography>

                                <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"film_60"} disabled control={<Radio size={"small"}/>} label="" />1 min Film(coming soon)</Typography>

                                <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"film_10_mins"} disabled  control={<Radio size={"small"}/>} label="" />10 mins Film(coming soon)</Typography>

                                <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"film_1_hr"} disabled  control={<Radio size={"small"}/>} label="" />1 Hour Film(coming soon)</Typography>

                    </RadioGroup>
                </Grid>
            </Grid>

            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant={"h4"} color={theme.palette.primary.main}>Quality</Typography>
                </Grid>
                <Grid item xs={12} sx={{my: 2}}>
                    <RadioGroup veritical={isMobile} row={!isMobile}>
                        <Typography variant={"h5"} style={{marginLeft: isMobile ? "2rem" : ""}}> <FormControlLabel  control={<Radio />} label="" />Basic</Typography>
                        <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"q_240"}  disabled control={<Radio size={"small"}/>} label="" />240P(coming soon)</Typography>
                        <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"q_360"}  disabled  control={<Radio size={"small"}/>} label="" />360P(coming soon)</Typography>
                        <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"q_720"}  disabled  control={<Radio size={"small"}/>} label="" />720P(coming soon)</Typography>
                        <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"q_1080"}  disabled control={<Radio size={"small"}/>} label="" />1080P(coming soon)</Typography>
                        <Typography variant={"h6"}  style={{marginLeft: "2rem"}} color={theme.palette.divider}> <FormControlLabel value={"q_4k"}  disabled  control={<Radio size={"small"}/>} label="" />4k(coming soon)</Typography>
                    </RadioGroup>
                </Grid>
            </Grid>

        </Grid>

        <Grid item container xs={12} sx={{my: 5}}>
            <Grid item xs={12} md={6}  sx={{paddingRight: isMobile? "" :  "0.5rem"}}>
                <Button onClick={handleGenerate} sx={{my: 2,
                    width: "100%", height: "3.75rem",
                }}>
                    <Typography variant={"h5"} style={{marginLeft: "10px"}}>Generate</Typography>
                </Button>

            </Grid >

            {
                isMobile &&  <Grid item container xs={12} sm={6}>
                    <Grid item  xs={12} sx={{ height: `${height}px`, backgroundImage: `url(${generateBg})`,  backgroundSize: "cover"}}>
                        { loading &&     <Stack sx={{ width: '100%', color: 'grey.800' }} spacing={2}>
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                        </Stack> }
                        { !loading && generatedGif &&  <img src={generatedGif} height={"100%"} width={"100%"} style={{padding: "1.5rem"}}/>}
                    </Grid>
                </Grid>
            }

            <Grid item xs={12} md={3}  sx={{paddingLeft: isMobile? "" :  "0.5rem"}}>
                <Button href={generatedGif} disabled={ generatedGif === null && true} sx={{my: 2,
                    width: "100%", height: "3.75rem"}}>
                    <Typography variant={"h5"} style={{marginLeft: "10px"}}>Download</Typography>
                </Button>
            </Grid>

            <Grid item xs={12} md={3}  sx={{paddingLeft: isMobile? "" :  "0.5rem"}}>
                <Button onClick={handleShareClick} disabled={ generatedGif === null && true} sx={{my: 2,
                    width: "100%", height: "3.75rem"}}>
                    <Typography variant={"h5"} style={{marginLeft: "10px"}}>Share on Twitter</Typography>
                </Button>
            </Grid>
        </Grid>
    </Grid>

}

const HomeTitle = () =>{
  return <Typography variant={"h2"} style={{background: "linear-gradient(270.5deg, #61E9F2 0.18%, #17E6CA 104.52%)",backgroundClip: 'text',
      WebkitBackgroundClip: 'text', color: 'transparent'}}>Experience the future of Film-Making with AIGC.</Typography>
}

const ListTitle = () =>{
    return <Typography variant={"h2"}  style={{background: "linear-gradient(270.5deg, #61E9F2 0.18%, #17E6CA 104.52%)",backgroundClip: 'text',
        WebkitBackgroundClip: 'text', color: 'transparent'}}>Explore contents created by Morph AI Community.</Typography>
}

const ListRow = ({title, data}) =>{
    const theme = useTheme();

    return <Grid container sx={{my:5}}>
        <Grid tiem xs={12} sx={{my:1 }}>
            <Typography variant={"h4"} color={theme.palette.primary.main}>{title}</Typography>
        </Grid>
        {
            data.map((item, index) => {
                return <Grid item container xs={12} sm={6} md={4} lg={3} sx={{height: "348px", position: 'relative', padding: "0.5rem"}}>
                        <img src={item.url} alt={item.title} style={{ width: '100%', height: 'auto' }} />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "100%", with: "100%",
                                background: 'rgba(0, 0, 0, 0.7)',
                                color: '#fff',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: "column",
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                                opacity: 0,
                                transition: 'opacity 0.2s ease-in-out',
                                '&:hover': {
                                    opacity: 1
                                }
                            }}
                        >
                            <Box>
                                <Typography variant="h5">
                                    {item.prompt}
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={()=> navigator.clipboard.writeText(item.prompt)} size="small">
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>


                        </Box>
                </Grid>
            })
        }

    </Grid>
}

const MorphHome = () =>{
    const [list, setList] = useState(null)
    const [loadingList, setLoadingList] = useState(false);
    const theme = useTheme();

    const fetchList = async () => {
        try{
            setLoadingList(true)
            const res = await fetch(`https://themorph.link/get_examples`, {
                method: "GET",
            })
            const data = await res.json();
            if(res.status === 200){
                console.log(data)
                setList(data)
            }

        }catch (e) {
            setLoadingList(false)
            console.log(e)
        }
        setLoadingList(false)
    }


    useEffect(()=>{
        fetchList()
    }, [])

    return <>
        <Grid container sx={{marginTop: "90vh"}}>
            <Grid item container xs={12} sx={{marginBottom: 5 }}>
                <Grid item xs={12}>
                    <Typography variant={"h2"}>About</Typography>
                </Grid>

                <Grid item container xs={12} sx={{margin: "3rem 0 0 0"}} gap={2}>
                    <Grid item>
                        <Typography variant={"body2"}>Morph Studio is an independent research lab, blazing trails at the intersection of human imagination, cognition, and text-to-video technology. Our mission is to navigate and unlock new mediums of thought, ceaselessly dedicated to expanding the faculties of the human species.</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"}>We are not just predicting the future, but actively shaping it. Join Morph Studio on this thrilling exploration. </Typography>
                    </Grid>
                </Grid>

                <Grid item container xs={12} sx={{margin: "3rem 0 0 0"}} gap={2}>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>Team</Typography>
                    </Grid>
                    <Grid item container xs={12} gap={2}>
                        <Grid item>
                            <Typography variant={"body2"}>Huaizhe</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>Hualiang</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>Zixin</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>Deyu</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container xs={12} sx={{margin: "3rem 0 0 0"}} gap={2}>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>Careers</Typography>
                    </Grid>
                    <Grid item container xs={12} gap={2}>
                        <Grid item>
                            <Typography variant={"body2"}>At Morph Studio, we're always on the lookout for individuals who are ready to challenge the status quo and drive innovation.</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>We offer an intellectually stimulating environment, a culture that values curiosity and bold ideas, and the opportunity to work on groundbreaking technology that's changing the face of communication.</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>Be a part of Morph Studio, where every day is a journey of discovery and innovation. Join us in pushing the boundaries of what's possible.</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container xs={12} sx={{margin: "3rem 0 0 0"}} gap={2}>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>Contact</Typography>
                    </Grid>
                    <Grid item container xs={12} gap={2}>
                        <Grid item>
                            <Typography variant={"body2"}>email: contact@morphai.studio</Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <RainEffectSmall/>

            <Grid item container alignItems={"center"} sx={{marginTop: 5 }} xs={12} flexDirection={"column"} flexWrap={"nowrap"}>
                <Grid item xs={12}>
                    <Typography variant={"h2"}> Join our community</Typography>
                </Grid>
                <Grid item xs={12} sx={{my: 2}}>
                    <Link underline={"none"} color="textPrimary" component={Link}
                          href={"https://yb754l5gojp.typeform.com/to/LI93PTO4"}
                          target={"_blank"}
                          rel={"noopener noreferrer"}>
                        <Button>Waiting list</Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
 </>
}


export default MorphHome;
