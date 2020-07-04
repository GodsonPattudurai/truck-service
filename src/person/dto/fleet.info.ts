import { Fleet } from "src/person/fleet.model";
import { Person } from "src/person/person.model";
import { Document } from "src/document/document.model";

export class FleetInfo {
    person: Person;
    personDocuments: Document[];
    fleetdocuments: Document[];
    fleet: Fleet;

    constructor(person: Person, personDocuments: Document[], fleet: Fleet, fleetDocuments: Document[]) {
        this.person = person;
        this.personDocuments = personDocuments;
        this.fleetdocuments = fleetDocuments;
        this.fleet = fleet;  
    }
}