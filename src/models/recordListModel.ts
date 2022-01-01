import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  //  创建数据
  create(record: RecordItem) {
    const newRecord: RecordItem = clone(record);
    newRecord.time = new Date();
    this.data.push(newRecord);
  },

  //  获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },

  //  保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default recordListModel;