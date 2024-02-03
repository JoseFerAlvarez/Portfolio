import type IContent from "../interfaces/IProjectContent";
import type IProjectDir from "../interfaces/IProjectDir";
import ProjectContent from "./ProjectContent";

export default class ProjectDir extends ProjectContent implements IProjectDir {
    contents: IContent[];

    constructor({
        name,
        path,
        contents
    }: IProjectDir) {
        super({ name, path });
        this.contents = contents;
    }
}