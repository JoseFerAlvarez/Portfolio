import type IProjectMedia from "../interfaces/IProjectMedia";
import ProjectFile from "./ProjectFile";

export default class ProjectMedia extends ProjectFile implements IProjectMedia {
    media_url: string;

    constructor({
        name,
        path,
        type,
        media_url,
    }: IProjectMedia) {
        super({ name, path, type });
        this.media_url = media_url;
    }
}