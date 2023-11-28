import { DocumentModel } from "types/document"
const cache = new Map()
class DocumentCacheHelper {

    static set(id: string, document: DocumentModel) {
        cache.set(id, document)
    }
    static get(id: string): null | DocumentModel {
        return cache.get(id)
    }

}

export default DocumentCacheHelper