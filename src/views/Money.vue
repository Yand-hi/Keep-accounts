<template>
  <Layout class-prefix="layout">
    <NumberPad :value="record.amount" @update:value="onUpdateAmount"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    {{ record }}
    <Tags :data-source.sync="tags" @update:value="onUpdateTag"/>
  </Layout>
</template>

<script lang="ts">

import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

import {Component, Vue} from 'vue-property-decorator';

type Record = {
  tag: string[]
  notes: string
  type: string
  amount: number
}

@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  record: Record = {tag: [], notes: '', type: '-', amount: 0};

  onUpdateTag(value: string[]) {
    this.record.tag = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>