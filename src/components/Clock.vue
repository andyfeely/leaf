<template>
  <div class="clock">
    {{ time }}
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Clock extends Vue {
  @Prop({ type: Object })
  user;

  time = '';

  startTime() {
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    m = Clock.checkTime(m);
    this.time = `${h}:${m}`;
    const t = setTimeout(this.startTime, 5000);
  }

  static checkTime(i) {
    if (i < 10) { i = `0${i}`; } // add zero in front of numbers < 10
    return i;
  }

  created() {
    this.startTime();
  }
}
</script>

<style lang="scss" scoped>
  .clock {
    position: fixed;
    bottom: 30px;
    right: 30px;
    color: white;
    font-size: 3rem;
  }
</style>
