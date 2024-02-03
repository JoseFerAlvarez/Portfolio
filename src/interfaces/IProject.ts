import type IContent from "./IProjectContent";

export default interface IProyect {
    name: string;
    website: string | null;
    description: string;
    image_url: string;
    contents: IContent;
}