<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">
        <Icon name="add"/>
        新增标签
      </button>
    </div>
    <ul class="current">
      <li v-for="tags in tagList" :key="tags.id"
          :class=" {selected: selectedTags.indexOf(tags) >= 0} "
          @click="toggle(tags)"
      >
        {{ tags.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tags: string) {
    this.selectedTags.length = 0;
    if (this.selectedTags.indexOf(tags) >= 0) {
      this.selectedTags.length = 0;
    } else {
      this.selectedTags.push(tags);
    }
    this.$emit('update:value', this.selectedTags);
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
      font-size: 16px;
      color: #2f77f1;
      border-bottom: 1px solid;
      padding: 0 4px;
      cursor: pointer;
    }
  }
}
</style>