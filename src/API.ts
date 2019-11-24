/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateBookmarkInput = {
  id?: string | null,
  name: string,
  url: string,
};

export type UpdateBookmarkInput = {
  id: string,
  name?: string | null,
  url?: string | null,
};

export type DeleteBookmarkInput = {
  id?: string | null,
};

export type CreateNoteInput = {
  id?: string | null,
  title: string,
  body: string,
  starred?: boolean | null,
  createdAt: string,
  updatedAt: string,
  color?: string | null,
  gradient?: string | null,
};

export type UpdateNoteInput = {
  id: string,
  title?: string | null,
  body?: string | null,
  starred?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  color?: string | null,
  gradient?: string | null,
};

export type DeleteNoteInput = {
  id?: string | null,
};

export type ModelBookmarkFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  url?: ModelStringFilterInput | null,
  and?: Array< ModelBookmarkFilterInput | null > | null,
  or?: Array< ModelBookmarkFilterInput | null > | null,
  not?: ModelBookmarkFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelNoteFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  body?: ModelStringFilterInput | null,
  starred?: ModelBooleanFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  color?: ModelStringFilterInput | null,
  gradient?: ModelStringFilterInput | null,
  and?: Array< ModelNoteFilterInput | null > | null,
  or?: Array< ModelNoteFilterInput | null > | null,
  not?: ModelNoteFilterInput | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateBookmarkMutationVariables = {
  input: CreateBookmarkInput,
};

export type CreateBookmarkMutation = {
  createBookmark: {
    __typename: 'Bookmark',
    id: string,
    name: string,
    url: string,
    owner: string | null,
  } | null,
};

export type UpdateBookmarkMutationVariables = {
  input: UpdateBookmarkInput,
};

export type UpdateBookmarkMutation = {
  updateBookmark: {
    __typename: 'Bookmark',
    id: string,
    name: string,
    url: string,
    owner: string | null,
  } | null,
};

export type DeleteBookmarkMutationVariables = {
  input: DeleteBookmarkInput,
};

export type DeleteBookmarkMutation = {
  deleteBookmark: {
    __typename: 'Bookmark',
    id: string,
    name: string,
    url: string,
    owner: string | null,
  } | null,
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput,
};

export type CreateNoteMutation = {
  createNote: {
    __typename: 'Note',
    id: string,
    title: string,
    body: string,
    starred: boolean | null,
    createdAt: string,
    updatedAt: string,
    color: string | null,
    gradient: string | null,
    owner: string | null,
  } | null,
};

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput,
};

export type UpdateNoteMutation = {
  updateNote: {
    __typename: 'Note',
    id: string,
    title: string,
    body: string,
    starred: boolean | null,
    createdAt: string,
    updatedAt: string,
    color: string | null,
    gradient: string | null,
    owner: string | null,
  } | null,
};

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput,
};

export type DeleteNoteMutation = {
  deleteNote: {
    __typename: 'Note',
    id: string,
    title: string,
    body: string,
    starred: boolean | null,
    createdAt: string,
    updatedAt: string,
    color: string | null,
    gradient: string | null,
    owner: string | null,
  } | null,
};

export type GetBookmarkQueryVariables = {
  id: string,
};

export type GetBookmarkQuery = {
  getBookmark: {
    __typename: 'Bookmark',
    id: string,
    name: string,
    url: string,
    owner: string | null,
  } | null,
};

export type ListBookmarksQueryVariables = {
  filter?: ModelBookmarkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBookmarksQuery = {
  listBookmarks: {
    __typename: 'ModelBookmarkConnection',
    items: Array< {
      __typename: 'Bookmark',
      id: string,
      name: string,
      url: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetNoteQueryVariables = {
  id: string,
};

export type GetNoteQuery = {
  getNote: {
    __typename: 'Note',
    id: string,
    title: string,
    body: string,
    starred: boolean | null,
    createdAt: string,
    updatedAt: string,
    color: string | null,
    gradient: string | null,
    owner: string | null,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes: {
    __typename: 'ModelNoteConnection',
    items: Array< {
      __typename: 'Note',
      id: string,
      title: string,
      body: string,
      starred: boolean | null,
      createdAt: string,
      updatedAt: string,
      color: string | null,
      gradient: string | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateBookmarkSubscriptionVariables = {
  owner: string,
};

export type OnCreateBookmarkSubscription = {
  onCreateBookmark: {
    __typename: 'Bookmark',
    id: string,
    name: string,
    url: string,
    owner: string | null,
  } | null,
};

export type OnUpdateBookmarkSubscriptionVariables = {
  owner: string,
};

export type OnUpdateBookmarkSubscription = {
  onUpdateBookmark: {
    __typename: 'Bookmark',
    id: string,
    name: string,
    url: string,
    owner: string | null,
  } | null,
};

export type OnDeleteBookmarkSubscriptionVariables = {
  owner: string,
};

export type OnDeleteBookmarkSubscription = {
  onDeleteBookmark: {
    __typename: 'Bookmark',
    id: string,
    name: string,
    url: string,
    owner: string | null,
  } | null,
};

export type OnCreateNoteSubscriptionVariables = {
  owner: string,
};

export type OnCreateNoteSubscription = {
  onCreateNote: {
    __typename: 'Note',
    id: string,
    title: string,
    body: string,
    starred: boolean | null,
    createdAt: string,
    updatedAt: string,
    color: string | null,
    gradient: string | null,
    owner: string | null,
  } | null,
};

export type OnUpdateNoteSubscriptionVariables = {
  owner: string,
};

export type OnUpdateNoteSubscription = {
  onUpdateNote: {
    __typename: 'Note',
    id: string,
    title: string,
    body: string,
    starred: boolean | null,
    createdAt: string,
    updatedAt: string,
    color: string | null,
    gradient: string | null,
    owner: string | null,
  } | null,
};

export type OnDeleteNoteSubscriptionVariables = {
  owner: string,
};

export type OnDeleteNoteSubscription = {
  onDeleteNote: {
    __typename: 'Note',
    id: string,
    title: string,
    body: string,
    starred: boolean | null,
    createdAt: string,
    updatedAt: string,
    color: string | null,
    gradient: string | null,
    owner: string | null,
  } | null,
};
