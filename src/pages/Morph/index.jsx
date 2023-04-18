import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    Button,
    FormControl,
    FormControlLabel,
    LinearProgress,
    Radio,
    RadioGroup, IconButton, Skeleton
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import useTheme from "@mui/material/styles/useTheme";
import TextField from "@material-ui/core/TextField";
import generateBg from "./generateBg.png"
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FileCopyIcon from '@mui/icons-material/FileCopy';

const GenerateSection = () =>{
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

    const theme = useTheme()

    const handleGenerate = async () => {

        try{
            setLoading(true)
            const res = await fetch(`http://35.91.230.70:8080/get_gif?prompt=${prompt}&model=${model} `, {
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
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant={"h5"} sx={{my: 2}}>What type of content do you want to generate?</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <Typography variant={"h5"} color={theme.palette.primary.main}> <FormControlLabel  value="GIF" control={<Radio />} label="" />GIF</Typography>
                            <Typography variant={"h5"} color={theme.palette.divider} > <FormControlLabel disabled value="FILM" control={<Radio />} label="" />FILM (coming soon)</Typography>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item container xs={12}>

                    <Button onClick={handleGenerate} sx={{my: 2, backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.text.secondary,
                        width: "100%", height: "3.75rem", ":hover":{
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.text.secondary,
                        },
                        ":active":{
                            color: theme.palette.action.active,
                            backgroundColor: theme.palette.action.active,
                        }}}>
                        <Typography variant={"h5"} style={{marginLeft: "10px"}}>Generate</Typography>
                    </Button>

            </Grid>
        </Grid>
        <Grid item container xs={12} sm={5.95}>
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
            <Grid item container xs={12} alignItems={"end"}>

                    <Button href={generatedGif} disabled={ generatedGif === null && true} sx={{my: 2, backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.text.secondary,
                        width: "100%", height: "3.75rem", ":hover":{
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.text.secondary,
                        },
                        ":active":{
                            color: theme.palette.action.active,
                            backgroundColor: theme.palette.action.active,
                        }}}>
                        <Typography variant={"h5"} style={{marginLeft: "10px"}}>Download</Typography>
                    </Button>
            </Grid>
        </Grid>
    </Grid>

}

const HomeTitle = () =>{
  return <Typography variant={"h2"}>Experience the future of Film-Making with AIGC.</Typography>
}

const ListTitle = () =>{
    return <Typography variant={"h2"}>Explore contents created by Morph AI Community.</Typography>
}

const ListRow = ({title, data}) =>{
    return <Grid container sx={{my:5}}>
        <Grid tiem xs={12} sx={{my:1 }}>
            <Typography variant={"h4"}>{title}</Typography>
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

    const fetchList = async () => {
        try{
            setLoadingList(true)
            const res = await fetch(`http://35.91.230.70:8080/get_examples`, {
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
    <HomeTitle />
    <GenerateSection />
     <ListTitle />

        {loadingList && <Grid container sx={{my: 5}}>
            <Grid item xs={12} sx={{my: 1}}>
                <Typography variant={"h5"}><Skeleton  sx={{width: "100px", height: "40px"}}/></Typography>
            </Grid>

            {[1, 2, 3, 4].map(each => {
                return <Grid item xs={12} sm={6} md={4} lg={3} height={"200px"} sx={{padding: "0.2rem"}}>
                    <Skeleton height={"100%"}/>
                </Grid>
            })}

            {[1, 2, 3, 4].map(each => {
                return <Grid item xs={12} sm={6} md={4} lg={3} sx={{padding: "0.2rem"}}>
                    <Skeleton height={200}/>
                </Grid>
            })}

            {[1, 2, 3, 4].map(each => {
                return <Grid item xs={12} sm={6} md={4} lg={3} sx={{padding: "0.2rem"}}>
                    <Skeleton height={200}/>
                </Grid>
            })}
        </Grid>}

     {
         list && Object.keys(list).map((key, index) => {

             return <ListRow title={key} data={list[key]}/>

         })
     }
 </>
}


export default MorphHome;