<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"
          class-prefix="type"/>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautiful(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          >
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
      <Chart :option="option"/>
    </ol>
    <div v-else class="noResult">
      快去记一笔吧 ~(≧∀≦)ゞ
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';

@Component({
  components: {Chart, Tabs}
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' :
        tags.map(t => t.name).join('，');
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
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;

    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf());
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].time).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.time), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.time).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;


  get option() {
    let resultList: any = [];
    let tagName: any = [];
    let num: any = [];
    let itemType: any = [];
    let sameName: any = [];
    const type = this.recordList.map(i => ({type: i.type}));
    const allTags = this.recordList.map(i => ({tags: i.tags}));
    const allAmount = this.recordList.map(i => ({amount: i.amount}));
    allAmount.forEach(item => {
      num.push(item.amount);
    });
    type.forEach(item => {
      itemType.push(item.type);
    });
    //  为 echarts 构造相同数据结构的 legend 和 series
    for (let i = 0; i < allTags.length; i++) {
      if (itemType[i] === '-') {
        let everyTag = allTags[i].tags[0].name;
        resultList.push({name: everyTag, value: num[i]});
        if (tagName.indexOf(everyTag) < 0) {
          tagName.push(allTags[i].tags[0].name);
        }
      }
    }
    //  去除 resultList 中重复 name 的项，并且将值相加
    for (let i = 0; i < resultList.length; i++) {
      if (itemType[i] === '-') {
        for (let j = resultList.length - 1; j > i; j--) {
          if (resultList[i].name == resultList[j].name) {
            resultList[i].value = (resultList[i].value * 1 + resultList[j].value * 1);
            sameName.push(j);
          }
        }
      }
    }
    for (let k = 0; k < sameName.length; k++) {
      resultList.splice(sameName[k], 1);
    }

    console.log(itemType);
    console.log(sameName);
    console.log(resultList);


    return {
      title: {
        text: '支出类型占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: tagName
      },
      series: [
        {
          name: '支出类型',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: resultList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };


}
</script>

<style lang="scss" scoped>

.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep {
  .type-tabs-item {
    background: #f5f5f5;

    &.selected {
      background: #2f77f1;

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