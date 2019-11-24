<template>
  <div
    class="edit-note"
    :style="style"
  >
    <mat-container
      margin="0 auto"
      height="100%"
    >
      <mat-card
        padding="15px"
        round="2"
        :color="editingNote.color || '#ffffff'"
        :gradient="editingNote.gradient"
        height="calc(100% - 30px)"
      >
        <div class="edit-note-inner">
          <div>
            <mat-input
              v-model="editingNote.title"
              placeholder="Title"
            />
            <br>
            <mat-container display="flex">
              <mat-color-select
                v-model="editingNote.color"
              ></mat-color-select>
              <mat-color-select
                v-model="editingNote.gradient"
              ></mat-color-select>
            </mat-container>
          </div>
          <ckeditor :editor="editor" v-model="editingNote.body" :config="editorConfig"></ckeditor>
          <div>
            <mat-button
              color="primary-5"
              @click="save"
              space="right"
            >
              Save
            </mat-button>
            <mat-button
              color="blue-grey-5"
              @click="$emit('cancel')"
            >
              Cancel
            </mat-button>
          </div>
        </div>
      </mat-card>
    </mat-container>
  </div>
</template>

<script lang="ts">
import {
  Prop, Vue, Component, Watch,
} from 'vue-property-decorator';
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import theme from '@materiajs/theme';
import { CreateNoteInput, UpdateNoteInput } from '@/API';

@Component({
  components: {
    ckeditor: CKEditor.component,
  },
})
export default class EditNote extends Vue {
  @Prop({
    type: Object,
    default: () => ({
      body: '',
      color: null,
      gradient: null,
      starred: false,
      title: '',
    }),
  })
  // @ts-ignore
  note: CreateNoteInput;

  editor = ClassicEditor;

  // @ts-ignore
  editingNote: UpdateNoteInput = {};

  editorConfig = {};

  // @ts-ignore
  // eslint-disable-next-line
  get backgroundColor() {
    return theme.palette['light-blue-1'];
  }

  // @ts-ignore
  // eslint-disable-next-line
  get style() {
    return {
      // '--ck-color-base-background': theme.palette['light-blue-3'],
      // '--ck-color-text': theme.palette['light-blue-1'],
    };
  }

  save() {
    // @ts-ignore
    const input: CreateNoteInput = {
      ...this.editingNote,
    };
    this.$emit('saveNote', input);
  }

  @Watch('note')
  updateData(note: UpdateNoteInput) {
    this.editingNote = {
      body: note.body,
      color: note.color,
      gradient: note.gradient,
      id: note.id,
      starred: note.starred,
      title: note.title,
    };
  }
}
</script>

<style lang="scss">
  .edit-note {
    color: #333;
    height: 100%;
    display: flex;
    &-inner {
      display: grid;
      grid-template-rows: 110px 1fr;
      grid-gap: 15px;
      height: 100%;
    }
    .ck-editor {
      color: #333;
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      &__main {
        flex: 1;
      }
      &__editable {
        height: 100%;
      }
    }
  }
</style>
