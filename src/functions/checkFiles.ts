import mime from 'mime-types';
import ProjectDocument from '../classes/ProjectDocument';
import ProjectMedia from '../classes/ProjectMedia';
import ProjectDir from '../classes/ProjectDir';
import ProjectContent from '../classes/ProjectContent';

const TEXT_TYPES = ['application', 'text'];
const MEDIA_TYPES = ['image', 'audio', 'video', 'model', 'font'];


/** Get data of a file (text and media files) */
const getFileData = async (content: any) => {
    const mimeType = mime.lookup(content.name);
    if (!mimeType) return;

    /** If it's a text file, return the file with it's content */
    /** If it's a media file, return the file with it's media url */
    /** If it's not a media or a text file, just return the file*/
    if (TEXT_TYPES.includes(mimeType.split('/')[0])) {
        const document = new ProjectDocument({
            name: content.name,
            path: content.path,
            type: content.name.split('.')[content.name.split('.').length - 1],
        });
        document.setDocumentText = await getDocumentContent(content.download_url);
        return document;
    } else if (MEDIA_TYPES.includes(mimeType.split('/')[0])) {
        return new ProjectMedia({
            name: content.name,
            path: content.path,
            type: content.type,
            media_url: content.html_url
        });
    } else {
        return new ProjectContent({
            name: content.name,
            path: content.path
        })
    }
}

/** Fetch a document to get its content in text format */
const getDocumentContent = async (url: string) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: import.meta.env.ACCESS_TOKEN,
            }
        });
        const data = await res.text();

        if (!data) return;
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
}

/** Recursively function to get the contents of a directory */
const getDirectoryData = async (content: any, projectName: string, devName: string) => {
    const directory = new ProjectDir({
        name: content.name,
        path: content.path
    });

    const res = await fetch(`${import.meta.env.API_URL}/repos/${devName}/${projectName}/contents/${directory.path}`, {
        method: 'GET',
        headers: {
            Authorization: import.meta.env.ACCESS_TOKEN,
        }
    });
    const data = await res.json();

    /** Array of all content promises*/
    const promises = data.map((content: any) => {
        switch (content.type) {
            /** If it's a file, return it's data */
            case 'file':
                return getFileData(content);
            /** If it's a directory, the function calls itself to get the directory contents */
            case 'dir':
                return getDirectoryData(content, projectName, devName);
            /** If it's not a file or a directory, returns the parent class */
            default:
                return new ProjectContent({
                    name: content.name,
                    path: content.path
                });
        }
    });

    directory.setDirContents = await Promise.all(promises.map((promise: any) => promise));
    return directory;
}

export {
    getFileData,
    getDirectoryData
};