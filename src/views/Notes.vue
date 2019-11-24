<template>
  <mat-container height="100%" display="flex">
    <mat-container
      flex="1">
      <mat-container
        max-width="700px"
        margin="auto"
      >
        <mat-toolbar>
          <h4>
            Notes
          </h4>
          <mat-button
            @click="onClickNew"
            color="light-blue-2"
          >
            New
          </mat-button>
        </mat-toolbar>
        <mat-input
          v-model="searchString"
          placeholder="Search notes"
        />
        <br>
        <div
          class="notes mat-scrollbar-hidden"
        >
          <transition-group
            appear
            name="list-completez"
            v-on="transitions.downUp"
          >
            <NoteComponent
              v-for="(note) in notes"
              :key="note.id"
              :note="note"
              @click="onClickNote"
              @delete="deleteNote"
              :ref="`note-${note.id}`"
            />
          </transition-group>
        </div>
      </mat-container>
    </mat-container>
    <mat-expansion
      v-model="showCreate"
      direction="left">
      <mat-container
        padding="15px 30px"
        :min-width="editWidth"
        margin="0 auto"
      >
        <edit-note
          @saveNote="saveNote"
          @cancel="onCloseEdit"
          :note="editingNote || undefined"
        />
      </mat-container>
    </mat-expansion>
  </mat-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import gql from 'graphql-tag';
// @ts-ignore
// eslint-disable-next-line
import { components } from 'aws-amplify-vue';
import { Auth } from 'aws-amplify';
// @ts-ignore
import transitions from '@materiajs/vue-materia/src/utils/transitions';
import { CreateNoteInput, UpdateNoteInput } from '@/API';
import { listNotes } from '../graphql/queries';
import { onCreateNote, onDeleteNote } from '@/graphql/subscriptions';
import { createNote, deleteNote, updateNote } from '@/graphql/mutations';
import EditNote from '@/components/EditNote.vue';
import NoteComponent from '@/views/NoteComponent.vue';

@Component({
  components: {
    NoteComponent,
    ...components,
    EditNote,
  },
  apollo: {
    listNotes: {
      query: gql(listNotes),
      variables: {
        limit: 500,
      },
    },
  },
})
export default class Notes extends Vue {
  @Prop() private msg!: string;

  owner = null;

  transitions = transitions;

  showCreate = false;

  editingNote: UpdateNoteInput | null = null;

  searchString = '';

  created() {
    Auth.currentAuthenticatedUser()
      .then((data: any) => {
        this.owner = data.username;
        this.$apollo.queries.listNotes.subscribeToMore({
          document: gql(onCreateNote),
          variables: {
            owner: this.owner,
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            // Here, return the new result from the previous with the new data
            this.showCreate = false;
            previousResult.listNotes
              .items
              .push(subscriptionData.data.onCreateNote);
            return previousResult;
          },
        });
        this.$apollo.queries.listNotes.subscribeToMore({
          document: gql(onDeleteNote),
          variables: {
            owner: this.owner,
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            const deleted = subscriptionData.data.onDeleteNote;
            const idx = previousResult
              .listNotes
              .items.findIndex((i: any) => i.id === deleted.id);
            if (idx > -1) {
              previousResult
                .listNotes
                .items.splice(
                  idx,
                  1,
                );
            }
            return previousResult;
          },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // @ts-ignore
  // eslint-disable-next-line
  get editWidth() {
    return `${window.innerWidth / 2}px`;
  }

  get notes(): UpdateNoteInput[] {
    // @ts-ignore
    const notes = this.listNotes ? this.listNotes.items : [];
    const sortedNotes = notes.sort((a: UpdateNoteInput, b: UpdateNoteInput) => {
      // @ts-ignore
      if (a.updatedAt < b.updatedAt) {
        return 1;
      }
      return -1;
    });
    if (this.searchString) {
      const searchString = this.searchString.toLowerCase();
      return sortedNotes.filter((note: any) => note.title.toLowerCase().includes(searchString)
        || note.body.toLowerCase().includes(searchString));
    }
    return sortedNotes;
  }

  onClickNote(note: UpdateNoteInput) {
    this.editingNote = note;
    this.showCreate = true;
  }

  onClickNew() {
    if (this.showCreate) {
      this.editingNote = null;
    }
    this.showCreate = !this.showCreate;
  }

  onCloseEdit() {
    this.showCreate = false;
    this.editingNote = null;
  }

  saveNote(input: UpdateNoteInput | CreateNoteInput) {
    this.$apollo.mutate({
      mutation: gql(input.id ? updateNote : createNote),
      variables: {
        input: {
          ...input,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      // update: (store, { data: { deleteBookmark: deleted } }) => {
      //   // Read the data from our cache for this query.
      //   const data: any = store.readQuery({
      //     query: gql(listBookmarks),
      //     variables: {
      //       limit: 500,
      //     },
      //   });
      //   const idx = data.listBookmarks.items.findIndex((i: any) => i.id === deleted.id);
      //   data.listBookmarks.items.splice(
      //     idx,
      //     1,
      //   );
      //   // Write our data back to the cache.
      //   store.writeQuery({ query: gql(listBookmarks), data });
      // },
      // Optimistic UI
      // Will be treated as a 'fake' result as soon as the request is made
      // so that the UI can react quickly and the user be happy
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   deleteBookmark: bookmark,
      // },
    }).then(({ data: { updateNote: updated, createNote: created } }) => {
      this.editingNote = null;
      this.showCreate = false;
      setTimeout(() => {
        this.$nextTick(() => {
          const ref = `note-${updated ? updated.id : created.id}`;
          const items: any = this.$refs[ref];
          items[0].$el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        });
      }, 500);
    });
  }

  deleteNote(note: UpdateNoteInput) {
    this.$apollo.mutate({
      mutation: gql(deleteNote),
      variables: {
        input: {
          id: note.id,
        },
      },
      // @ts-ignore
      update: (store, { data: { deleteNote: deleted } }) => {
        // Read the data from our cache for this query.
        const data: any = store.readQuery({
          query: gql(listNotes),
          variables: {
            limit: 500,
          },
        });
        const idx = data.listNotes.items.findIndex((i: any) => i.id === deleted.id);
        data.listNotes.items.splice(
          idx,
          1,
        );
        // Write our data back to the cache.
        store.writeQuery({ query: gql(listNotes), data });
      },
      // Optimistic UI
      // Will be treated as a 'fake' result as soon as the request is made
      // so that the UI can react quickly and the user be happy
      optimisticResponse: {
        __typename: 'Mutation',
        deleteNote: note,
      },
    }).then(() => {});
  }
}
</script>

<style lang="scss" scoped>
  .notes {
    max-height: calc(100vh - 210px);
    overflow: scroll;
    -ms-overflow-style: none;  // IE 10+
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
      display: none;  // Safari and Chrome
    }
    .list-complete-item {
      transition: all 1s;
      display: inline-block;
      margin-right: 10px;
    }
    .list-complete-enter, .list-complete-leave-to
      /* .list-complete-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }
    .list-complete-leave-active {
      position: absolute;
    }
  }
</style>
