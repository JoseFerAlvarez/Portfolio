import Project from "../classes/Project";

/** Get projects content */
const getContents = async (project: Project, devName: string) => {
    const contents: any = await project.fetchContents(devName);
    project.contents = contents;
};

export { getContents };