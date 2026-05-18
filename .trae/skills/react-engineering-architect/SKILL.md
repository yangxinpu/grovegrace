---
name: react-engineering-architect
description: 提供专业 React 工程架构设计指南和规范，涵盖 React/TypeScript 项目的架构设计、代码复用、状态管理、性能优化等关键领域。确保代码的可维护性、可扩展性和高性能实现。
---

# React 工程架构规范 - Hooks 专项

## 角色目标

以高级 React 架构师视角准备，具备以下目标：

1. 构建可复用 Hooks，提升业务逻辑复用性
2. 降低复杂度，保持职责单一
3. 维护一套简洁、可复用的代码设计准则
4. 优化高效的渲染和加载性能
5. 构建长期可维护的项目架构体系

## 核心原则

1. 只使用优秀的第三方 Hooks
2. 业务逻辑分离多用组合少用继承
3. 保持数据的不可变性和单向数据流
4. 给每个依赖追根溯源，确保变化可追踪
5. 避免不必要的重复渲染

## Hook 设计规范

### 临时状态处理 Hook

遵循以下最佳实践：

1. 业务逻辑分离到自定义 Hook
2. 业务逻辑至少 30 秒内无状态转换才清除
3. 涉及表单、校验、时间处理优先考虑
4. 若有高级状态转换需求

### 组合与返回约束

1. 使用 `useXxx` 命名规则如 `useUser`、`useFetch`、`usePagination`
2. 特定参数，不污染外部
3. 默认暴露 `loading` 和 `error` 状态
4. 禁止在 Hook 内部直接操作 UI/DOM

### 标准模板

```ts
export function useXxx() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = async () => {}

  useEffect(() => {
    void execute()
  }, [])

  return { data, loading, error, execute }
}
```

### 组合模式

1. 拆分基础 Hook，`useFetch(url: string)`
2. Hook 包含合并基础 Hook 组合业务如 `useUserProfile`
3. 可控执行，提供 `execute/refetch` 函数方便控制是否自动执行

### 禁止模式

1. 单个 Hook 不超过 200 行
2. 一条 Hook 有多个职责
3. 避免 `useEffect` 当事件处理器
4. 避免缺乏缺失错误处理
5. 直接修改 state 完成非可控操作替代

## 代码规范

### 职责约束

1. 一个函数只负责一个职责
2. 避免业务逻辑放入 Hook/组件，尝试抽离到公共函数
3. 涉及时间片操作为 `Container + Presentational` 分离模式

### Props 处理规范

1. 使用 TypeScript 准确定义 props
2. 只读外部 props，禁止写入重复值

### JSX 可读性

1. 避免在 JSX 内嵌套复杂计算
2. 复杂计算提前使用 `useMemo` 避免重复计算

BAD:

```tsx
<div>{list.filter(i => i.active).length}</div>
```

GOOD:

```tsx
const activeCount = useMemo(() => list.filter(i => i.active).length, [list])
return <div>{activeCount}</div>
```

## 项目目录规范

```bash
src/
  components/
  pages/
    Home/
      components/
      hooks/
      styles/
      index.tsx
  hooks/
  store/
  services/
  utils/
  styles/
```

执行时分层方案路径分层：

1. `services/` 负责服务端数据访问
2. `store/` 负责全局状态管理
3. `hooks/` 负责抽离业务逻辑
4. `components/` 负责通用 UI 组件

## 状态管理分层

1. 局部状态用`useState`
2. 有复杂状态管理用`useReducer`
3. 全局共享状态用Zustand 或 Redux
4. 避免滥用即时状态更新导致全局污染

## Zustand 状态管理规范

### Store 设计原则

1. **职责分离**：每个 store 只管理单一领域的状态
2. **范式化数据**：使用范式化数据结构，避免深层嵌套
3. **不可变性**：永远不直接修改 state，始终创建新对象
4. **按需加载**：使用 `shallow` 比较避免不必要的重渲染

### Store 目录结构

```bash
store/
  auth/
    authStore.ts
    selectors.ts
    types.ts
  user/
    userStore.ts
    selectors.ts
    types.ts
  index.ts          # 统一导出
```

### Store 模板

```ts
// store/counterStore.ts
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    subscribeWithSelector((set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
      reset: () => set({ count: 0 }, false, 'reset'),
    })),
    { name: 'counter-store' }
  )
)
```

### Selector 最佳实践

```ts
// 使用 shallow 进行对象比较
import { shallow } from 'zustand/shallow'

const { count, user } = useStore(
  (state) => ({ count: state.count, user: state.user }),
  shallow
)

// 使用计算selector避免重复计算
const selectActiveUsers = (state) => state.users.filter(u => u.active)
const activeUsers = useStore(selectActiveUsers)

// 使用 subscribeWithSelector 监听特定变化
useCounterStore.subscribe(
  (state) => state.count,
  (count) => console.log('count changed to:', count)
)
```

### 异步操作规范

```ts
interface UserState {
  users: User[]
  loading: boolean
  error: Error | null
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    users: [],
    loading: false,
    error: null,
    fetchUsers: async () => {
      set({ loading: true, error: null }, false, 'fetchUsers/start')
      try {
        const users = await userService.getUsers()
        set({ users, loading: false }, false, 'fetchUsers/success')
      } catch (error) {
        set({ error, loading: false }, false, 'fetchUsers/error')
      }
    },
  }))
)
```

### 禁止模式

1. 禁止在 store 中直接操作 DOM
2. 禁止在 store 中包含业务逻辑，应该调用 service 层
3. 禁止创建过大的 store，单个 store 不超过 10 个状态字段
4. 禁止直接修改嵌套属性，使用展开运算符
5. 禁止在 render 阶段调用 setState

### 中间件使用规范

```ts
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

// 开发环境使用 devtools
// 生产环境使用 persist 进行持久化
export const useStore = create(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          // state
        }),
        {
          name: 'storage-key',
          partialize: (state) => ({ /* 只持久化部分字段 */ }),
        }
      )
    )
  )
)
```

## Router 路由管理规范

### 路由设计原则

1. **分层管理**：将路由配置与业务组件分离
2. **懒加载**：使用 React.lazy 和 Suspense 实现路由级代码分割
3. **类型安全**：使用 TypeScript 强化路由参数类型
4. **统一封装**：封装路由跳转和参数获取方法

### 目录结构规范

```bash
src/
  router/
    index.tsx           # 路由入口
    routes.ts            # 路由配置
    guards/              # 路由守卫
      AuthGuard.tsx
      RoleGuard.tsx
    components/         # 路由相关组件
      RouterOutlet.tsx
      NotFound.tsx
      Loading.tsx
```

### 路由配置规范

```ts
// router/routes.ts
export interface RouteConfig {
  path: string
  name: string
  component: LazyExoticComponent<any>
  meta?: RouteMeta
  children?: RouteConfig[]
}

export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  roles?: string[]
  keepAlive?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: lazy(() => import('@/pages/Home')),
    meta: { title: '首页' }
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: lazy(() => import('@/pages/UserProfile')),
    meta: { title: '用户详情' }
  }
]
```

### 路由守卫规范

```tsx
// router/guards/AuthGuard.tsx
interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

// router/guards/RoleGuard.tsx
interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useAuthStore()

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
```

### 路由使用规范

```tsx
// router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { AuthGuard } from './guards/AuthGuard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        )
      }
    ]
  }
])

export const AppRouter = () => <RouterProvider router={router} />
```

### 编程式导航规范

```tsx
// 使用 useNavigate hook
const navigate = useNavigate()

// 导航到指定路径
navigate('/home')

// 带状态导航
navigate('/user', { state: { fromDashboard: true } })

// 获取上一个路由状态
const location = useLocation()
const from = location.state?.from

// 替换当前 history 记录
navigate('/login', { replace: true })

// 带查询参数导航
navigate({ pathname: '/search', search: '?q=react' })
```

### 动态路由参数规范

```tsx
// 获取路由参数
const { id } = useParams<{ id: string }>()

// 获取查询参数
const [searchParams] = useSearchParams()
const query = searchParams.get('q')

// 使用 useRoutes 动态渲染
const element = useRoutes([
  { path: 'home', element: <Home /> },
  { path: 'about', element: <About /> }
])
```

### 路由懒加载规范

```tsx
// 使用 React.lazy 进行路由懒加载
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Settings = lazy(() => import('@/pages/Settings'))

// 配合 Suspense 使用
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>

// 预加载策略
const preloadDashboard = () => import('@/pages/Dashboard')
<Button onClick={preloadDashboard}>预加载</Button>
```

## useEffect 使用规范

1. 明确依赖数组内容
2. 通常提供清理函数特别是异步操作如请求、定时器等场景
3. 逻辑复用封装到 Hook，避免逻辑散落于多个组件

```ts
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  return () => clearInterval(timer)
}, [])
```

## 性能优化规范

需要时刻使用：

1. `useMemo` 缓存昂贵计算
2. `useCallback` 稳定回调引用
3. `React.memo` 减少子级不必要的重复渲染

不需要场景为：

1. 未做测量全面 memo 化
2. 渲染路径频繁且组件简单
3. 给函数无副作用触发导致组件重复渲染
```

## 表单处理规范

### 表单库选择

推荐使用 `react-hook-form` 配合 `zod` 进行表单处理和验证。

### 目录结构

```bash
src/
  forms/
    login/
      LoginForm.tsx
      LoginSchema.ts
      LoginValues.ts
    user/
      UserForm.tsx
      UserSchema.ts
      UserValues.ts
    components/
      FormField.tsx
      SubmitButton.tsx
```

### Zod 验证模式

```ts
// forms/user/UserSchema.ts
import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  email: z.string().email('请输入有效的邮箱'),
  age: z.number().min(18, '年龄必须大于18').max(100),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号'),
})

export type UserFormValues = z.infer<typeof UserSchema>
```

### React Hook Form 集成

```tsx
// forms/user/UserForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSchema, UserFormValues } from './UserSchema'

export const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
    }
  })

  const onSubmit = async (data: UserFormValues) => {
    console.log('Form submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '提交'}
      </button>
    </form>
  )
}
```

### Controller 组件封装

```tsx
// 用于与第三方组件（如 UI 库）集成
import { Controller } from 'react-hook-form'
import { Select } from 'antd'

export const FormSelect = ({ control, name, options }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <>
        <Select
          {...field}
          options={options}
          placeholder="请选择"
        />
        {fieldState.error && <span>{fieldState.error.message}</span>}
      </>
    )}
  />
)
```

### 表单验证规范

1. **实时验证**：使用 `mode: 'onChange'` 进行实时字段验证
2. **提交验证**：在提交时进行完整验证 `handleSubmit`
3. **延迟验证**：复杂验证使用 `delayError` 提升用户体验
4. **必填校验**：使用 `required` 标记必填字段

### 禁止模式

1. 禁止在表单组件内部直接处理 API 调用
2. 禁止使用受控组件处理复杂表单状态
3. 禁止跳过 schema 验证直接提交
4. 禁止在 `handleSubmit` 内部进行复杂计算

## API 调用方式规范

1. 统一 `services/` 目录管理 API，禁止组件直接请求
2. 使用 Tailwind、 CSS Modules 或 SCSS
3. 避免内联样式或全局样式污染渲染层

## 代码审查要点

1. 使用 ESLint + Prettier 统一代码格式
2. 审查时禁止遗留 `console.log`
3. 注释需要回答「为什么」而非「做了什么」，遵循标准「做了什么、为什么这么做、期望什么效果」
4. 复杂逻辑添加 JSDoc

```ts
/**
 * 获取用户详情
 * @param userId 用户ID
 */
```

## 重构审查清单

执行代码审查时需要检查的关键点：

1. `?? 规范`：确保无 Bug、未定义访问、控制流偏差、逻辑错误
2. `?? 规范`：检查规范偏离、潜在可维护风险防范
3. `?? 规范`：检查可读性、可测试性、结构优化建议

每次审查都要回答：

1. 定位：文件/函数/片段
2. 原因：反模式/性能问题
3. 修改建议：可执行、测试验证

## 质量标准

代码审查需要同时检查：

1. Hooks 规范是否严格执行
2. 业务逻辑分离职责单一原则
3. 可读性高、复杂度低
4. 保持函数可测试确保质量
5. 关键渲染路径必须确保优化过
6. 避免直接进入生产环节支持
