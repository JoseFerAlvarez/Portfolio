import { checkFileType } from "../functions/checkFiles";
import type IProject from "../interfaces/IProject";
import type IProjectContent from "../interfaces/IProjectContent";
import ProjectContent from "./ProjectContent";
import ProjectDir from "./ProjectDir";
import ProjectFile from "./ProjectFile";

export default class Project implements IProject {
    name: string;
    website: string | null;
    description: string;
    image_url?: string;
    contents?: ProjectContent[];

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

    set setProjectContents(contents: ProjectContent[]) {
        this.contents = contents;
    }

    async fetchContents(devName: string) {
        try {
            const res = await fetch(`${import.meta.env.API_URL}/repos/${devName}/${this.name}/contents`, {
                method: 'GET',
                headers: {
                    Authorization: import.meta.env.ACCESS_TOKEN,
                }
            });
            const data = await res.json();

            return data.map((content: any) => {

                switch (content.type) {
                    case 'file':
                        return checkFileType(content);
                    case 'dir':
                        return new ProjectDir({
                            name: content.name,
                            path: content.path
                        });
                    default:
                        return new ProjectContent({
                            name: content.name,
                            path: content.path
                        });
                }
            })

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}