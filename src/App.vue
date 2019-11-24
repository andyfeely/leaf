<template>
  <div id="app">
    <mat-toolbar
      :no-padding="true"
      z-index="5"
      color="blue-grey-1"
      size="lg"
    >
      <mat-nav-link @click="() => sidebar = !sidebar">
        <i class="fas logo fa-leaf"></i>
        Leaf
      </mat-nav-link>
      <mat-nav-link>
        <auth-menu
          v-if="signedIn"
        />
      </mat-nav-link>
    </mat-toolbar>
    <mat-container
      color="blue-grey-1"
      gradient="blue-grey-2"
      height="100%"
      width="100%"
      display="flex">
      <mat-expansion v-model="sidebar">
        <mat-container
          width="300px"
          height="100%"
        >
          <mat-list>
            <mat-list-item @click="$router.push({ name: 'bookmarks' })">
              Bookmarks
            </mat-list-item>
            <mat-list-item @click="$router.push({ name: 'notes' })">
              Notes
            </mat-list-item>
          </mat-list>
        </mat-container>
      </mat-expansion>
      <mat-container
        height="100%"
        width="100%"
      >
        <router-view/>
      </mat-container>
    </mat-container>
    <clock
      v-if="signedIn"
      :user="user"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Auth, Hub } from 'aws-amplify';
import AuthMenu from '@/components/AuthMenu.vue';
import Clock from '@/components/Clock.vue';

@Component({
  components: {
    AuthMenu,
    Clock,
  },
})
export default class App extends Vue {
  sidebar = false;

  signedIn = false;

  user = null;

  async created() {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        this.user = data.attributes;
        this.signedIn = true;
      })
      .catch((e) => {
        console.log(e);
      });
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          this.signedIn = true;
          this.$router.push({ name: 'bookmarks' });
          break;
        case 'signOut':
          this.signedIn = false;
          break;
        default:
      }
    });
  }
}
</script>

<style lang="scss">
  body, html {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  #app {
    height: 100%;
    display: grid;
    grid-template-rows: 75px 1fr;
    font-family: 'Rubik', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    a {
      color: inherit;
      text-decoration: none;
    }
    .logo.fa-leaf {
      margin-right: 15px;
    }
  }
</style>
