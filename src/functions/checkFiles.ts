import mime from 'mime-types';
import ProjectDocument from '../classes/ProjectDocument';
import ProjectMedia from '../classes/ProjectMedia';

const TEXT_TYPES = ['application', 'text'];
const MEDIA_TYPES = ['image', 'audio', 'video', 'model', 'font'];

const checkFileType = (content: any) => {
    const mimeType = mime.lookup(content.name);
    if (!mimeType) return;

    if (TEXT_TYPES.includes(mimeType.split('/')[0])) {
        const document = new ProjectDocument({
            name: content.name,
            path: content.path,
            type: content.name.split('.')[content.name.split('.').length - 1],
            document_text: ''
        });

        return document;

    } else if (MEDIA_TYPES.includes(mimeType.split('/')[0])) {
        const media = new ProjectMedia({
            name: content.name,
            path: content.path,
            type: content.type,
            media_url: content.html_url
        });

        return media;
    }
}

export {
    checkFileType
};