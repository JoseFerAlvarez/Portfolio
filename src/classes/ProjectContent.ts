import type IProjectContent from "../interfaces/IProjectContent";

export default class ProjectContent implements IProjectContent {
    name: string;
    path: string;

    constructor({
        name,
        path
    }: IProjectContent) {
        this.name = name;
        this.path = path;
    }
}