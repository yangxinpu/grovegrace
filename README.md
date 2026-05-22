# GroveGrace

## 技术栈

React · TypeScript · Vite · React Router · Zustand · Axios · TailwindCSS · shadcn/ui

## 项目结构

```
├── public                     # 静态资源
│   └── favicon.ico            # favicon 图标
├── src                        # 源代码
│   ├── api                    # 请求封装
│   │   └── https.ts           # axios 实例
│   ├── assets                 # 静态资源
│   │   └── images             # 图片资源
│   ├── components             # 全局公用组件
│   ├── constants              # 全局常量
│   ├── hooks                  # 公用 hooks
│   ├── pages                  # 页面
│   │   ├── Main               # 主页面
│   │   │   ├── index.ts       # 模块入口
│   │   │   ├── index.tsx      # 页面组件
│   │   │   ├── config         # 局部配置
│   │   │   ├── utils          # 局部工具方法
│   │   │   └── components     # 业务组件
│   │   └── Login              # 登录页面
│   │       ├── index.ts       # 模块入口
│   │       └── index.tsx      # 页面组件
│   ├── router                 # 路由配置
│   ├── stores                 # Zustand 状态管理
│   │   └── useTheme.ts        # 主题切换 store
│   ├── types                  # TypeScript 类型定义
│   ├── utils                  # 全局工具方法
│   │   └── index.ts
│   ├── App.tsx                # 入口组件
│   ├── index.css              # 全局样式 & 主题变量
│   └── main.tsx               # 应用入口
├── index.html                 # HTML 模板（含防闪烁脚本）
├── tailwind.config.ts         # Tailwind 配置（暗色模式 & 品牌色）
├── vite.config.ts             # Vite 配置
├── eslint.config.js           # ESLint 配置
├── tsconfig.json              # TypeScript 配置
└── package.json
```

## 主题系统

基于 CSS 变量 + Tailwind `dark:` 变体 + Zustand store 的完整主题方案，支持 `light` / `dark` / `system` 三种模式。

### 暗色色板（默认）

| 用途 | 颜色名称 | HEX | CSS 变量 |
|---|---|---|---|
| 主背景 | 深黑 | `#0F0F10` | `--background` |
| 次背景 | 碳黑 | `#18181B` | `--secondary` / `--muted` |
| 卡片背景 | 深灰 | `#232326` | `--card` |
| 主文字 | 纯白 | `#F5F5F5` | `--foreground` |
| 次文字 | 浅灰 | `#B3B3B8` | `--muted-foreground` |
| 弱文字 | 灰色 | `#7A7A82` | `--muted-foreground` |
| 边框 | 深灰边框 | `#2E2E33` | `--border` |
| Hover | 微亮灰 | `#303036` | `--hover` |
| 高亮色 | 银白 | `#E7E7EA` | `--highlight` |
| 品牌强调色 A | 薄荷青 | `#19FAC6` | `--brand-a` |
| 品牌强调色 B | 科技蓝 | `#3BA2FE` | `--brand-b` |
| 强调 Hover A | 深薄荷青 | `#12D9AB` | `--brand-a-hover` |
| 强调 Hover B | 深科技蓝 | `#2287E8` | `--brand-b-hover` |
| 阴影 | 黑透明 | `rgba(0,0,0,0.35)` | `--shadow` |

### 亮色色板

| 用途 | HEX | CSS 变量 |
|---|---|---|
| 主背景 | `#F5F5F5` | `--background` |
| 次背景 | `#E8E8EA` | `--secondary` / `--muted` |
| 卡片背景 | `#FFFFFF` | `--card` |
| 主文字 | `#0F0F10` | `--foreground` |
| 次文字 | `#4A4A52` | `--muted-foreground` |
| 边框 | `#D4D4D8` | `--border` |
| Hover | `#E0E0E3` | `--hover` |
| 高亮色 | `#18181B` | `--highlight` |
| 品牌强调色 A | `#0FD9A6` | `--brand-a` |
| 品牌强调色 B | `#2B8AE0` | `--brand-b` |
| 强调 Hover A | `#0BC08E` | `--brand-a-hover` |
| 强调 Hover B | `#1A6FC4` | `--brand-b-hover` |
| 阴影 | `rgba(0,0,0,0.08)` | `--shadow` |

### 使用方式

```tsx
import { useTheme } from '@/stores/useTheme'

function ThemeToggle() {
  const { theme, resolved, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {resolved === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

Tailwind 品牌色工具类：

```html
<button className="bg-brand-a hover:bg-brand-a-hover text-primary-foreground">
  薄荷青按钮
</button>
```

## 字体

### 中文

思源黑体 · HarmonyOS Sans · 苹方 · 阿里巴巴普惠体

## 开发

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```
