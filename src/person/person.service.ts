import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Query, forwardRef, Inject } from "@nestjs/common";

import { Person } from "./person.model";
import { DocumentQuery } from "mongoose";
import { PageResponseData } from "src/common/page-response-data";
import { PersonDTO } from "src/person/dto/person.dto";
import { DocumentService } from "src/document/document.service";
import { PERSON_TYPE, PERSON_STATUS_ACTIVE, FLEET_TYPE } from "src/common/constants";
import { PersonInfoDTO } from "src/person/dto/person.info.dto";

import { v4 as uuid } from 'uuid';
import { Fleet } from "src/person/fleet.model";
import { PersonFleet } from "src/person/person.fleet.model";
import {aggregatePaginate } from "mongoose-aggregate-paginate-v2";
import { FleetInfo } from "src/person/dto/fleet.info";

@Injectable()
export class PersonService {

    constructor(
        @InjectModel('Person') private readonly personModel: Model<Person>,
        @InjectModel('Fleet') private readonly fleetModel: Model<Fleet>,
        @InjectModel('PersonFleet') private readonly personFleetModel: Model<PersonFleet>,
        @Inject(forwardRef(() => DocumentService))
        private documentService: DocumentService
    ) { }

    async getPersons() {
        const persons = await this.personModel.find().exec();
        return persons.map(person => ({
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName
        }));
    }

    async getPersonsList(personTypeVal: string, searchValue: string, fieldToSort: string, sortType: string, pageNum: number, pageSize: number) {
        searchValue = searchValue || '';
        pageNum = pageNum || 0;
        pageSize = pageSize || 0;
        let sortParam = {};
        sortParam[fieldToSort] = (sortType == 'DESC') ? '-1' : '1';
        let persons = await this.personModel.find({ personType: personTypeVal, $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { mobileNumber: { $regex: searchValue, $options: 'i' } }] })
            .sort(sortParam)
            .skip(pageNum > 0 ? pageNum * pageSize : 0)
            .limit(pageSize).exec();
        let count = await this.personModel.find({ personType: personTypeVal, $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { mobileNumber: { $regex: searchValue, $options: 'i' } }] }).countDocuments();

        let personsData = await persons.map(person => ({
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email,
            mobileNumber: person.mobileNumber,
            gender: person.gender,
            address: person.address,
            status: person.status
        }));
        return new PageResponseData(personsData, count);
    }


    async getPerson(id: string): Promise<PersonDTO> {
        let person = await this.personModel.findById(id).exec();
        if (person) {
            let documents = await this.documentService.getDocuments(id, PERSON_TYPE);
            return new PersonDTO(person, documents);
        }
        return null;
    }

    async updatePersonStatus(id: string, statusVal: string): Promise<any> {
        await this.personModel.findByIdAndUpdate(id, {status: statusVal}).exec();
    }

    async verifyPersonDocumentStatus(id: string): Promise<any> {
        await this.personModel.findByIdAndUpdate(id, {documentVerified :true}).exec();
    }

    async verifyFleetDocumentStatus(id: string): Promise<any> {
        await this.fleetModel.findByIdAndUpdate(id, {documentVerified :true}).exec();
    }

    async savePerson(person: PersonInfoDTO): Promise<any> {
        if (person._id == null) {
            person._id = uuid();
        }
        if (person.status == null) {
            person.status = PERSON_STATUS_ACTIVE;
        }
        if (person.documentVerified == null) {
            person.documentVerified = false;
        }
        const createPerson = new this.personModel(person);
        return await createPerson.save();
    }

    async updatePerson(person: PersonInfoDTO): Promise<any> {
        const updatePerson = await this.personModel.findByIdAndUpdate(person._id, person);
        return await updatePerson;
    }

    async getFleetList(searchValue: string, fieldToSort: string, sortType: string, pageNum: number, pageSize: number) {
        searchValue = searchValue || '';
        pageNum = pageNum || 0;
        pageSize = pageSize || 0;
        let sortTypeVal = (sortType == 'DESC') ? '-' + fieldToSort : fieldToSort;
        let fleets = await this.personModel.aggregate().lookup({
            from: "PersonFleet",
            localField: "_id",
            foreignField: "personId",
            as: "personFleet"
        }).unwind("personFleet").lookup({
            from: "Fleet",
            localField: "personFleet.fleetId",
            foreignField: "_id",
            as: "fleet"
        }).unwind("fleet").match({
            $and: [{ "personFleet.personType": "FLEET" }],
            $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { mobileNumber: { $regex: searchValue, $options: 'i' } }]
        }).sort(sortTypeVal)
        .skip(pageNum > 0 ? pageNum * pageSize : 0)
        .limit(pageSize)
        .project(
            {
                _id: 1,
                firstName: 1,
                lastName: 1,
                mobileNumber: 1,
                email: 1,
                gender: 1,
                address: 1,
                status: 1,
                fleetName: "$fleet.name",
                gstinNumber: "$fleet.gstinNumber"
            }
        ).exec();
        let fleetCount = await this.personModel.aggregate().lookup({
            from: "PersonFleet",
            localField: "_id",
            foreignField: "personId",
            as: "personFleet"
        }).unwind("personFleet").lookup({
            from: "Fleet",
            localField: "personFleet.fleetId",
            foreignField: "_id",
            as: "fleet"
        }).unwind("fleet").match({
            $and: [{ "personFleet.personType": "FLEET" }],
            $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { mobileNumber: { $regex: searchValue, $options: 'i' } }]
        }).count("fleetCount").exec();
        let fleetData = await fleets.map(fleet => ({
            id: fleet._id,
            firstName: fleet.firstName,
            lastName: fleet.lastName,
            mobileNumber: fleet.mobileNumber,
            email: fleet.email,
            gender: fleet.gender,
            address: fleet.address,
            status: fleet.status,
            fleetName: fleet.fleetName,
            gstinNumber: fleet.gstinNumber
        }));
        return new PageResponseData(fleetData, fleetCount);
    }

    async getFleet(id: string): Promise<any> {
        let person = await this.personModel.findById(id).exec();
        let fleet;
        let fleetDocuments;
        let personDocuments;
        if (person) {
            let personIdVal = person._id;
            let personFleet = await this.personFleetModel.findOne({personId: personIdVal}).exec();
            if (personFleet) {
                fleet  = await this.fleetModel.findById(personFleet.fleetId).exec();
            }
            fleetDocuments = await this.documentService.getDocuments(fleet._id, FLEET_TYPE);
            personDocuments = await this.documentService.getDocuments(personIdVal, PERSON_TYPE);
        }
        return new FleetInfo(person, personDocuments, fleet, fleetDocuments);
    }

    async savePersonFleet(fleetInfo: FleetInfo): Promise<any> {
        let personId = await this.savePersonInfo(fleetInfo.person);
        let fleetId = await this.saveFleet(fleetInfo.fleet);
        let personFleetId = await this.savePersonFleetInfo(fleetId, personId);
        let createdInfo = {
            createdPersonId: personId,
            createdFleetId: fleetId
        }
        return createdInfo;
    }

    async updatePersonFleet(fleetInfo: FleetInfo): Promise<any> {
        let updatePerson = await this.personModel.findByIdAndUpdate(fleetInfo.person._id, fleetInfo.person).exec();
        let updateFleet = await this.fleetModel.findByIdAndUpdate(fleetInfo.fleet._id, fleetInfo.fleet).exec();
    }

    private async savePersonInfo(person: Person): Promise<string> {
        let personId = person._id;
        if (personId == null) {
            personId = uuid(); 
        }
        person._id = personId;
        if (person.status == null) {
            person.status = PERSON_STATUS_ACTIVE;
        }
        if (person.documentVerified == null) {
            person.documentVerified = false;
        }
        const createPerson = new this.personModel(person);
        await createPerson.save();
        return personId;
    }

    private async saveFleet(fleet: Fleet): Promise<string> {
        let fleetId = fleet._id;
        if (fleetId == null) {
            fleetId = uuid();
            fleet._id = fleetId;
        }
        if (fleet.documentVerified == null) {
            fleet.documentVerified = false;
        }
        const createFleet = new this.fleetModel(fleet);
        await createFleet.save();
        return fleetId;
    }

    private async savePersonFleetInfo(fleetIdentifier: string, personIdentifier: string): Promise<string> {
        let personFleetId;
        let personFleetInfo = await this.personFleetModel.findOne({personId: personIdentifier, fleetId: fleetIdentifier}).exec();
        console.log(personFleetInfo);
        if (personFleetInfo === null) {
            console.log("Coming");
            personFleetId = uuid();
           let personFleet = {
                _id: personFleetId,
                personId: personIdentifier,
                fleetId: fleetIdentifier,
                personType: [FLEET_TYPE]
            };

           const createPersonFleet = new this.personFleetModel(personFleet);
           await createPersonFleet.save();
        }
        return personFleetId;
    }   
}