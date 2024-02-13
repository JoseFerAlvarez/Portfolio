import type Developer from "../classes/Developer";
import ProjectDir from "../classes/ProjectDir";
import ProjectFile from "../classes/ProjectFile";
import Project from "../classes/Project";

/** Lists the path of a developer's contents in a strings array */
const listContents = (developer: Developer): string[] => {
    const paths = developer.projects?.flatMap((project) => { return listProjectContents(project) });
    return paths || [];
}

/** Lists the paths of a project */
const listProjectContents = (project: Project) => {
    const projectPaths = project.contents?.flatMap((content) => {
        if (!content || !content.path) return;
        if (content instanceof ProjectFile) return `${project.name}-${content.path.replaceAll("/", "-")}`;
        if (content instanceof ProjectDir) return listDirContents(project.name, content);
    });
    return projectPaths?.filter((path) => path) || [];
}

/** Lists a directory's contents in a strings array */
const listDirContents = (project: string, dir: ProjectDir): any => {
    return dir.contents?.flatMap((content) => {
        if (!content || !content.path) return;
        if (content instanceof ProjectFile) return `${project}-${content.path.replaceAll("/", "-")}`;
        if (content instanceof ProjectDir) return listDirContents(project, content);
    });
}

/** Get the content of a document by it's projects and path */
const getFileContent = (object: any, paths: string[], index: number): any => {
    let currentObject: any = object;

    if ("projects" in currentObject) {
        currentObject = currentObject.projects.filter((project: any) => project.name === paths[index])[0];
    } else if ("contents" in currentObject) {
        currentObject = currentObject.contents.filter((content: any) => {
            if (content && "name" in content && content.name === paths[index]) return content;
        })[0];
    } else if ("document_text" in currentObject || "media_url" in currentObject) {
        return currentObject;
    }

    return getFileContent(currentObject, paths, index + 1);
}

export {
    listContents,
    getFileContent,
    listProjectContents
};