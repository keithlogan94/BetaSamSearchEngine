import logo from './logo.svg';
import './App.css';
import ContractOpportunities from "./Components/ContractOpportunities";
import {
    AppBar, Autocomplete,
    createTheme,
    FormControl,
    IconButton, InputLabel, MenuItem, Select,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import { green, purple, blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import React from "react";
import { GridMenuIcon } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";

const styles = theme => ({
    input: {
        width: '20%',
        borderRadius: 4,
        backgroundColor: 'white',
        border: '1px solid #ced4da',
        fontSize: 20,
    },
    // Separate this part into it's own CSS class
    inputFocused: {
        width: '40%',
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        backgroundColor: "#00FF00",
    },
});

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '&  label': {
                        color: 'white!important',
                    },
                },
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '&  label': {
                        color: 'white!important',
                    },
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&': {
                        color: 'white!important'
                    }
                }
            }
        }
    },
    palette: {
        mode: 'dark',
        primary: {
            main: blue[900],
        },
        secondary: {
            main: green[500],
        },

        input: {
            width: '20%',
            borderRadius: 4,
            backgroundColor: 'white',
            border: '1px solid #ced4da',
            fontSize: 20,
            '&:focus': {
                width: '40%',
                borderColor: 'red',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        }
    },

});


let fields =    [
    'noticeId',
    'title',
    'solNumber',
    'departmentAgency',
    'cGac',
    'subTier',
    'fpdsCode',
    'office',
    'aacCode',
    'postedDate',
    'type',
    'baseType',
    'archiveType',
    'archiveDate',
    'setAsideCode',
    'setAside',
    'responseDeadline',
    'naicsCode',
    'classificationCode',
    'popStreetAddress',
    'popCity',
    'popState',
    'popZip',
    'popCountry',
    'active',
    'awardNumber',
    'awardDate',
    'awardMoney',
    'awardee',
    'primaryContactTitle',
    'primaryContactFullName',
    'primaryContactEmail',
    'primaryContactPhone',
    'primaryContactFax',
    'secondaryContactTitle',
    'secondaryContactFullName',
    'secondaryContactContactEmail',
    'secondaryContactContactPhone',
    'secondaryContactFax',
    'organizationType',
    'state',
    'city',
    'zip',
    'countryCode',
    'additionalInfoLink',
    'link',
    'description',
]

let searchBy = fields.map((m) => {
    return {
        value: m,
        description: m
    }
})

let equalityList = [
    {
        value: 'equals',
        description: 'Equals',
    },
    {
        value: 'like',
        description: 'Like',
    },
    {
        value: 'greaterThan',
        description: 'Greater Than',
    },
    {
        value: 'lessThan',
        description: 'Less Than',
    },
]


class App extends React.Component {
    state={
        pageSize: 10,
        page: 1,
        numberOfResults: 100,
        searchByActive: 'id',
        equalityActive: 'equals',
        valueActive: '',
        activeSearches: []
    }

    async componentDidMount() {
        let data = await axios.get("//api.searchengine.beta.sam.recro.kloudrun.com/number-of-opportunities")
        console.log(data)
        this.setState({
            numberOfResults: data.data.number
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                width: "100vw",
                                height: "100vh",
                                backgroundColor: 'primary.dark',
                            }}
                        >
                            <div style={{ height: '10vh'}}>
                                <AppBar position="static">
                                    <Toolbar variant="dense">
                                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                        </IconButton>
                                        <Typography variant="h6" color="inherit" component="div">
                                            Contract Opportunities
                                        </Typography>
                                        <div style={{marginLeft: "10px"}}>
                                            <TextField value={this.state.pageSize} onChange={(e) => {
                                                let size = Number.parseInt(e.target.value)
                                                console.log(size)
                                                if (size >= 1) {
                                                    if (size <= 20) {
                                                        this.setState({
                                                            pageSize: size
                                                        })
                                                    }
                                                }
                                            }} type={"number"} style={{padding: '10px', margin: '10px', color: "white"}} id="standard-basic" label="Page Size" variant="standard" />
                                        </div>

                                        <div style={{marginLeft: "10px"}}>
                                            <TextField value={this.state.page} onChange={(e) => {
                                                let size = Number.parseInt(e.target.value)
                                                console.log(size)
                                                if (size >= 1) {
                                                    this.setState({
                                                        page: size
                                                    })
                                                }
                                            }} type={"number"} style={{
                                                padding: '10px', margin: '10px', color: "white"}} id="standard-basic" label={`Page ${this.state.page} Viewing ${(this.state.page-1)*this.state.pageSize+1}-${(this.state.page-1)*this.state.pageSize+this.state.pageSize} of ${this.state.numberOfResults}`} variant="standard" />
                                        </div>

                                        <div style={{marginLeft: "10px", display: "flex", width: "800px"}}>

                                            <FormControl style={{margin: "0 1em", width: "200px"}} fullWidth={true}>
                                                <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={this.state.searchByActive}
                                                    label="Age"
                                                    onChange={(e) => {
                                                        console.log(e.target)
                                                        this.setState({
                                                            searchByActive: e.target.value
                                                        })
                                                    }}
                                                >
                                                    { searchBy.map((m) => {
                                                        return (
                                                            <MenuItem value={m.value}>{m.description}</MenuItem>
                                                        )
                                                    })}

                                                </Select>
                                            </FormControl>

                                            <FormControl style={{margin: "0 1em 0 0 ", width: "200px"}} fullWidth={true}>
                                                <InputLabel id="demo-simple-select-label">Equality</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={this.state.equalityActive}
                                                    label="Age"
                                                    onChange={(e) => {
                                                        console.log(e.target)
                                                        this.setState({
                                                            equalityActive: e.target.value
                                                        })
                                                    }}
                                                >
                                                    { equalityList.map((m) => {
                                                        return (
                                                            <MenuItem value={m.value}>{m.description}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                id="combo-box-demo"
                                                style={{ width: 200, color: 'black!important' }}
                                                label={"Value"}
                                                onChange={(e) => {
                                                    this.setState({
                                                        valueActive: e.target.value
                                                    })
                                                }}
                                            />

                                            <Button onClick={() => {
                                                this.setState({
                                                    page: 1,
                                                    activeSearches: [...this.state.activeSearches,
                                                        [
                                                            this.state.searchByActive,
                                                            this.state.equalityActive,
                                                            this.state.valueActive,
                                                        ].join(',')
                                                    ]
                                                })
                                            }} style={{marginLeft: '1em'}} variant="text">Search</Button>

                                            <FormControl style={{margin: "0 1em", width: "200px"}} fullWidth={true}>
                                                <InputLabel id="demo-simple-select-label">{this.state.activeSearches.length > 0 ? `${this.state.activeSearches.length} search(s)` : "No search"}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={null}
                                                    label={this.state.activeSearches.length > 0 ? `${this.state.activeSearches.length} active search(s)` : "No active searches"}
                                                    onChange={(e) => {
                                                        e.preventDefault()
                                                        console.log(e.target)
                                                        this.setState({
                                                            activeSearches: this.state.activeSearches.filter((m) => {
                                                                return m !== e.target.value
                                                            })
                                                        })
                                                    }}
                                                >
                                                    { this.state.activeSearches.map((m) => {
                                                        return (
                                                            <MenuItem value={m}>{m}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </div>
                            <ContractOpportunities activeSearches={this.state.activeSearches} pageSize={this.state.pageSize} page={this.state.page} />
                        </Box>
                    </ThemeProvider>
                </header>
            </div>
        );
    }

}

export default App;
