import {Controller, Patch, Param, Query, Post, Body} from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentDTO } from "src/document/dto/document.dto";

@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService){}

    @Patch("/status/:id")
    async changeDocumentsStatus(@Param("id") id: string, @Query("status") status) {
        return await this.documentService.changeDocumentsStatus(id, status);
    }

    @Post("")
    async submitDocument(@Body() document: DocumentDTO) {
        return await this.documentService.submitDocument(document);
    }

}