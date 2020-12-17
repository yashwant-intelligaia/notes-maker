import { useQuery } from '@apollo/client';
import { GET_NOTES } from '../core/Query';
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