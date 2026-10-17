# tinyGem frontend

tinyGem 桌面音乐客户端的 UI 原型，基于 React 19、Vite 和 Tailwind CSS v4。
目前页面使用 `src/data.js` 中的模拟数据，尚未接入后端或网易云音乐接口。

## 技术栈

- React 19 + Vite
- Tailwind CSS v4（`@tailwindcss/vite` 插件）
- Phosphor Icons（`@phosphor-icons/react`）
- oxlint（代码检查）

## 快速开始

需要 Node.js 20 或更高版本。

```bash
cd frontend
npm install
npm run dev      # 启动开发服务器，默认 http://localhost:5173
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 构建生产版本，输出到 `dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run lint` | 运行 oxlint 检查 |

## 目录结构

```text
frontend/
├── public/          # 静态资源（favicon、图标）
├── src/
│   ├── App.jsx      # 页面与组件
│   ├── data.js      # 歌单、曲目等模拟数据
│   ├── index.css    # 全局样式与 Tailwind 入口
│   ├── App.css
│   ├── main.jsx     # 入口
│   └── assets/
├── index.html
└── vite.config.js
```

## 主要界面

- `Sidebar`：左侧导航与歌单
- `TopBar`：顶部搜索栏
- `HomePage` / `ExplorePage`：首页与发现页
- `TrackList`：曲目列表
- `RightIsland`：右侧信息面板
- `BottomBar`：底部播放控制栏
- `LyricsOverlay`：全屏歌词

## 后续计划

- 接入桌面端后端（方案待定）
- 用真实接口替换 `src/data.js` 中的模拟数据
