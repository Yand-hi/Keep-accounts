<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"
          class-prefix="type"/>
    <Tabs :data-source="intervalList"
          :value.sync="interval"
          class-prefix="interval"/>
    <ol>
      <li v-for="(group,key) in result" :key="group.title">
        <h3 class="title">{{ beautiful(group.title) }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          >
            <span>{{ tagString(item.tag) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<style scoped lang="scss">
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tagString(tag: Tag[]) {
    return tag.length === 0 ? '无' : tag.join(',');
  }

  beautiful(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('MM月D日');
    } else {
      return day.format('YYYY年MM月D日');
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;
    type HashTableValue = { title: string, items: RecordItem[] }

    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].time!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
    font-size: 18px;
  }
}
</style>