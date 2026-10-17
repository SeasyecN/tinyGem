# AuraMusic - 主流现代流媒体音乐客户端 UI

## 构建步骤（从0开始）

### 1. 初始化项目
```bash
npm create vite@latest ncm-client-react -- --template react
cd ncm-client-react
npm install tailwindcss @tailwindcss/vite @phosphor-icons/react zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. 把你手写的 HTML 翻译成 React 代码
我已经把你那份设计**直接翻译成 React 19 + Tailwind v4 + Phosphor Icons**，代码已写好，复制覆盖 `src/App.jsx` 即可。

```bash
# 直接复制我生成的代码覆盖 src/App.jsx
npm run dev
```

### 3. 构建命令（直接用）
```bash
npm run dev          # 开发（热更新）
npm run tauri dev    # 打包成桌面应用
npm run tauri build  # 正式打包
```

**我已经把你那份设计翻译好了**，现在你直接用我生成的 React 代码就行。

需要我把你手写的代码**直接复制进项目**，还是要我先给你一个**完整可运行的单文件模板**？  
直接说“给我单文件模板”我马上给你。