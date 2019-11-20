<template>
  <div class="profile">
    <mat-button v-if="!loggedIn" @click="googleSignIn">
      Sign in
    </mat-button>
    <mat-button v-else @click="signOut">ELSE</mat-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Auth, Hub } from 'aws-amplify';
// @ts-ignore
import { components } from 'aws-amplify-vue';

@Component({
  components: {
    ...components,
  },
})
export default class AuthComponent extends Vue {
    loggedIn = false;

    menu: boolean = false;

    signOut() {
      Auth.signOut();
      this.menu = false;
    }
    // eslint-disable-next-line
    async googleSignIn() {
      // @ts-ignore
      // eslint-disable-next-line
      Auth.federatedSignIn({ provider: 'Google' });
    }
}

</script>

<style scoped lang="scss">
</style>
