<template>
  <Layout>
    <div class="navBar">
      <span class="title">✍️编辑标签</span>
    </div>
    <div class="tags">
      <router-link class="tag"
                   v-for="tags in tags" :key="tags.id"
                   :to="`/labels/edit/${tags.id}`">
        <span><Icon name="label"/>{{ tags.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag"
              @click.native="createTag">新建标签
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component({
  components: {Button}
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreat() {
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
$color: #2f77f1;
$color-shadow: rgba(0, 0, 0, 0.25);
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  margin-top: 8px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: $color;
      margin-right: 16px;
    }
  }
}

.createTag {
  background: $color;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}

.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  margin: 0 auto;
  box-shadow: inset -3px 3px -3px 0 $color-shadow,
  inset 3px 3px -3px 0 $color-shadow;
}
</style>