import { Person } from "src/person/person.model";
import {Document} from "src/document/document.model";

export class PersonDTO {
    readonly person : Person;
    readonly documents: Document[];
    
    constructor(person: Person, documents: Document[]) {
        this.person = person;
        this.documents = documents;
    }

}