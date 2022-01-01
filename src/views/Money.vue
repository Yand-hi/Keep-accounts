<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
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

const recordList = recordListModel.fetch();

@Component({
  components: {NumberPad, Types, FormItem, Tags},
})
export default class Money extends Vue {
  tags = window.tagList;
  record: RecordItem = {tag: [], notes: '', type: '-', amount: 0};
  recordList: RecordItem[] = recordList;

  onUpdateTag(value: string[]) {
    this.record.tag = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    recordListModel.create(this.record);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save();
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