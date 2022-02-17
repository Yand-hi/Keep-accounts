<template>
  <Layout class-prefix="layout" :style="{height:h+'px'}">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div class="notes">
      <FormItem file-name="📆 日期"
                type="date"
                placeholder="请输入日期"
                :value.sync="record.time"/>
      <FormItem file-name="📝 备注"
                placeholder="请输入备注~"
                :value.sync="record.notes"/>
    </div>
    <Tags @update:value="record.tags = $event"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tabs from '@/components/Tabs.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, NumberPad, FormItem, Tags},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  h = document.body.clientHeight;

  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0, time: new Date().toISOString()
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return this.$message({message: '请先选择标签', type: 'warning'})
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      this.$message({
        message: '已保存',
        type: 'success'
      });
      this.record.notes = '';
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 10px 0 5px;
}
</style>