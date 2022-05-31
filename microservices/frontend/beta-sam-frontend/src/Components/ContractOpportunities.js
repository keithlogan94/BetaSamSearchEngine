import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import Opportunity from "./Opportunity";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/*aacCode: "127EAY"
active: "Yes"
additionalInfoLink: ""
archiveDate: null
archiveType: "auto15"
awardDate: null
awardMoney: ""
awardNumber: ""
awardee: ""
baseType: "Presolicitation"
cGac: "012"
city: "Albuquerque"
classificationCode: "R416"
countryCode: "USA"
createdAt: "2022-05-30T21:20:40.492Z"
departmentAgency: "AGRICULTURE, DEPARTMENT OF"
description: "**PLEASE READ: THIS IS A PRE-SOLICITATION NOTICE. NO OTHER INFORMATION IS AVAILABLE UNTIL THE SOLICITATION IS ISSUED ON THE DATE IDENTIFIED BELOW** The NAICS code for this project is 115210. The small business size standard is no greater than $9.5 Million in average annual receipts. Only offers from firms that are certified to meet both Small Business status and the size standard will be considered. You may contact your local U.S. Small Business Administration (SBA) office (federal, not state office) for more information on the Small Business program. Your local SBA office's contact information may be found by accessing the SBA website (www.sba.gov). Solicitation Documents: The solicitation will be issued as a Request for Quote (RFQ) requiring both price and technical proposals responding to evaluation criteria described in the solicitation. Description: The Government anticipates awarding 5 Indefinite Delivery/Indefinite Quality (IDIQ) contracts for the Devils Garden Wild Horse & Bait Trapping IDIQ located on the Modoc National Forest. The Maximum allowed to be ordered against this IDIQ contract is a total of $4,000,000.00 Term: The expected IDIQ term is 5 years from award date. Location: Devils Garden Ranger District, Modoc National Forest Set-Aside: This project is 100% set aside for Small Business Estimated Start Date: �September 1, 2022 Contract Completion Date: 5 years from date of award Response Location: Quotes will be accepted via electronically at the email listed in solicitation NO LATER than time and date indicated on the solicitation. Please hold any technical questions until after review of the solicitation. The technical contact information will be listed in the solicitation. The purpose of this notice is to meet the FAR 5.201 It is the contractor's responsibility to monitor the SAM.gov website for amendments. SAM REGISTRATION REQUIREMENTS: Prospective contractors must be registered in the System for Award Management (SAM) prior to quote submission.� SAM.gov registration is FREE! There is NO FEE to register or maintain their SAM.gov registration Vendors do have the ability to use the services at their local Procurement Technical Assistance Center (PTAC).� Information can be found at this website:� http://www.aptac-us.org/ PLACE OF PERFORMANCE: Devils Garden Ranger District 225 W. 8th Street Alturas, CA 96101-3215 County: Modoc"
fpdsCode: "12C2"
link: "https://sam.gov/opp/e6591480fb684b86a01f7aec4ed00dbc/view"
naicsCode: "115210"
noticeId: "e6591480fb684b86a01f7aec4ed00dbc"
office: "USDA-FS, CSA SOUTHWEST 1"
organizationType: "OFFICE"
popCity: "Alturas"
popCountry: "USA"
popState: "CA"
popStreetAddress: ""
popZip: "96101"
postedDate: "2022-05-29T23:22:52.886Z"
primaryContactEmail: "paul.wood@usda.gov"
primaryContactFax: ""
primaryContactFullName: null
primaryContactPhone: ""
primaryContactTitle: ""
responseDeadline: "2022-07-28T20:00:00.000Z"
secondaryContactContactEmail: ""
secondaryContactContactPhone: ""
secondaryContactFax: ""
secondaryContactFullName: null
secondaryContactTitle: ""
setAside: null
setAsideCode: null
solNumber: "127EAY22Q0055"
state: "NM"
subTier: "FOREST SERVICE"
title: "Devils Garden Wild Horse & Bait Trapping IDIQ"
type: "Presolicitation"
updatedAt: "2022-05-30T21:20:40.492Z"
zip: "871023498"*/

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        width: 250,
        editable: true,
    },
    {
        field: 'state',
        headerName: 'State',
        width: 50,
        editable: true,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 210,
        editable: true,
    },
    {
        field: 'office',
        headerName: 'Office',
        width: 210,
        editable: true,
    },
];


export default class ContractOpportunities extends React.Component {
    state={
        pageNumber: 1,
        pageSize: 20,
        rows: [
        ],
        numberOfItems: 100,
        isOpen: false,
        opportunity: null,
    }

    async componentDidMount() {
        await this.load()

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            console.log("current state is not equal to prev state")
            console.log(this.props, prevProps)
            await this.load()
        }
    }

    load = async () => {

        let activeSearches = this.props.activeSearches.join('AND')

        if (!activeSearches) {
            activeSearches = []
        }

        const result = await axios.get("http://localhost:3000/contract-opportunities", {
            params: {
                page: this.props.page,
                pageSize: this.props.pageSize,
                activeSearches
            }
        })

        let co = result.data
        console.log(co)

        this.setState({
            rows: co
        })

    }

    render() {
        return (
            <React.Fragment>
                <div style={{ height: '90vh', width: '100%' }}>
                    <div>
                        <br />
                        <Opportunity
                            opportunity={this.state.opportunity}
                            selectedValue={null}
                            open={this.state.isOpen}
                            onClose={() => {
                                this.setState({
                                    isOpen: false,
                                })
                            }}
                        />
                    </div>


                    <DataGrid
                        onCellDoubleClick={(e) => {
                            console.log(e)
                            this.setState({
                                isOpen: true,
                                opportunity: e.row
                            })
                        }}
                        hideFooter={true}
                        autoPageSize={true}
                        onPageChange={async (params, event) => {
                            console.log(params)
                            this.setState({
                                pageNumber: params
                            })
                            await this.load()
                        }}
                        rows={this.state.rows}
                        columns={columns}
                        pageSize={this.state.pageSize}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>

            </React.Fragment>
        )
    }

}

