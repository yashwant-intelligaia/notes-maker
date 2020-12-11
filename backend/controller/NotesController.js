import { Note } from '../model/Note.js';
import { Content } from '../model/Content.js';

export class NotesController {
    constructor() { }

    /**
     * Function to create note
     * @param {*} params(title) 
     */
    async createNote(params) {
        let note = await this.getNote(params);
        if (note) {
            return { status: 200, errors: [{ field: "title", message: "Note with same title already exist." }], note: note }
        } else {
            note = new Note({ title: params.title });
            await note.save();
            return { status: 201, errors: [], note: note };
        }
    }

    /**
     * Function to get note
     * @param {*} params(title) 
     */
    async getNote(params) {
        return await Note.findOne({ title: params.title });
    }

    /**
     * Function to get notes list
     */
    async getNotes() {
        return await Note.find();
    }

    /**
     * Function to add or update note's content
     * @param {*} params(note_id)
     */
    async addOrUpdateContent(params){
        let content = await Content.findOne({note_id: params.note_id});
        if(content){
            content.data = params.data;
            await content.save();
            return { status: 200, errors: [], content: content };
        }else{
            content = new Content({note_id: params.note_id, data: params.data});
            await content.save();
            return { status: 201, errors: [], content: content };
        }
    }
}