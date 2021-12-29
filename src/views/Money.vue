<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTag"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue, Watch} from 'vue-property-decorator';
import model from '@/model';

const recordList = model.fetch();

@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '其它'];
  record: RecordItem = {tag: ['其它'], notes: '', type: '-', amount: 0};
  recordList: RecordItem[] = recordList;

  onUpdateTag(value: string[]) {
    this.record.tag = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  ;

  saveRecord() {
    // 这样只是push了record的引用；
    // record的value变化，之前push进去的也会被改变；
    // push之前对record进行深拷贝；
    const newRecord: RecordItem = model.clone(this.record);
    newRecord.time = new Date();
    this.recordList.push(newRecord);
  }

  @Watch('recordList')
  onRecordListChange() {
    model.save(this.recordList);
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>