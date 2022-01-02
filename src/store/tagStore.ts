import tagListModel from '@/models/tagListModel';

export default {
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(item => item.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('该标签已存在');
    } else if (message === 'success') {
      window.alert('添加标签成功');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};