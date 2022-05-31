
import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";
import fs from 'fs';
import sync, { ContractOpportunity } from "./sequelize";
import csv from 'csv-parser'
import {DataTypes, Op} from "sequelize";
import cors from 'cors';

ContractOpportunity.sync({ force: true})

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function saveToDB(stream) {
    let results = []
        stream.pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            for (let i = 0; i < 100; i++) {
                const co = results[i]
                const { NoticeId: noticeId,
                    Title: title,
                    'Sol#': solNumber,
                    'Department/Ind.Agency': departmentAgency,
                    CGAC: cGac,
                    'Sub-Tier': subTier,
                    'FPDS Code': fpdsCode,
                    Office: office,
                    'AAC Code': aacCode,
                    PostedDate: postedDate,
                    Type: type,
                    BaseType: baseType,
                    ArchiveType: archiveType,
                    ArchiveDate: archiveDate,
                    SetAsideCode: setAsideCode,
                    SetAside: setAside,
                    ResponseDeadLine: responseDeadline,
                    NaicsCode: naicsCode,
                    ClassificationCode: classificationCode,
                    PopStreetAddress: popStreetAddress,
                    PopCity: popCity,
                    PopState: popState,
                    PopZip: popZip,
                    PopCountry: popCountry,
                    Active: active,
                    AwardNumber: awardNumber,
                    AwardDate: awardDate,
                    'Award$': awardMoney,
                    Awardee: awardee,
                    PrimaryContactTitle: primaryContactTitle,
                    PrimaryContactFullName: primaryContactFullName,
                    PrimaryContactEmail: primaryContactEmail,
                    PrimaryContactPhone: primaryContactPhone,
                    PrimaryContactFax: primaryContactFax,
                    SecondaryContactTitle: secondaryContactTitle,
                    SecondaryContactFullName: secondaryContactFullName,
                    SecondaryContactEmail: secondaryContactContactEmail,
                    SecondaryContactPhone: secondaryContactContactPhone,
                    SecondaryContactFax: secondaryContactFax,
                    OrganizationType: organizationType,
                    State: state,
                    City: city,
                    ZipCode: zip,
                    CountryCode: countryCode,
                    AdditionalInfoLink: additionalInfoLink,
                    Link: link,
                    Description: description
                } = co
                await ContractOpportunity.create({
                    noticeId,
                    title,
                    solNumber,
                    departmentAgency,
                    cGac,
                    subTier,
                    fpdsCode,
                    office,
                    aacCode,
                    postedDate,
                    type,
                    baseType,
                    archiveType,
                    archiveDate,
                    setAsideCode,
                    setAside,
                    responseDeadline,
                    naicsCode,
                    classificationCode,
                    popStreetAddress,
                    popCity,
                    popState,
                    popZip,
                    popCountry,
                    active,
                    awardNumber,
                    awardDate,
                    awardMoney,
                    awardee,
                    primaryContactTitle,
                    primaryContactFullName,
                    primaryContactEmail,
                    primaryContactPhone,
                    primaryContactFax,
                    secondaryContactTitle,
                    secondaryContactFullName,
                    secondaryContactContactEmail,
                    secondaryContactContactPhone,
                    secondaryContactFax,
                    organizationType,
                    state,
                    city,
                    zip,
                    countryCode,
                    additionalInfoLink,
                    link,
                    description
                });

            }
        });
}

async function saveTodaysOpportunities(saveToDB) {
    const todayFile = `${getDate()}contract-opportunities.csv`
    if (fs.existsSync(todayFile)) {
        const stream = fs.createReadStream(todayFile)
        saveToDB(stream)
    } else {
        const data = (await axios.get("https://sam.gov/api/prod/fileextractservices/v1/api/download/Contract%20Opportunities/datagov/ContractOpportunitiesFullCSV.csv?privacy=Public")).data
        fs.writeFileSync(todayFile, data);
        const stream = fs.createReadStream(todayFile)
        saveToDB(stream)
    }
}

function getDate() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + "-" + month + "-" + day;
    return newdate
}


app.get("/sync-opportunities", async (req, res) => {
    await saveTodaysOpportunities(saveToDB)
    return res.json({ message: "Synced"})
})

app.get("/contract-opportunities", async (req, res) => {

    let offset = 0
    let limit = 100

    let { page, pageSize, activeSearches } = req.query

    page = Number.parseInt(page)
    if (isNaN(page)) {
        page = 1
    }
    if (page < 1) {
        page = 1
    }

    pageSize = Number.parseInt(pageSize)
    if (isNaN(pageSize)) {
        pageSize = 10
    }
    if (pageSize < 1) {
        pageSize = 10
    }

    offset = (page-1)*pageSize
    limit = pageSize

    let whereObj = {}
    console.log(activeSearches)

    if (activeSearches) {
        let searches = activeSearches.split('AND')
        for (let i = 0; i < searches.length; i++) {
            let search = searches[i]
            let searchWhere = search.split(',')
            let searchKey = searchWhere[0]
            let searchEquality = searchWhere[1]
            if (searchEquality === 'equals') {
                searchEquality = Op.eq
            } else if (searchEquality === 'like') {
                searchEquality = Op.like
                searchWhere[2] = '%' + searchWhere[2] + '%'
            } else if (searchEquality === 'greaterThan') {
                searchEquality = Op.gt
            } else if (searchEquality === 'lessThan') {
                searchEquality = Op.lt
            }
            let searchValue = searchWhere[2]
            whereObj[searchKey] = {
                [searchEquality]: searchValue
            }
        }

    }
    let cos = await ContractOpportunity.findAll({
        offset,
        limit,
        where: whereObj
    })
    return res.json(cos)

})

app.get("/number-of-opportunities", async (req, res) => {
    let cos = await ContractOpportunity.findAndCountAll()
    return res.json({
        number: cos.count
    })
})

app.listen(3000, () => console.log("listening on port 3000"))