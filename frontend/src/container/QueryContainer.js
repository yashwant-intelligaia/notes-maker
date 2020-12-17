import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTES, GET_NOTE_INFO } from '../core/Query';
import { UPDATE_NOTE } from '../core/Mutation';
import { Client } from '../core/Declaration';
export function GetNotes() {
    var { loading, error, data } = useQuery(GET_NOTES, {
        client: Client
    });
    var noteList = data;
    return { loading, error, noteList };
}

export function CreateNotes(title) {
    console.log(title);
}

export function GetNoteInfo(params){
    var { loading, error, data } = useQuery(GET_NOTE_INFO, {
        client: Client,
        variables: params
    });
    var noteData = data;
    return { loading, error, noteData };
}

export function UpdateNoteInfo(params){
    var {uloading, uerror, data} = useMutation(UPDATE_NOTE, {
        client: Client,
        variables: params
    });
    var status = data;
    return {uloading, uerror, status};
}