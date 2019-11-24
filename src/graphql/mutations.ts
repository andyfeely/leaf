// tslint:disable
// this is an auto generated file. This will be overwritten

export const createBookmark = `mutation CreateBookmark($input: CreateBookmarkInput!) {
  createBookmark(input: $input) {
    id
    name
    url
    owner
  }
}
`;
export const updateBookmark = `mutation UpdateBookmark($input: UpdateBookmarkInput!) {
  updateBookmark(input: $input) {
    id
    name
    url
    owner
  }
}
`;
export const deleteBookmark = `mutation DeleteBookmark($input: DeleteBookmarkInput!) {
  deleteBookmark(input: $input) {
    id
    name
    url
    owner
  }
}
`;
export const createNote = `mutation CreateNote($input: CreateNoteInput!) {
  createNote(input: $input) {
    id
    title
    body
    starred
    createdAt
    updatedAt
    color
    gradient
    owner
  }
}
`;
export const updateNote = `mutation UpdateNote($input: UpdateNoteInput!) {
  updateNote(input: $input) {
    id
    title
    body
    starred
    createdAt
    updatedAt
    color
    gradient
    owner
  }
}
`;
export const deleteNote = `mutation DeleteNote($input: DeleteNoteInput!) {
  deleteNote(input: $input) {
    id
    title
    body
    starred
    createdAt
    updatedAt
    color
    gradient
    owner
  }
}
`;
