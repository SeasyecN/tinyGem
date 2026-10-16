# 网易云音乐第三方客户端（Rust）技术选型备忘录

## 1. 结论、范围与证据边界

**可以使用 GPUI，但是否采用应由目标平台、UI 偏好和小规模 POC 决定，目前尚未确认选型。**
本次仅针对 Windows、Linux、macOS 桌面客户端，不默认包含移动端，也不替用户决定首发系统。
本文属于资料级研究：未做实机验收、未调用账号接口、未做性能跑分；不提供启动时长、内存或包体数字。
下文以“已确认”表示文档或源码证据，“工程建议”表示取舍，“待验证”表示尚未实测的能力。

立项前需明确：
1. **操作系统**：优先验证哪个平台，是否要求同时发布三平台？
2. **UI 路线**：偏向 Rust 编写界面，还是接受 Web UI＋Rust 后端？
3. **播放底座**：先评估 `rodio + stream-download`，还是同时比较 libmpv？前者不意味着需要从零自研 HTTP 流层。

## 2. UI 候选与 GPUI 状态

| 候选 | 已确认的定位 | 工程取舍 |
| :--- | :--- | :--- |
| [GPUI](https://github.com/zed-industries/zed/blob/main/crates/gpui/README.md) | GPU 加速、Rust 自绘 UI；不是 WebView，也不等同于系统原生控件。 | 适合重视界面定制、愿承担框架演进成本的项目。 |
| [Tauri](https://github.com/tauri-apps/tauri) | Rust 后端＋系统 WebView；有前端生态和打包、托盘等设施。 | 熟悉 Web 且优先完整产品时，通常能减少 UI 与分发整合工作；仍需处理各平台 WebView 差异。 |
| [Iced](https://github.com/iced-rs/iced) | Elm 风格的 Rust 消息驱动 UI，支持异步任务；官方仍标注 experimental。 | 可独立选用，不只是 GPUI 的参考；需评估控件、定制与 API 演进成本。 |
| [Slint](https://github.com/slint-ui/slint) | `.slint` 声明式 DSL＋Rust 逻辑，官方承诺稳定 1.x API。 | 可独立选用；接受 DSL 时值得比较。许可含 GPLv3、Royalty-free、商业许可，应按条款与发行场景审查，闭源不等于只能付费。 |

**工程建议**：偏 Rust UI 和定制，可用 GPUI 做 POC；熟悉 Web 和产品交付则优先评估 Tauri；Iced/Slint 都是有效替代。
没有同业务负载实测，不能给这些框架作内存、速度或耗电排名。

### GPUI 版本、生态与许可
- **已确认**：官方 README 标注 pre-1.0，版本间经常存在 breaking changes，并要求最新 stable Rust。
- **已确认**：[crates.io 查询](https://crates.io/api/v1/crates/gpui)返回 GPUI 0.2.2，发布日期为 2025-10-22；不能用环境日期推导版本发布日期。
- **已确认**：当前入门文档使用 `gpui_platform`；不能假定与 crates.io 发布版 API 兼容。建议按可编译示例锁定配套版本，不直接拼接不同来源的示例。
- **已确认**：[GPUI Kit](https://github.com/longbridge/gpui-kit) 是 Longbridge 社区/第三方组件生态，不是 Zed 官方组件库；旧 gpui-component 仓库地址现指向 Kit，组件层仍保留该名称。
- **已确认**：Kit 固定匹配的 GPUI 并重新导出相关 API；Kit 的版本号不等于 GPUI 本体版本。其组件和商用案例是维护者陈述，不等于本项目已验收。
- **已确认**：GPUI 核心为 Apache-2.0；整个应用仍需审查组件、音频、接口和平台依赖，不能套用 Zed 编辑器或顶层库的许可。

### 桌面平台矩阵
以下后端状态取自当前 GPUI 开发文档；验证项尚未在本项目运行。

| 平台 | 已确认的基础 | 待验证的独立客户端能力 |
| :--- | :--- | :--- |
| macOS | Metal 渲染；当前平台拆分方案需要 `font-kit` 绘制字形。 | 中文 IME、Retina/多屏、主线程托盘、后台播放、Now Playing。 |
| Linux | 支持 X11/Wayland，桌面窗口至少启用其一。 | 目标发行版/桌面环境、驱动、输入法、分数缩放、托盘及休眠恢复。 |
| Windows | Win32 窗口、DirectWrite 文本；当前文档无需额外平台 feature。 | 中文 IME、DPI/多屏、隐藏窗口后的媒体控制、设备切换与安装分发。 |

**证据边界**：Zed 支持某个平台，不等于 GPUI 对任意独立应用已完全成熟；播放器的托盘、媒体会话和生命周期需单独验收。

## 3. 网易云接口候选与权限

本次研究的候选接入均为非官方实现，接口变更、账号风控、服务条款风险独立于 UI 选择；不推断所有接入形式都必须自行抓包。
- **Rust 候选一**：[gmg137/netease-cloud-music-api](https://github.com/gmg137/netease-cloud-music-api) 是 Rust API 库，不是 Node 服务。其 Cargo.toml 依赖 isahc/OpenSSL 等原生依赖，不能称为全 Rust 或零 C。
  该 manifest 未声明 license；仍需检查 LICENSE 文件、适用版本与完整依赖，不能据此为闭源分发背书。
- **Rust 候选二**：[SPlayer-Dev/ncm-api-rs](https://github.com/SPlayer-Dev/ncm-api-rs) 存在。其“Enhanced 移植、300+ API”属于维护者声明，不是本次接口覆盖验证结果。
  两个 Rust 候选均需验证登录、个人歌单、播放 URL 和许可后再定；嵌入库可减少服务进程，但不代表没有原生依赖。
- **Node 服务候选**：[NeteaseCloudMusicApiEnhanced/api-enhanced](https://github.com/NeteaseCloudMusicApiEnhanced/api-enhanced) 已核实存在，2026-10-03/05 有提交活动，只说明有近期维护信号，未验证接口可用性，也不作稳定性排名。
  若采用本机 sidecar 或可信自建实例，还需评估启动、认证、进程管理与分发；并非所有部署都要求 sidecar。
- **历史项目状态**：[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 于 2024-04-16 在 GitHub 归档；这不等于 npm 也停止更新。
- **客户端先例**：[gmg137/netease-cloud-music-gtk](https://github.com/gmg137/netease-cloud-music-gtk) 是 Linux 专用 Rust＋GTK4/Libadwaita＋GStreamer 客户端，GPLv3，并按 Git tag 依赖上述 Rust API 库。
  它可作实现先例，不是跨平台或生产稳定性的证明。

### 会话、版权与临时地址
- **工程建议**：优先使用本机或可信服务处理敏感 Cookie，避免提交给来源不明的公共 API；日志避免泄露凭据。
- **待验证**：扫码登录及可能的验证码/设备风控、个人歌单、有权播放 URL；不保证任意账号都能直接登录或播放。
- **范围边界**：会员、购买和地区版权限制仍适用；项目不设计绕过付费或 DRM，公开发布前应评估服务条款。
- **工程建议**：音源 URL 按临时且可能过期管理，按有效期或失效刷新，不作为永久资源地址依赖；是否缓存地址应结合有效期、凭据与条款判断，不强制全部定时刷新。

## 4. 在线播放：先评估现有适配，再决定是否换内核

| 维度 | rodio＋stream-download | libmpv |
| :--- | :--- | :--- |
| 定位 | rodio 是 Rust 播放库；配合现有下载/缓存适配评估在线播放。 | 原生多媒体播放底座，提供网络协议与缓存能力。 |
| 数据源 | rodio 本身不是 HTTP 下载器；stream-download 可桥接网络与同步 reader。 | 可减少自建网络播放管线的工作，但仍受服务器、URL 与网络条件影响。 |
| 依赖 | 按目标 OS 音频后端、codec 和完整依赖审查，不承诺静态零依赖或无原生库。 | 需评估 libmpv、FFmpeg 等构建、链接与分发。 |
| 许可 | rodio 自身 MIT/Apache-2.0 不覆盖完整依赖，例如 Symphonia 为 MPL-2.0。 | 默认 GPLv2-or-later；可用 `-Dgpl=false` 配置 LGPLv2.1-or-later，最终仍审查构建、依赖与链接方式。 |

### stream-download 的已确认能力与限制
- [文档](https://docs.rs/stream-download/latest/stream_download/)说明 `StreamDownload` 实现 `Read + Seek`，提供 HTTP Range 与缓存储存适配。
- [官方 basic_http 示例](https://github.com/aschey/stream-download-rs/blob/stream-download-v0.24.4/examples/examples/basic_http.rs)展示了与 rodio 的衔接，因此不应把“必须自研 HTTP 流层”作为采用 rodio 的前提。
- **工程建议**：先按可编译示例锁定配套组合，不在本备忘录强制指定最新版或随意绑定版本。
- **待验证**：真实网易云 URL、所需请求头/鉴权、有效期、Range 响应、缓冲、seek、取消、错误传播和 EOF 行为；现有适配不保证直接开箱即用。
- Range 能力取决于实际服务器支持及有效 URL，不能仅凭 `Accept-Ranges` 响应头判断；未发送该头的服务器也可能支持 Range。
- **线程边界**：网络下载可异步，但同步 `Read/Seek` 可能等待数据；下载任务、阻塞 reader/解码和 UI 线程应分开，不在 UI 线程执行阻塞读取。
- **音频边界**：输出回调不等待网络、磁盘或 UI；用缓冲连接下载、解码和输出。Tokio 任务不等于实时音频线程。
- **工程建议**：若此组合不满足在线播放验证，再比较 libmpv；不承诺任意网络抗抖、秒开或完整 Atmos 渲染。

## 5. 条件技术栈与系统集成

**仅当偏 Rust UI/业务、接受 GPUI 演进成本时，以下作为优先 POC 栈；不是已确认选型。**

| 分层 | 候选 | 条件与待验证项 |
| :--- | :--- | :--- |
| UI | GPUI＋Kit | 锁配套版本，验证目标平台交互和控件。 |
| 网络/异步 | Tokio＋reqwest＋serde | GPUI executor 不等于 Tokio runtime；桥接或独立运行时需匹配版本，结果通过消息回到 UI。 |
| 播放 | rodio＋stream-download 优先 POC | 验证真实在线播放；不满足再比较 libmpv。 |
| 接口 | 上述两个 Rust 候选，或 Node 服务 | 账号链路与许可核实后确定，不预设优胜者。 |
| 元数据 | SQLite（如 rusqlite） | 存歌单元数据、缓存索引；构建与依赖仍需审查。 |
| 会话 | keyring | 按平台选择凭据后端并验证可用性，不默认回退到明文保存 Cookie。 |
| 后续系统集成 | souvlaki＋tray-icon | 验证媒体会话、窗口隐藏、托盘事件循环和退出行为。 |

**已确认/边界**：GPUI 有自己的 executor；Zed 有 [gpui_tokio 桥接源码](https://github.com/zed-industries/zed/blob/main/crates/gpui_tokio/src/gpui_tokio.rs)，不等于所有发布组合直接兼容。
[souvlaki](https://docs.rs/souvlaki/latest/souvlaki/)提供媒体会话抽象：Linux MPRIS、Windows 需 HWND，macOS 有应用事件循环要求。
[tray-icon](https://github.com/tauri-apps/tray-icon)支持桌面托盘，但 macOS 主线程与 Linux 后端依赖需整合；有库不等于已适配 GPUI。
窗口内快捷键、后台媒体会话、自定义全局组合键是不同能力；Wayland 等环境下的全局组合键另行验证。

## 6. POC 顺序与待用户确认事项

1. **确认首发 OS 和 UI 偏好**：建议先在选定平台闭环，再扩展；若用户要求三平台同步，则按平台分别验收。
2. **接口先行**：合法会话、个人歌单、有权播放 URL、失效处理，并完成候选库许可审查。
3. **在线音频**：播放/暂停、seek、切歌、缓冲、取消/EOF、断网及 URL 过期；避免把局部下载文件误当成可靠完整流。
4. **UI 交互**：中文 IME、封面、歌词同步和长列表；先确认目标列表规模，再测试滚动表现，不预设万首需求。
5. **系统集成**：后台媒体控制、托盘隐藏/恢复/退出、设备切换、休眠唤醒及凭据库异常路径。
6. **分发验证**：在干净目标系统安装启动，检查原生库、权限与许可材料；这仍是待执行项。

MVP 暂不包含社交、直播、复杂音效；不设计绕过付费或 DRM，不预估未经验证的工期。
待用户决定：首发 OS、是否接受 Web UI、是否接受 libmpv 原生依赖、接口采用嵌入库还是可信服务。

## 7. 补充一手来源与研究限制

- [Slint 许可全文与选择说明](https://github.com/slint-ui/slint/blob/master/LICENSE.md)：Royalty-free 并非无条件许可，按条款与场景审查。
- [rodio 文档](https://docs.rs/rodio/latest/rodio/) / [CPAL](https://github.com/RustAudio/cpal)：播放库与平台音频 I/O 的职责不同。
- [Symphonia](https://github.com/pdeljanov/Symphonia) / [mpv](https://github.com/mpv-player/mpv)：核对解码依赖与最终构建许可。
- [keyring 文档](https://docs.rs/keyring/latest/keyring/)：凭据后端可用性需按目标系统和构建配置确认。

以上链接包含滚动主干、latest 文档及固定示例，内容可能演进；实现时记录所选版本和依赖锁文件。
所有“待验证”仍未完成实机或账号验收，资料存在、近期提交和维护者声明均不等于运行成功。
