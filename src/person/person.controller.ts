import { PersonService } from "src/person/person.service";
import { Post, Body, Get, Controller, Query, Param, Patch, Put } from "@nestjs/common";
import { PersonDTO } from "src/person/dto/person.dto";
import { PageResponseData } from "src/common/page-response-data";
import { PersonInfoDTO } from "src/person/dto/person.info.dto";
import { FleetInfo } from "src/person/dto/fleet.info";


@Controller('persons')
export class PersonController {
    constructor(private readonly personService: PersonService) { }

    @Get()
    async getPersons() {
        const users = await this.personService.getPersons();
        return users;
    }

    @Get("/page")
    async getPersonsList( @Query("personType") personType, @Query("searchValue") searchValue: string,
        @Query("fieldToSort") fieldToSort: string, @Query("sortType") sortType: string, @Query("pageNum") pageNum: string, @Query("pageSize") pageSize: string) {
        return await this.personService.getPersonsList(personType, searchValue, fieldToSort, sortType, parseInt(pageNum), parseInt(pageSize));
    }

    @Get(":id")
    async getPerson(@Param("id") id): Promise<PersonDTO> {
        return await this.personService.getPerson(id);
    }

    @Patch("/status/:id")
    async changeStatus(@Param("id") id: string, @Query("status") status) {
        return await this.personService.updatePersonStatus(id, status);
    }

    @Post("")
    async savePerson(@Body() person: PersonInfoDTO) {
        return await this.personService.savePerson(person);
    }

    @Put("")
    async updatePerson(@Body() person: PersonInfoDTO) {
        return await this.personService.updatePerson(person);
    }

    @Get("/fleets/page")
    async getFleetList(@Query("searchValue") searchValue: string,
        @Query("fieldToSort") fieldToSort: string, @Query("sortType") sortType: string, @Query("pageNum") pageNum: string, @Query("pageSize") pageSize: string) {
        return await this.personService.getFleetList(searchValue, fieldToSort, sortType, parseInt(pageNum), parseInt(pageSize));
    }

    @Get("/fleets/:id")
    async getFleet(@Param("id") id: string): Promise<any>{
        return await this.personService.getFleet(id);
    }

    @Post("/fleets")
    async savePersonFleetInfo(@Body() fleetInfo: FleetInfo): Promise<string> {
        return await this.personService.savePersonFleet(fleetInfo);
    }

    @Put("/fleets")
    async updatePersonFleetInfo(@Body() fleetInfo: FleetInfo): Promise<string> {
        return await this.personService.updatePersonFleet(fleetInfo);
    }
}