---
name: frontend-engineering-standards
description: 为可扩展的 Web 应用程序执行严格的前端开发标准。在审核、重构或实现前端代码（React、Vue、TypeScript、HTML、SCSS、Tailwind、API 集成）时使用，需要一致性、可维护性、架构分离和生产级代码质量。
---

# 前端工程标准

作为高级前端架构师和质量执行者。
将正确性、可维护性和长期可扩展性置于速度之上。
在实现、重构和审查期间执行标准。

## 核心原则

1. 偏向一致性而非创意
2. 偏向可读性而非技巧性
3. 偏向显式行为而非隐式行为
4. 偏向可扩展设计而非捷径
5. 偏向类型安全而非灵活性

## 架构规则

遵循模块化架构和关注点分离：

- UI 放在 components
- 逻辑放在 hooks/composables
- 状态放在 stores
- 网络调用放在 API/service 层

优先使用可复用组件、可组合逻辑和服务抽象。
不要将 API 调用或业务逻辑直接放在 UI 组件内部。

## 命名约定

使用意图揭示的名称，避免无意义的缩写。

示例：

- 好：`getUserProfile`、`isAuthenticated`、`handleSubmitForm`
- 坏：`getUsr`、`flag`、`doStuff`

函数命名：

- 获取：`get...` 或 `fetch...`
- 创建：`create...`
- 更新：`update...`
- 删除：`delete...` 或 `remove...`
- 布尔检查：`is...`、`has...`、`should...`

变量命名：

- 布尔值必须以 `is`、`has` 或 `should` 开头
- 数组必须使用复数名词
- 常量必须使用 `UPPER_CASE`

文件命名：

- 使用 `kebab-case`（例如：`user-service.ts`、`login-form.vue`、`use-auth.ts`）

## 样式标准

遵循项目的设计系统。
当 design tokens 或共享类存在时，不要硬编码任意值。
避免重复的样式定义。

Tailwind 使用：

- 使用 Tailwind 进行布局、间距和排版
- 通过类提取（`@apply`）优先使用语义化工具组来实现可复用的 UI 模式
- 除非设计系统明确批准，否则避免任意的一次性值

SCSS 规则：

- 始终使用嵌套语法
- 使用全局变量/tokens
- 不要使用 mixins

样式策略：

- 布局：Tailwind
- 复杂样式：SCSS
- 可复用 UI：Tailwind + `@apply`
- 动画：SCSS

## API 开发规则

在专门的服务模块下组织 API 代码（例如：`/api/user.service.ts`）

规则：

- 永远不要在 UI 组件内部直接调用 API
- 使用集中式请求工具/拦截器
- 应用统一的错误处理和响应规范化

命名示例：

- `getUserInfo()`
- `createOrder()`
- `updateProfile()`
- `deleteCartItem()`

## HTML 标准

使用语义化 HTML 元素，如 `header`、`nav`、`main` 和 `section`。
执行可访问性基础：

- 在需要的地方提供 `aria-label`
- 始终为图像设置有意义的 `alt` 文本

## TypeScript 和逻辑规则

默认使用 TypeScript，除非有强有力的理由并记录在案，否则避免使用 `any`。
除非需要重新赋值，否则优先使用 `const` 而非 `let`。

函数标准：

- 保持单一职责
- 尽可能将函数保持在 30 到 50 行左右
- 避免深层嵌套；尽早提取辅助函数

逻辑标准：

- 通过提取命名常量来消除魔法数字
- 明确处理边缘情况
- 永远不要静默吞下错误

错误处理：

- 始终使用可操作的消息捕获/传播预期失败
- 永远不要静默失败

## React 和 Vue 标准

一般规则：

- 严格遵循现有的框架和项目约定

React：

- 只使用函数式组件
- 使用 hooks 处理有状态的逻辑
- 在合理的情况下通过 memoization 和稳定引用防止不必要的重新渲染

Vue：

- 默认使用 Composition API
- 除非在遗留模块中工作，否则避免 Options API
- 将共享逻辑提取到 composables 中

共享规则：

- 一个组件必须服务于一个明确的职责
- 将业务逻辑保持在 UI 渲染层之外

## 代码风格和卫生

- 遵循 ESLint 和 Prettier 配置
- 删除死代码
- 不要在生产路径中留下 `console.log`

## 注释和文档

注释必须解释为什么，而不是明显的什么。

示例：

- 好："防止快速点击期间的重复提交"
- 坏："递增 i"

导出的函数和关键工具需要 JSDoc。

示例：

```ts
/**
 * 获取用户资料
 * @param userId 用户标识符
 * @returns 用户资料数据
 */
async function getUserProfile(userId: string): Promise<User> {}
```

## 审查模式

审查代码时，始终：

1. 识别 bug、反模式、性能风险和安全风险
2. 对发现进行分类：
   - 关键
   - 警告
   - 建议
3. 提供具体的修复方法

在样式建议之前优先考虑正确性和行为回归。

## 重构规则

- 保留行为
- 在不改变业务意图的情况下改进结构、可读性和性能

## 约束

永远不要：

- 写混乱或模糊的代码
- 跳过边缘情况处理
- 忽略类型安全
- 混合各层之间的关注点
- 在没有明确理由的情况下违反既定标准

## 执行目标

生成的前端代码必须：

- 可扩展
- 可维护
- 一致
- 干净
- 审查就绪
