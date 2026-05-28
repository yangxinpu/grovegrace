# GroveGrace

林下之风 - 纯净优质的名人名言与经典美文聚合平台

收录古今中外名人语录、哲理金句、传世散文、随笔好文，为用户提供摘抄素材、静心阅读、文案灵感的线上空间

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **路由管理**: React Router v6
- **状态管理**: Zustand
- **HTTP请求**: Axios
- **样式方案**: TailwindCSS + shadcn/ui
- **Mock数据**: MSW (Mock Service Worker)

## 功能模块

- **首页** - 精选内容展示
- **名言** - 名人名言列表与详情
- **文章** - 经典美文阅读
- **AI语音** - AI语音功能

## 项目结构

```
src/
├── api/              # API请求封装
├── components/       # 全局组件
├── pages/            # 页面组件
│   ├── Home/         # 首页
│   ├── Quote/        # 名言列表
│   ├── QuoteDetail/  # 名言详情
│   ├── Article/      # 文章列表
│   ├── ArticleDetail/# 文章详情
│   └── ...
├── stores/           # 状态管理
├── hooks/            # 自定义Hooks
├── types/            # 类型定义
├── utils/            # 工具函数
└── mocks/            # Mock数据
```
