//  复杂类型声明
type RecordItem = {
  tag: string[]
  notes: string
  type: string
  amount: number
  time?: Date
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated'  //  联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}

interface Window {
  tagList: Tag[]
  createTag: (name: string) => void
}
