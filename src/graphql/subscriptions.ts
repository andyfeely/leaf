// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateBookmark = `subscription OnCreateBookmark($owner: String!) {
  onCreateBookmark(owner: $owner) {
    id
    name
    url
    owner
  }
}
`;
export const onUpdateBookmark = `subscription OnUpdateBookmark($owner: String!) {
  onUpdateBookmark(owner: $owner) {
    id
    name
    url
    owner
  }
}
`;
export const onDeleteBookmark = `subscription OnDeleteBookmark($owner: String!) {
  onDeleteBookmark(owner: $owner) {
    id
    name
    url
    owner
  }
}
`;
export const onCreateNote = `subscription OnCreateNote($owner: String!) {
  onCreateNote(owner: $owner) {
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
export const onUpdateNote = `subscription OnUpdateNote($owner: String!) {
  onUpdateNote(owner: $owner) {
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
export const onDeleteNote = `subscription OnDeleteNote($owner: String!) {
  onDeleteNote(owner: $owner) {
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
