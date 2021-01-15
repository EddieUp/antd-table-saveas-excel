## FAQ

### 打开导出的 excel 提示修复错误

一般是配置不正确导致的，例如合并单元格的配置，被合并的单元格的`colSpan`和`colRow`不能超过 1

### 下载的文件后缀为 zip

一般是导出的文件名的问题

### 找不到`better-xlsx`的声明文件

可以在项目中新建文件`better-xlsx.d.ts`，内容：

```ts
declare module 'better-xlsx' {
  export class File {}
  export class Sheet {}
  export class Row {}
  export class Col {}
  export class Cell {}
}
```
