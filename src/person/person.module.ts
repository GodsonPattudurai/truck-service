import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PersonSchema } from "src/person/person.model";
import { PersonController } from "src/person/person.controller";
import { PersonService } from "src/person/person.service";
import { DocumentModule } from "src/document/document.module";
import { DocumentService } from "src/document/document.service";
import { DocumentController } from "src/document/document.controller";
import { DocumentSchema } from "src/document/document.model";
import { FleetSchema } from "src/person/fleet.model";
import { PersonFleetSchema } from "src/person/person.fleet.model";

@Module({
    imports : [
        MongooseModule.forFeature([{name: 'Person', schema: PersonSchema, collection: "Person"}]),
        MongooseModule.forFeature([{name: 'Fleet', schema: FleetSchema, collection: "Fleet"}]),
        MongooseModule.forFeature([{name: 'PersonFleet', schema: PersonFleetSchema, collection: "PersonFleet"}]),
        MongooseModule.forFeature([{name: 'Document', schema: DocumentSchema, collection: "Document"}]),
    ],
    controllers: [PersonController],
    providers: [PersonService, DocumentService]

})
export class PersonModule {

}