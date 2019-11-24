// tslint:disable
// this is an auto generated file. This will be overwritten

export const getBookmark = `query GetBookmark($id: ID!) {
  getBookmark(id: $id) {
    id
    name
    url
    owner
  }
}
`;
export const listBookmarks = `query ListBookmarks(
  $filter: ModelBookmarkFilterInput
  $limit: Int
  $nextToken: String
) {
  listBookmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      url
      owner
    }
    nextToken
  }
}
`;
export const getNote = `query GetNote($id: ID!) {
  getNote(id: $id) {
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
export const listNotes = `query ListNotes(
  $filter: ModelNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
