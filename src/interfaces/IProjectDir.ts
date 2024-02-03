import type IProjectContent from "./IProjectContent";

export default interface IProjectDir extends IProjectContent {
    contents: IProjectContent[];
} 