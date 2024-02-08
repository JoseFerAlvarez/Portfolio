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

export { getFileContent };