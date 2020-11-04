## FAQ

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
