<template>
  <div class="tags">
    <div class="new">
      <button @click="creat">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="item in dataSource" :key="item"
          @click="select(item)"
          :class=" {selected : selectedTags.indexOf(item) >= 0} "
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];

  select(item: string) {
    this.selectedTags.length = 0;
    if (this.selectedTags.indexOf(item) >= 0) {
      this.selectedTags.length = 0;
    } else {
      this.selectedTags.push(item);
    }
    this.$emit('update:value', this.selectedTags);
  }

  creat() {
    const newTag = window.prompt('请输入标签名：')!;
    const index = this.dataSource?.indexOf(newTag)!;
    if (['', null].indexOf(newTag) < 0) {
      if (index >= 0) {
        alert('该标签已存在');
      } else if (this.dataSource) {
        //  使新建的tag总是在‘其他’前面
        const lastValue = this.dataSource.pop();
        this.$emit('update:dataSource', [...this.dataSource, newTag, lastValue]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  background: #fff;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $h: 24px;
      $bg: #d9d9d9;
      background: $bg;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 6px;

      &.selected {
        background: darken($bg, 50%);
        color: #fff;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>