const localStorageKeyName = 'tagList';

type TagListModel = {
  data: string[]
  fetch: () => string[]
  save: () => void
  create: (name: string) => 'success' | 'duplicated'  //  联合类型
}

const tagListModel: TagListModel = {
  //  获取数据
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  //  保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  //  创建标签
  create(name) {
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push(name);
    this.save();
    return 'success';
  }
};

export default tagListModel;