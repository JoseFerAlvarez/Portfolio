import type IProjectDocument from "../interfaces/IProjectDocument";
import ProjectFile from "./ProjectFile";

export default class ProjectDocument extends ProjectFile implements IProjectDocument {
    document_text?: string;

    constructor({
        name,
        path,
        type,
        document_text,
    }: IProjectDocument) {
        super({ name, path, type });
        this.document_text = document_text;
    }

    set setDocumentText(document_text: string | undefined) {
        this.document_text = document_text;
    }
}