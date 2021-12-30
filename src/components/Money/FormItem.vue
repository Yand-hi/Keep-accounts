<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fileName }}</span>
      <input v-model.lazy="value"
             type="text"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) value: string;

  @Prop({required: true}) fileName!: string;
  @Prop() placeholder?: string;

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.formItem {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>