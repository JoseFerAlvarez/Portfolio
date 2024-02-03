import type IProjectFile from "../interfaces/IProjectFile";
import ProjectContent from "./ProjectContent";

export default class ProjectFile extends ProjectContent implements IProjectFile {
    type: string;

    constructor({
        name,
        path,
        type
    }: IProjectFile) {
        super({ name, path });
        this.type = type;
    }
}