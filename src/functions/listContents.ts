import type Developer from "../classes/Developer";
import ProjectDir from "../classes/ProjectDir";
import ProjectFile from "../classes/ProjectFile";

const listContents = (developer: Developer): string[] => {
    const paths = developer.projects?.map((project) => {
        const name = project.name;

        return project.contents?.map((content) => {
            if (!content || !content.path) return;
            if (content instanceof ProjectFile) return `${name}-${content.path.replaceAll("/", "-")}`;
            if (content instanceof ProjectDir) return listDirContents(project.name, content);
        })
    });
    if (!paths) return [];
    return paths?.flat(Infinity).filter((path) => {
        if (path) return path;
    });
}

const listDirContents = (project: string, dir: ProjectDir): any => {
    return dir.contents?.map((content) => {
        if (!content || !content.path) return;
        if (content instanceof ProjectFile) return `${project}-${content.path.replaceAll("/", "-")}`;
        if (content instanceof ProjectDir) return listDirContents(project, content);
    });
}

export { listContents };