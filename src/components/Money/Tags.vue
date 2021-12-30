<template>
  <div class="tags">
    <div class="new">
      <button @click="creat">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id"
          :class=" {selected : selectedTags.indexOf(tag) >= 0} "
          @click="select(tag)"
      >
        {{ tag.name }}
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

  select(tag: string) {
    this.selectedTags.length = 0;
    if (this.selectedTags.indexOf(tag) >= 0) {
      this.selectedTags.length = 0;
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

  creat() {
    const newTag = window.prompt('请输入标签名:')!;
    const index = this.dataSource?.indexOf(newTag)!;
    if (['', null].indexOf(newTag) < 0) {
      if (index >= 0) {
        window.alert('该标签已存在');
      } else if (this.dataSource) {
        this.$emit('update:dataSource', [...this.dataSource, newTag]);
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