import type IProject from "../interfaces/IProject";
import type IProjectContent from "../interfaces/IProjectContent";

export default class Project implements IProject {
    name: string;
    website: string | null;
    description: string;
    image_url: string;
    contents: IProjectContent;

    constructor({
        name,
        website,
        description,
        image_url,
        contents
    }: IProject) {
        this.name = name;
        this.website = website;
        this.description = description;
        this.image_url = image_url;
        this.contents = contents;
    }
}