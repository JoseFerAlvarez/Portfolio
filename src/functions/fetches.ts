import Developer from "../classes/Developer";
import Project from "../classes/Project";

const getDeveloperData = async () => {
    const data = new Developer().fetchDeveloper();
    if (!data) return;
    return data;
}

const getDeveloperProjects = async (developer: Developer) => {
    const projects = await developer.fetchDeveloperProjects();
    if (!projects) return;
    return projects;
}

/** Get projects content */
const getProjectContents = async (project: Project, devName: string) => {
    const contents: any = await project.fetchContents(devName);
    project.contents = contents;
};

export {
    getDeveloperData,
    getDeveloperProjects,
    getProjectContents
}