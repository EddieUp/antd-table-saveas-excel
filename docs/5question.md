## FAQ

### 遇到找不到`better-xlsx`的生命文件

请在项目中加入以下声明

```ts
declare module 'better-xlsx' {
  export class File {}
  export class Sheet {}
  export class Row {}
  export class Col {}
  export class Cell {}
}
```
