import type ProjectContent from "../classes/ProjectContent";

export default interface IProject {
    name: string;
    website: string | null;
    description: string;
    image_url?: string;
    contents?: ProjectContent[];
}