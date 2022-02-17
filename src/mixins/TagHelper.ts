import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了'
};

@Component
export class TagHelper extends Vue {
  createTag() {
    this.$prompt('请输入标签名', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showClose: false,
      customClass: 'messageBox'
    }).then(res => {
      // @ts-ignore
      const name = res.value
      if (name === '') {
        return;
      }
      if (name === null) {
        return;
      }
      this.$store.commit('createTag', name);
      if (this.$store.state.createTagError) {
        this.$message.warning(map[this.$store.state.createTagError.message] || '未知错误');
      }
    }).catch(err => {
      console.error(err)
    })
  }
}

export default TagHelper;