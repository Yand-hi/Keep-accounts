const localStorageKeyName = 'tagList';

type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
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
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  }
};

export default tagListModel;