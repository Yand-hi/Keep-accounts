<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fileName }}</span>
      <template v-if="type === 'date'">
        <input :type="type||'text'"
               :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
        <Icon name="date"/>
      </template>
      <template v-else>
        <input :type="type||'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fileName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }

  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
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
  cursor: pointer;

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

  .icon {
    visibility: hidden;
  }
}
</style>