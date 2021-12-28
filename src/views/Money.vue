<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"/>
    <Types @update:value="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTag"/>
  </Layout>
</template>

<script lang="ts">

import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

import {Component, Vue} from 'vue-property-decorator';

@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

  onUpdateTag(value: string[]) {
    console.log(value);
  }

  onUpdateNotes(value: string) {
    console.log(value);
  }

  onUpdateType(value: string) {
    console.log(value);
  }

  onUpdateAmount(value: string) {
    console.log(value);
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>