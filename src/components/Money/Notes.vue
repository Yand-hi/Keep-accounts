<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input v-model.lazy="value"
             type="text"
             placeholder="请在这里输入备注">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value: string = '';

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.notes {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;
  background: #f5f5f5;

  .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>