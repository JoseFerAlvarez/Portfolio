import { getDirectoryData, getFileData } from "../functions/checkFiles";
import type { IApiContent } from "../interfaces/IApiContent";
import type IProject from "../interfaces/IProject";
import ProjectContent from "./ProjectContent";

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

    /** Fetch the contents of the project */
    async fetchContents(devName: string) {
        try {
            const res = await fetch(`${import.meta.env.API_URL}/repos/${devName}/${this.name}/contents`, {
                method: 'GET',
                headers: {
                    Authorization: import.meta.env.ACCESS_TOKEN,
                }
            });
            const data: IApiContent[] = await res.json();

            /** Array of all content promises */
            const promises = data.map((content: IApiContent) => {

                switch (content.type) {
                    /** If the content is a file, return the content of the file */
                    case 'file':
                        return getFileData(content);
                    /** If the content is a directory, return the directories and files inside this directory (recursively) */
                    case 'dir':
                        return getDirectoryData(content, this.name, devName);
                    /** If the content is not a file or a directory, returns the parent class */
                    default:
                        return new ProjectContent({
                            name: content.name,
                            path: content.path
                        });
                }
            });

            return await Promise.all(promises.map((promise: any) => promise));

        } catch (error) {
            console.log(error);
            return;
        }
    }
}