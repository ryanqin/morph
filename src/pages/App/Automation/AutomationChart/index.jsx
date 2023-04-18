import * as React from "react";
import useAutomation from "../../../../hooks/aboutAutomation/useAutomation";
import {Line} from "react-chartjs-2";
import annotationPlugin from 'chartjs-plugin-annotation';
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement, Title,
    Tooltip,
} from 'chart.js';
import backgroundPlugin from "../../../../utils/chart/backgroundPlugin";
import {Grid} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useSettings from "../../../../hooks/aboutSettings/useSettings";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    annotationPlugin, backgroundPlugin
);


const AutomationChart = () =>{

    const {automationGetter} = useAutomation();
    const theme = useTheme();
    const {settings} = useSettings();

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    display: false,
                    padding: 0,
                },
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
            y: {
                ticks: {
                    display: false,
                    beginAtZero: true,
                    padding: 0,
                },
                grid: {
                    drawBorder: false,
                    display: false,
                },
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
        },
        plugins: {
            // annotation: {
            //     annotations: [{
            //         id: "slo",
            //         type: 'line',
            //         mode: 'horizontal',
            //         value: thresholdGetter,
            //         scaleID: "y",
            //         borderWidth: 2,
            //         borderDash: [10, 5],
            //         label: {
            //             display: true,
            //             enabled: true,
            //             content: `threshold ${thresholdGetter}`,
            //             position: 'start',backgroundColor:  "transparent",
            //             textAlign: "center"
            //         }
            //     }
            //     ]
            // },
            // background: {
            //     color:  "#2F4253"
            // }
        },
    }

    return  <Grid container item xs={9} style={{backgroundColor: "#2F4253"}} direction={"column"}>
        <Grid container item xs={2} style={{ padding: "0 1rem", borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}} alignContent={"center"}>
            <Grid item>
                <Typography sx={{backgroundColor: theme.palette.error.main, borderRadius: "50%", height: "1rem", width: "1rem", textAlign: "center"}} color={theme.palette.primary.main}/>
            </Grid>
            <Grid item style={{paddingLeft: "1rem"}}>
                <Typography sx={{backgroundColor: theme.palette.warning.main, borderRadius: "50%", height: "1rem", width: "1rem", textAlign: "center"}} color={theme.palette.primary.main}/>
            </Grid>
            <Grid item style={{paddingLeft: "1rem"}}>
                <Typography sx={{backgroundColor: theme.palette.success.main, borderRadius: "50%", height: "1rem", width: "1rem", textAlign: "center"}} color={theme.palette.primary.main}/>
            </Grid>
        </Grid>
        <Grid container item xs={10} >
            <Grid item xs={12}>
                <Line height={"100%"} width={"100%"} data={{
                    labels: automationGetter.blockNum,
                    datasets: [
                        {
                            label: 'price',
                            data: automationGetter.price,
                            borderColor: automationGetter.is_trigger.map(each => each ? "#88d109" : "white"),
                            backgroundColor:  automationGetter.is_trigger.map(each => each ? "#88d109" : "white"),
                        }
                    ]
                }} options={options}/>
            </Grid>
        </Grid>
    </Grid>

}

export default AutomationChart;
