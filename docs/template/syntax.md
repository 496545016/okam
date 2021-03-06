# 模板语法

## 标签语法

小程序或快应用都只允许使用内部组件规定的标签，若想在小程序中写 HTML 标签，或者有将快应用标签转为小程序标签等标签转换场景，`okam`提供了配置项来支持标签控制转换，让使用者可以在构建阶段将标签经模板被编译，转为被映射的标签；

如何转换，用户可根据项目情况及自身习惯，通过在配置文件中添加 `component.template.transformTags` 配置项进行定制化转换支持:

配置项具体写法[详见配置定义 component.template.transformTags 部分](build/index#component)

## 数据绑定

* 基础数据

和百度智能小程序、微信小程序原生绑定方式一致，使用`{{}}`包裹 data 中的属性，`{{}}`中支持的简单运算的类型。
```html
<view>{{name}}</view>
```

* 动态属性

对于属性上的动态值，可以使用`:`指令绑定。动态值无需再用`{{}}`包裹
```html
<view :checked="dynamic"></view>
```

* 控制属性

在指令`if`、`elif`、`else`、`for`上的数据无需 `{{}}` 包裹

```html
<view if="flag"></view>
```

* 表达式

同百度智能小程序、微信小程序，且受限于它们，支持以下简单表达式：

   -- 数据访问(普通变量、属性访问)：`name` `array[0]` `object.a`<br>
   -- 逻辑运算符：`&& || !` <br>
   -- 算术运算: `+ - * / %`<br>
   -- 比较运算符: `> < >= <= === == !== != `<br>
   -- 条件运算符: `条件 ? 值1 : 值2`<br>
   -- 括号: `(1 + 2) * 3`<br>
   -- 字符串: `'hello' "hi "+"okam"` <br>
   -- 数值: `1`<br>
   -- 布尔: `true`<br>
   -- 字面量对象：如下

   ```
   <view :data-a="{a: 1, b: 2}">普通对象</view>
   <view :data-a="{foo, bar}">key和value相同的对象</view>
   <view :data-b="{...object, e: 5}">带扩展运算符的对象</view>
   ```

* 不支持

!>  不支持一次性插值语法（对应 Vue 的 `v-once` 指令）；<br>
    不支持原始 HTML； <br>
    不支持调用函数（包括Javascript对象上的函数及在JS逻辑层代码method中声明的函数）；<br>
    不支持过滤器（可通过computed 实现）；
