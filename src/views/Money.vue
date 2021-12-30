<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    {{ recordList }}
    <div class="notes">
      <FormItem file-name="备注:"
                placeholder="请输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTag"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {NumberPad, Types, FormItem, Tags},
})
export default class Money extends Vue {
  tags = tagList;
  record: RecordItem = {tag: [], notes: '', type: '-', amount: 0};
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
    const newRecord: RecordItem = recordListModel.clone(this.record);
    newRecord.time = new Date();
    this.recordList.push(newRecord);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>