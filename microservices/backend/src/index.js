
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

            for (let i = 0; i < results.length; i++) {
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
                try {
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
                } catch (e) {
                    console.error(e)
                }
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



saveTodaysOpportunities(saveToDB)



