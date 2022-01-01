function clone(data: any) {
  // 这样只是push了record的引用；
  // record的value变化，之前push进去的也会被改变；
  // push之前对record进行深拷贝；
  return JSON.parse(JSON.stringify(data));
}

export default clone;