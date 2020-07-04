import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DocumentSchema } from "./document.model";
import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";
import { PersonSchema } from "src/person/person.model";
import { PersonService } from "src/person/person.service";
import { PersonModule } from "src/person/person.module";
import { FleetSchema } from "src/person/fleet.model";
import { PersonFleetSchema } from "src/person/person.fleet.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema, collection: "Document" }]),
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema, collection: "Person" }]),
    MongooseModule.forFeature([{ name: 'Fleet', schema: FleetSchema, collection: "Fleet" }]),
    MongooseModule.forFeature([{ name: 'PersonFleet', schema: PersonFleetSchema, collection: "PersonFleet" }]),
],
    controllers: [DocumentController],
    providers: [DocumentService, PersonService]

})
export class DocumentModule {

}