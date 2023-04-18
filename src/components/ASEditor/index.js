import Grid from "@mui/material/Grid";
import Editor from "@monaco-editor/react"
import loader from "@monaco-editor/loader";
import asc from "assemblyscript/dist/asc.js";
import { config as watLanguageConfig, tokens as watLanguageTokens } from "./scripts/wat";
import Typography from "@mui/material/Typography";
import useASEditor from "../../hooks/aboutASEditor/useASEditor";
import {useTheme} from "@mui/material";
import StyledPlayButtonIcon from "../../assets/icons/tools/StyledPlayButtonIcon";


loader.init().then(monaco => {
    monaco.languages.register({ id: 'wat' })
    monaco.languages.setLanguageConfiguration('wat', watLanguageConfig)
    monaco.languages.setMonarchTokensProvider('wat', watLanguageTokens)

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
        asc.definitionFiles.assembly,
        "assemblyscript/std/assembly/index.d.ts"
    )
});

// Common editor options
const commonEditorOptions = {
    value: '',
    theme: 'vs-wasm',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    tabSize: 2,
    fontSize: 13,
    fontLigatures: true,
    padding: {
        bottom: 18,
        top: 18
    },
    scrollbar: {
        alwaysConsumeMouseWheel: false
    },
    minimap: {
        enabled: false
    },
    matchBrackets: 'near',
    renderLineHighlight: 'none',
    cursorStyle: 'line-thin',
    cursorBlinking: 'smooth'
}

// compile option
const getCompilerOptions = (tsModule) => {
    const options = [];
    options.push('--optimize');
    options.push('--noAssert');
    options.push('--exportRuntime');
    options.push('--disable', 'bulk-memory');
    options.push('--use', 'abort=module/abort');
    options.push('--target', 'release');
    options.push('--runtime', 'stub');
    return options
}

let module_wast = '(module)\n'
let module_wasm = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0])
let module_js = '\n';

const ASEditor = () =>{

    const theme = useTheme();

    const {asEditorTabSwitcher, asEditorCodeUpdater, asEditorCurrentTabGetter, asEditorGetter} = useASEditor()

    const handleValueChange = (value, tab)=>{
        console.log(value, asEditorCurrentTabGetter)
        asEditorCodeUpdater(value, tab)
    }

    const compile = () =>{

        const tsModule = 'module.ts'
        const jsModule = 'module.js'
        const textModule = `module.'wast'`
        const wasmModule = 'module.wasm'

        const stdout = asc.createMemoryStream()
        const sources = {
            'module.ts': asEditorGetter["module"] +  asEditorGetter["library"]
        }
        const outputs = {}
        const config = {
            stdout,
            stderr: stdout,
            readFile: name => Object.prototype.hasOwnProperty.call(sources, name) ? sources[name] : null,
            writeFile: (name, contents) => { outputs[name] = contents },
            listFiles: () => []
        }
        const options = [
            tsModule,
            '--textFile', textModule,
            '--outFile',  wasmModule,
            '--bindings', 'raw',
            ...getCompilerOptions(tsModule)
        ]
        asc.main(options, config).then(({ error, stdout }) => {
            let output = stdout.toString().trim()
            if (output.length) {
                output = ';; ' + output.replace(/\n/g, '\n;; ') + '\n'
            }
            output = ';; INFO asc ' + options.join(' ') + '\n' + output
            if (error) {
                asEditorCodeUpdater(output + `(module\n ;; FAILURE ${error.message}\n)\n`, "compile")
            } else {
                module_wast = outputs[textModule]
                module_wasm = outputs[wasmModule]
                module_js   = outputs[jsModule]
                asEditorCodeUpdater(output + module_wast, "compile")
                asEditorCodeUpdater(module_wasm, "moduleWasm")
            }
        })
    }

    return <Grid item container direction={"column"} style={{flexWrap: "nowrap"}}>
        <Grid item container style={{backgroundColor:"#252526", borderBottom: "0.5px solid black"}}>
            <Grid item style={{margin: "0.5rem 0.5rem 0.5rem 1.5rem", backgroundColor: theme.palette.error.main, borderRadius: "50%", height: "1rem", width: "1rem"}}></Grid>
            <Grid item style={{margin: "0.5rem 0.5rem", backgroundColor: theme.palette.warning.main, borderRadius: "50%", height: "1rem", width: "1rem"}}></Grid>
            <Grid item style={{margin: "0.5rem 0.5rem", backgroundColor: theme.palette.success.main, borderRadius: "50%", height: "1rem", width: "1rem"}}></Grid>
        </Grid>
        <Grid item container xs={1} style={{backgroundColor: "#2d2d2d"}} justifyContent={"space-between"} alignItems={"center"}>
            <Grid item container xs={8} style={{height: "100%"}}>
                <Grid item container xs={4} alignItems={"center"}  style={{padding: "0.2rem 1.5rem", cursor: "pointer", backgroundColor: asEditorCurrentTabGetter === "module" ? "#1e1e1e" : "transparent",
                    filter: asEditorCurrentTabGetter === "module" ? "" : "grayscale(100%)" }} onClick={()=>asEditorTabSwitcher("module")}>
                    <img height={"20px"} alt={"module_logo"}  src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmZpbGVfdHlwZV90eXBlc2NyaXB0X29mZmljaWFsPC90aXRsZT48cG9seWdvbiBwb2ludHM9IjIgMTYgMiAzMCAxNiAzMCAzMCAzMCAzMCAxNiAzMCAyIDE2IDIgMiAyIDIgMTYiIHN0eWxlPSJmaWxsOiMwMDdhY2MiLz48cGF0aCBkPSJNMjQuNTY0LDE0Ljg4NGEzLjQ4NSwzLjQ4NSwwLDAsMSwxLjc1MSwxLjAwOSw0LjYxMSw0LjYxMSwwLDAsMSwuNjcxLjljLjAwOS4wMzYtMS4yMDkuODUzLTEuOTQ3LDEuMzExLS4wMjcuMDE4LS4xMzMtLjEtLjI1My0uMjc2YTEuNTg3LDEuNTg3LDAsMCwwLTEuMzE2LS43OTFjLS44NDktLjA1OC0xLjQuMzg3LTEuMzkxLDEuMTI5YTEuMDI3LDEuMDI3LDAsMCwwLC4xMi41MjRjLjE4Ny4zODcuNTMzLjYxOCwxLjYyMiwxLjA4OSwyLC44NjIsMi44NjIsMS40MzEsMy40LDIuMjRhNC4wNjMsNC4wNjMsMCwwLDEsLjMyNCwzLjQxMywzLjc1MywzLjc1MywwLDAsMS0zLjEsMi4yMTgsOC41ODQsOC41ODQsMCwwLDEtMi4xMzMtLjAyMiw1LjE0NSw1LjE0NSwwLDAsMS0yLjg0OS0xLjQ4NCw0Ljk0Nyw0Ljk0NywwLDAsMS0uNzI5LTEuMDgsMi4wOTIsMi4wOTIsMCwwLDEsLjI1OC0uMTY0Yy4xMjQtLjA3MS42LS4zNDIsMS4wNC0uNmwuOC0uNDY3TDIxLDI0LjA4QTMuNzU5LDMuNzU5LDAsMCwwLDIyLjA2NywyNS4xYTIuNiwyLjYsMCwwLDAsMi43MjQtLjEzOCwxLjIxNywxLjIxNywwLDAsMCwuMTU2LTEuNTUxYy0uMjE4LS4zMTEtLjY2Mi0uNTczLTEuOTI0LTEuMTJhNi45Myw2LjkzLDAsMCwxLTIuNjM2LTEuNjIyLDMuNjkyLDMuNjkyLDAsMCwxLS43NjktMS40LDUuNjA2LDUuNjA2LDAsMCwxLS4wNDktMS43ODcsMy40MTMsMy40MTMsMCwwLDEsMi44NzEtMi42NThBNy4wOTIsNy4wOTIsMCwwLDEsMjQuNTY0LDE0Ljg4NFptLTYuNTczLDEuMTY5TDE4LDE3LjJIMTQuMzU2VjI3LjU1NkgxMS43NzhWMTcuMkg4LjEzM1YxNi4wNzZhMTEuMDE4LDExLjAxOCwwLDAsMSwuMDMxLTEuMTU2Yy4wMTMtLjAxOCwyLjIzMS0uMDI3LDQuOTItLjAyMmw0Ljg5My4wMTNaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+"}/>
                    <Typography style={{marginLeft: "0.5rem"}} variant={"h6"}>module.ts</Typography>
                </Grid>

                <Grid item container xs={4} alignItems={"center"}  style={{padding: "0.2rem 1.5rem", cursor: "pointer", backgroundColor: asEditorCurrentTabGetter === "library" ? "#1e1e1e" : "transparent",
                    filter: asEditorCurrentTabGetter === "library" ? "" : "grayscale(100%)" }} onClick={()=>asEditorTabSwitcher("library")}>
                    <img height={"20px"} alt={"module_logo"}  src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmZpbGVfdHlwZV90eXBlc2NyaXB0X29mZmljaWFsPC90aXRsZT48cG9seWdvbiBwb2ludHM9IjIgMTYgMiAzMCAxNiAzMCAzMCAzMCAzMCAxNiAzMCAyIDE2IDIgMiAyIDIgMTYiIHN0eWxlPSJmaWxsOiMwMDdhY2MiLz48cGF0aCBkPSJNMjQuNTY0LDE0Ljg4NGEzLjQ4NSwzLjQ4NSwwLDAsMSwxLjc1MSwxLjAwOSw0LjYxMSw0LjYxMSwwLDAsMSwuNjcxLjljLjAwOS4wMzYtMS4yMDkuODUzLTEuOTQ3LDEuMzExLS4wMjcuMDE4LS4xMzMtLjEtLjI1My0uMjc2YTEuNTg3LDEuNTg3LDAsMCwwLTEuMzE2LS43OTFjLS44NDktLjA1OC0xLjQuMzg3LTEuMzkxLDEuMTI5YTEuMDI3LDEuMDI3LDAsMCwwLC4xMi41MjRjLjE4Ny4zODcuNTMzLjYxOCwxLjYyMiwxLjA4OSwyLC44NjIsMi44NjIsMS40MzEsMy40LDIuMjRhNC4wNjMsNC4wNjMsMCwwLDEsLjMyNCwzLjQxMywzLjc1MywzLjc1MywwLDAsMS0zLjEsMi4yMTgsOC41ODQsOC41ODQsMCwwLDEtMi4xMzMtLjAyMiw1LjE0NSw1LjE0NSwwLDAsMS0yLjg0OS0xLjQ4NCw0Ljk0Nyw0Ljk0NywwLDAsMS0uNzI5LTEuMDgsMi4wOTIsMi4wOTIsMCwwLDEsLjI1OC0uMTY0Yy4xMjQtLjA3MS42LS4zNDIsMS4wNC0uNmwuOC0uNDY3TDIxLDI0LjA4QTMuNzU5LDMuNzU5LDAsMCwwLDIyLjA2NywyNS4xYTIuNiwyLjYsMCwwLDAsMi43MjQtLjEzOCwxLjIxNywxLjIxNywwLDAsMCwuMTU2LTEuNTUxYy0uMjE4LS4zMTEtLjY2Mi0uNTczLTEuOTI0LTEuMTJhNi45Myw2LjkzLDAsMCwxLTIuNjM2LTEuNjIyLDMuNjkyLDMuNjkyLDAsMCwxLS43NjktMS40LDUuNjA2LDUuNjA2LDAsMCwxLS4wNDktMS43ODcsMy40MTMsMy40MTMsMCwwLDEsMi44NzEtMi42NThBNy4wOTIsNy4wOTIsMCwwLDEsMjQuNTY0LDE0Ljg4NFptLTYuNTczLDEuMTY5TDE4LDE3LjJIMTQuMzU2VjI3LjU1NkgxMS43NzhWMTcuMkg4LjEzM1YxNi4wNzZhMTEuMDE4LDExLjAxOCwwLDAsMSwuMDMxLTEuMTU2Yy4wMTMtLjAxOCwyLjIzMS0uMDI3LDQuOTItLjAyMmw0Ljg5My4wMTNaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+"}/>
                    <Typography style={{marginLeft: "0.5rem"}} variant={"h6"}>library.ts</Typography>
                </Grid>

                {
                    asEditorGetter["compile"] !== "" && <Grid item container xs={4}  alignItems={"center"}   style={{padding: "0.5rem 1.5rem", cursor: "pointer", backgroundColor: asEditorCurrentTabGetter === "compile" ? "#1e1e1e" : "transparent",
                        filter: asEditorCurrentTabGetter === "compile" ? "" : "grayscale(100%)" }} onClick={()=>{asEditorTabSwitcher("compile")}}>
                        <img height={"20px"} alt={"module_logo"}  src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHRpdGxlPmZpbGVfdHlwZV93YXNtPC90aXRsZT48cGF0aCBkPSJNMTkuMTUzLDIuMzVWMi41YTMuMiwzLjIsMCwxLDEtNi40LDBoMFYyLjM1SDJWMzAuMjY5SDI5LjkxOVYyLjM1WiIgc3R5bGU9ImZpbGw6IzY1NGZmMCIvPjxwYXRoIGQ9Ik04LjQ4NSwxNy40aDEuODVMMTEuNiwyNC4xMjNoLjAyM0wxMy4xNCwxNy40aDEuNzMxbDEuMzcxLDYuODFoLjAyN2wxLjQ0LTYuODFoMS44MTVsLTIuMzU4LDkuODg1SDE1LjMyOWwtMS4zNi02LjcyOGgtLjAzNmwtMS40NTYsNi43MjhoLTEuODdabTEzLjEyNCwwaDIuOTE3bDIuOSw5Ljg4NUgyNS41MTVsLS42My0yLjJIMjEuNTYybC0uNDg2LDIuMkgxOS4yMTdabTEuMTEsMi40MzctLjgwNywzLjYyN2gyLjUxMkwyMy41LDE5LjgzMloiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4="}/>
                        <Typography style={{marginLeft: "0.5rem"}} variant={"h6"}>module.wat</Typography>
                    </Grid>
                }

            </Grid>

            <Grid item sx={2} style={{padding: "0.2rem 0.5rem", cursor: "pointer", background:""}} onClick={()=>{compile()}}>
                <Grid item sx={{ height: "2rem", width: "2rem"}}>
                    <StyledPlayButtonIcon onClick={()=>compile()}  circleBg={"#2F4253"} triangleBg={"#0F9AFF"} circleBgHover={"#0F9AFF"} triangleBgHover={"#FFFFFF"}/>
                </Grid>
            </Grid>
        </Grid>

        {asEditorCurrentTabGetter === "module" && <Grid item container xs={11} id="panes">
            <Editor options={commonEditorOptions}
                    defaultLanguage="typescript"
                    value={asEditorGetter[asEditorCurrentTabGetter]} onChange={(value)=>handleValueChange(value,  "module")}
                    theme={"vs-dark"}
            />
        </Grid>}

        {asEditorCurrentTabGetter === "library" && <Grid item container xs={11} id="panes">
            <Editor options={commonEditorOptions}
                    defaultLanguage="typescript"
                    value={asEditorGetter[asEditorCurrentTabGetter]} onChange={(value)=>handleValueChange(value, "library")}
                    theme={"vs-dark"}
            />
        </Grid>}

        {
            asEditorCurrentTabGetter === "compile" &&  <Grid item container xs={11} id="panes">
                <Editor options={Object.assign({}, commonEditorOptions, {
                readOnly: true
            })}
                        defaultLanguage="wat"
                        value={asEditorGetter[asEditorCurrentTabGetter]} onChange={(value)=>handleValueChange(value, "compile")}
                        theme={"vs-dark"}
                        readOnly
                />
            </Grid>
        }
    </Grid>
}

export default ASEditor;