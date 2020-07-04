import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject, forwardRef } from "@nestjs/common";

import {Document} from "./document.model";
import {DocumentDTO} from "src/document/dto/document.dto";
import { PERSON_TYPE, DOCUMENT_STATUS_APPROVED, DOCUMENT_STATUS_PENDING, FLEET_TYPE } from "src/common/constants";
import { PersonService } from "src/person/person.service";

import { v4 as uuid } from 'uuid';

@Injectable()
export class DocumentService {

    constructor(
        @InjectModel('Document') private readonly documentModel: Model<Document>,
        @Inject(forwardRef(() => PersonService))
        private personService: PersonService
    ) { }

    async getDocuments(entityIdVal: string, entityTypeVal: string) : Promise<Document[]> {
      return await this.documentModel.find({entityId : entityIdVal, entityType : entityTypeVal}).exec();
    }

    async changeDocumentsStatus(id: string, statusVal: string): Promise<any> {
        await this.documentModel.findByIdAndUpdate(id, {status: statusVal}).exec();
        const document = await this.documentModel.findById(id).exec();
        if (statusVal == DOCUMENT_STATUS_APPROVED) {
        if (document.entityType === PERSON_TYPE) {
            const personId = document.entityId;
            const approvedDocumentsCount = await this.documentModel.find({entityType: PERSON_TYPE, entityId: personId, status: DOCUMENT_STATUS_APPROVED}).count();
            const totalDocumentsCount = await this.documentModel.find({entityType: PERSON_TYPE, entityId: personId}).count();
            if (approvedDocumentsCount === totalDocumentsCount) {
                await this.personService.verifyPersonDocumentStatus(personId);
            }
        } else if (document.entityType === FLEET_TYPE) {
            const fleetId = document.entityId;
            const approvedDocumentsCount = await this.documentModel.find({entityType: FLEET_TYPE, entityId: fleetId, status: DOCUMENT_STATUS_APPROVED}).count();
            const totalDocumentsCount = await this.documentModel.find({entityType: FLEET_TYPE, entityId: fleetId}).count();
            if (approvedDocumentsCount === totalDocumentsCount) {
                await this.personService.verifyFleetDocumentStatus(fleetId);
            }
        }
    }
    }

    async submitDocument(document: DocumentDTO): Promise<any> {
        //TODO: Need to write for uploading the file to Azure Blob storage
        if (document._id == null) {
            document._id = uuid();
        }
        document.url = "";
        document.status = DOCUMENT_STATUS_PENDING;
        const createDocument = new this.documentModel(document);
        return await createDocument.save();
    }
}