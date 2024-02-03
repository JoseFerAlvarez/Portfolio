import type IProjectFile from "./IProjectFile";

export default interface IProjectDocument extends IProjectFile {
    document_text: string;
}