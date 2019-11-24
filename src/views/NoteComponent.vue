<template>
  <div
    class="note-component"
  >
    <mat-card
      padding="15px"
      round="1"
      @click="() => onClickNote()"
      :color="note.color || '#FFFFFF'"
      :gradient="note.gradient"
    >
      <mat-toolbar>
        {{ note.title }}
        <mat-menu
          v-model="menu"
          @click.stop
        >
          <mat-button slot="trigger">
            <i class="fas fa-ellipsis-v"></i>
          </mat-button>
          <mat-list>
            <mat-list-item @click="() => onClickNote()">
              Edit
            </mat-list-item>
            <mat-list-item @click="$emit('delete', note)">
              Delete
            </mat-list-item>
          </mat-list>
        </mat-menu>
      </mat-toolbar>
      <mat-container padding="0 15px">
        <div v-html="note.body"></div>
      </mat-container>
    </mat-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { CreateNoteInput, UpdateNoteInput } from '@/API';

@Component({})
export default class NoteComponent extends Vue {
  @Prop({})
  // @ts-ignore
  note: CreateNoteInput;

  menu = false;

  onClickNote() {
    this.menu = false;
    this.$emit('click', this.note);
  }
}
</script>

<style lang="scss" scoped>
  .note-component {
    margin-bottom: 15px;
  }
</style>
