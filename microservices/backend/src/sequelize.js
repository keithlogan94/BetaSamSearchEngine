
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('test', 'root', 'test', {
    host: 'mysql-service',
    dialect: 'mysql'
});

export const ContractOpportunity = sequelize.define("contractOpportunity", {
    noticeId: DataTypes.STRING,
    title: DataTypes.TEXT,
    solNumber: DataTypes.STRING,
    departmentAgency: DataTypes.STRING,
    cGac: DataTypes.STRING,
    subTier: DataTypes.STRING,
    fpdsCode: DataTypes.STRING,
    office: DataTypes.STRING,
    aacCode: DataTypes.STRING,
    postedDate: DataTypes.STRING,
    type: DataTypes.STRING,
    baseType: DataTypes.STRING,
    archiveType: DataTypes.STRING,
    archiveDate: DataTypes.STRING,
    setAsideCode: DataTypes.STRING,
    setAside: DataTypes.STRING,
    responseDeadline: DataTypes.STRING,
    naicsCode: DataTypes.STRING,
    classificationCode: DataTypes.STRING,
    popStreetAddress: DataTypes.STRING,
    popCity: DataTypes.STRING,
    popState: DataTypes.STRING,
    popZip: DataTypes.STRING,
    popCountry: DataTypes.STRING,
    active: DataTypes.STRING,
    awardNumber: DataTypes.STRING,
    awardDate: DataTypes.STRING,
    awardMoney: DataTypes.STRING,
    awardee: DataTypes.STRING,
    primaryContactTitle: DataTypes.STRING,
    primaryContactFullName: DataTypes.STRING,
    primaryContactEmail: DataTypes.STRING,
    primaryContactPhone: DataTypes.STRING,
    primaryContactFax: DataTypes.STRING,
    secondaryContactTitle: DataTypes.STRING,
    secondaryContactFullName: DataTypes.STRING,
    secondaryContactContactEmail: DataTypes.STRING,
    secondaryContactContactPhone: DataTypes.STRING,
    secondaryContactFax: DataTypes.STRING,
    organizationType: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    additionalInfoLink: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
});

export default async function sync() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await ContractOpportunity.sync()

    return sequelize
}

