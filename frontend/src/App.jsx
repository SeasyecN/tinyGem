import { useState, useEffect, useRef } from 'react'
import {
  CaretLeft, CaretRight, House, MagnifyingGlass, Sparkle, Compass,
  SquaresFour, Heart, Books, Disc, VinylRecord, Headphones, SpeakerHigh,
  SpeakerSlash, MicrophoneStage, ArrowsOutSimple, SkipBack, SkipForward,
  Play, Pause, Shuffle, Repeat, Waveform, Quotes, CaretDown, PlayCircle
} from '@phosphor-icons/react'
import { playlists, initialTracks, formatTime } from './data.js'

/* ─────────────────────────────────────────────
   顶栏：红绿灯 + 历史导航 + 搜索 + 主题切换 + 头像
───────────────────────────────────────────── */
function TopBar({ go, onSearch, theme, setTheme, openLyrics }) {
  const themes = [
    ['spotify', 'Spotify 暗黑岛屿'],
    ['apple-dark', 'Apple 流体深色'],
    ['apple-light', 'YesPlay 纯白'],
  ]
  return (
    <header className="h-12 px-3 flex items-center justify-between shrink-0 z-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pl-1">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <button onClick={() => go('home')} className="w-8 h-8 rounded-full island flex items-center justify-center hover:opacity-80 transition" title="后退">
            <CaretLeft weight="bold" size={14}/>
          </button>
          <button onClick={() => go('explore')} className="w-8 h-8 rounded-full island flex items-center justify-center hover:opacity-80 transition" title="前进">
            <CaretRight weight="bold" size={14}/>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 max-w-lg mx-4">
        <button onClick={() => go('home')} className="w-10 h-10 rounded-full island flex items-center justify-center shrink-0 hover:scale-105 transition" title="主页">
          <House weight="fill" size={18}/>
        </button>
        <div className="flex-1 h-10 rounded-full island px-4 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-white/20 transition">
          <MagnifyingGlass size={16} style={{ color: 'var(--text-secondary)' }}/>
          <input type="text" onChange={e => onSearch(e.target.value)} placeholder="想听什么？搜索歌曲、艺人、专辑..."
            className="bg-transparent text-sm w-full focus:outline-none placeholder:text-neutral-500"/>
          <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-neutral-500/10" style={{ color: 'var(--text-secondary)' }}>⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="island rounded-full p-1 flex items-center text-xs font-medium">
          {themes.map(([key, label]) => (
            <button key={key} onClick={() => setTheme(key)}
              className={`px-3 py-1 rounded-full transition ${theme === key ? 'bg-[#1ed760] text-black font-semibold' : 'hover:opacity-80'}`}
              style={theme === key ? { color: '#000' } : { color: 'var(--text-secondary)' }}>
              {label}
            </button>
          ))}
        </div>
        <button onClick={openLyrics} className="h-9 px-3 rounded-full island flex items-center gap-1.5 text-xs font-medium hover:scale-105 transition" title="打开 Apple Music 流体全屏歌词">
          <Sparkle weight="fill" className="text-rose-500"/>
          <span className="hidden lg:inline">流体歌词页</span>
        </button>
        <button className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="User" className="w-full h-full object-cover"/>
        </button>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────
   左侧岛：导航 + 音乐库 + 歌单列表
───────────────────────────────────────────── */
function Sidebar({ page, go, filterBy }) {
  const navBtn = (active) =>
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${active ? 'font-semibold bg-neutral-500/15' : 'font-medium hover:bg-neutral-500/10'}`
  return (
    <aside className="w-64 island rounded-2xl flex-col p-3 shrink-0 hidden md:flex overflow-hidden">
      <nav className="space-y-1 mb-4">
        <button onClick={() => go('home')} className={navBtn(page === 'home')}>
          <Compass weight="fill" size={18}/><span>现在就听</span>
        </button>
        <button onClick={() => go('explore')} className={navBtn(page === 'explore')} style={page !== 'explore' ? { color: 'var(--text-secondary)' } : {}}>
          <SquaresFour size={18}/><span>浏览与排行榜</span>
        </button>
        <button onClick={() => filterBy('liked', '我喜欢的音乐')} className={navBtn(false)} style={{ color: 'var(--text-secondary)' }}>
          <Heart weight="fill" size={18} className="text-rose-500"/><span>我喜欢的音乐</span>
        </button>
      </nav>

      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-secondary)' }}>
          <Books weight="bold" size={14}/><span>我的音乐库</span>
        </div>
        <button onClick={() => filterBy('all', '全部收藏曲目')} className="text-xs hover:underline" style={{ color: 'var(--text-secondary)' }}>重置</button>
      </div>

      <div className="flex items-center gap-1.5 px-2 mb-3">
        <button onClick={() => filterBy('all', '推荐歌单')} className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-500/15">歌单</button>
        <button onClick={() => filterBy('jpop', '日系 CityPop 精选')} className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-500/10 hover:bg-neutral-500/20" style={{ color: 'var(--text-secondary)' }}>艺人</button>
        <button onClick={() => filterBy('chill', '无损专辑库')} className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-500/10 hover:bg-neutral-500/20" style={{ color: 'var(--text-secondary)' }}>专辑</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {playlists.map(p => (
          <div key={p.id} onClick={() => filterBy(p.id, p.title)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-500/10 cursor-pointer transition group">
            <img src={p.cover} className="w-11 h-11 rounded-lg object-cover shrink-0 shadow-sm"/>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold truncate group-hover:text-[#1ed760] transition">{p.title}</div>
              <div className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>歌单 • {p.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

/* ── 曲目表 ── */
function TrackList({ tracks, playTrackById, currentTrack, isPlaying, filter, setFilter, filterTitle, searchKeyword }) {
  const filtered = tracks.filter(t => {
    const catMatch = filter === 'all' ? true : filter === 'liked' ? t.liked : t.category === filter
    const q = searchKeyword.toLowerCase()
    const searchMatch = !q || t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.album.toLowerCase().includes(q)
    return catMatch && searchMatch
  })
  const chip = (cat, label) => (
    <button key={cat} onClick={() => setFilter(cat, label)}
      className={`px-3 py-1 rounded-full ${filter === cat ? 'bg-neutral-500/15 font-medium' : 'hover:bg-neutral-500/10'}`}
      style={filter === cat ? {} : { color: 'var(--text-secondary)' }}>{label}</button>
  )
  return (
    <section className="space-y-3 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight">{filterTitle}</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-500/10" style={{ color: 'var(--text-secondary)' }}>{filtered.length} 首</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          {chip('all', '全部')}{chip('pop', '流行')}{chip('jpop', '日系')}{chip('chill', '轻音乐')}
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium border-b" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="col-span-1">#</div>
          <div className="col-span-6 sm:col-span-5">标题</div>
          <div className="col-span-4 hidden sm:block">专辑</div>
          <div className="col-span-5 sm:col-span-2 text-right">时长</div>
        </div>
        <div className="divide-y divide-transparent mt-1">
          {filtered.map((t, i) => {
            const isCurrent = currentTrack.id === t.id
            return (
              <div key={t.id} onClick={() => playTrackById(t.id)}
                className={`group grid grid-cols-12 items-center px-4 py-2.5 rounded-xl cursor-pointer transition ${isCurrent ? 'bg-neutral-500/15' : 'hover:bg-neutral-500/10'}`}>
                <div className="col-span-1 text-xs font-medium" style={{ color: isCurrent ? '#1ed760' : 'var(--text-secondary)' }}>
                  {isCurrent && isPlaying ? <Waveform weight="fill" size={16} className="animate-pulse"/> : i + 1}
                </div>
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3 overflow-hidden pr-2">
                  <img src={t.cover} className="w-10 h-10 rounded-lg object-cover shrink-0"/>
                  <div className="overflow-hidden">
                    <div className={`text-sm font-semibold truncate ${isCurrent ? 'text-[#1ed760]' : ''}`}>{t.title}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{t.artist}</div>
                  </div>
                </div>
                <div className="col-span-4 hidden sm:block text-xs truncate pr-2" style={{ color: 'var(--text-secondary)' }}>{t.album}</div>
                <div className="col-span-5 sm:col-span-2 flex items-center justify-end gap-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <Heart weight="fill" className={t.liked ? 'text-rose-500' : 'opacity-0 group-hover:opacity-40'}/>
                  <span>{formatTime(t.duration)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   首页：问候 + 快捷六宫格 + 为你打造 + 曲目表
───────────────────────────────────────────── */
function HomePage(props) {
  const { tracks, go, playTrackById, setFilter } = props
  return (
    <div className="relative z-10 p-6 space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">晚上好</h1>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-500/10" style={{ color: 'var(--text-secondary)' }}>
            无损流媒体引擎就绪
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tracks.slice(0, 6).map(t => (
            <div key={t.id} onClick={() => playTrackById(t.id)} className="group cursor-pointer h-14 rounded-xl bg-neutral-500/10 hover:bg-neutral-500/20 flex items-center justify-between pr-3 overflow-hidden transition">
              <div className="flex items-center gap-3 overflow-hidden">
                <img src={t.cover} className="w-14 h-14 object-cover shrink-0 shadow"/>
                <span className="text-sm font-bold truncate">{t.title}</span>
              </div>
              <button className="play-reveal w-9 h-9 rounded-full bg-[#1ed760] text-black flex items-center justify-center shadow-lg shrink-0">
                <Play weight="fill" size={14} className="ml-0.5"/>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">为你精心打造</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>根据你最近的听歌口味每日更新</p>
          </div>
          <button onClick={() => go('explore')} className="text-xs font-semibold hover:underline" style={{ color: 'var(--text-secondary)' }}>显示全部</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {playlists.map(p => (
            <div key={p.id} onClick={() => setFilter(p.id, p.title)} className="island-card group cursor-pointer p-3.5 rounded-2xl flex flex-col justify-between">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 shadow-md">
                <img src={p.cover} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                <button className="play-reveal absolute bottom-2.5 right-2.5 w-11 h-11 rounded-full bg-[#1ed760] text-black flex items-center justify-center shadow-xl hover:scale-105">
                  <Play weight="fill" size={18} className="ml-0.5"/>
                </button>
              </div>
              <div>
                <h3 className="text-sm font-bold truncate">{p.title}</h3>
                <p className="text-xs line-clamp-2 mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrackList {...props}/>
    </div>
  )
}

/* ─────────────────────────────────────────────
   浏览页：流派卡片 + 榜单
───────────────────────────────────────────── */
function ExplorePage({ tracks, filterBy, playTrackById }) {
  const genres = [
    ['jpop', 'CityPop 与日系摇滚', '日系霓虹', 'Tokyo Vibration', 'from-rose-500 to-orange-500', Disc],
    ['pop', '全球流行热单', '欧美流行', "Today's Top Hits", 'from-indigo-500 to-purple-600', VinylRecord],
    ['chill', 'Lo-Fi 与咖啡馆', '专注轻音', 'Deep Focus Beats', 'from-emerald-500 to-teal-600', Headphones],
    ['liked', '空間音訊发烧专区', '杜比全景声', 'Spatial Audio', 'from-amber-500 to-pink-600', SpeakerHigh],
  ]
  const groups = [
    { name: 'Apple Music 每日全球 Top 100', desc: '实时更新 • 全球流媒体播放量最高单曲' },
    { name: 'Spotify Viral 50 潮流榜', desc: '实时更新 • 社交媒体热度飙升最快曲目' },
  ]
  return (
    <div className="relative z-10 p-6 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">浏览与全球榜单</h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Apple Music 与 Spotify 官方同步热门流媒体企划</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {genres.map(([cat, title, name, sub, grad, Icon]) => (
          <div key={cat} onClick={() => filterBy(cat, title)}
            className={`cursor-pointer h-28 rounded-2xl p-4 bg-gradient-to-br ${grad} text-white font-bold text-lg flex flex-col justify-between overflow-hidden relative group`}>
            <span>{name}</span>
            <span className="text-xs font-normal opacity-85">{sub}</span>
            <Icon weight="fill" size={64} className="absolute -bottom-3 -right-3 opacity-25 group-hover:scale-110 transition"/>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(g => (
          <div key={g.name} className="island-card rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold">{g.name}</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{g.desc}</p>
            </div>
            <div className="space-y-2">
              {tracks.slice(0, 4).map((t, idx) => (
                <div key={t.id} onClick={() => playTrackById(t.id)} className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-500/10 cursor-pointer transition">
                  <div className="flex items-center gap-3">
                    <span className="w-4 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>{idx + 1}</span>
                    <img src={t.cover} className="w-10 h-10 rounded-lg object-cover"/>
                    <div>
                      <div className="text-sm font-semibold">{t.title}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.artist}</div>
                    </div>
                  </div>
                  <PlayCircle weight="fill" size={20} className="opacity-60 hover:opacity-100"/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   右侧岛：正在播放 + 实时歌词 + 音乐人卡片
───────────────────────────────────────────── */
function RightIsland({ track, activeLine, jumpToLyric, toggleLike, openLyrics }) {
  const [followed, setFollowed] = useState(false)
  return (
    <aside className="w-80 island rounded-2xl flex-col p-4 shrink-0 hidden xl:flex overflow-y-auto space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-tight truncate">{track.album}</span>
        <button onClick={openLyrics} className="text-xs px-2 py-1 rounded-lg bg-neutral-500/10 hover:bg-neutral-500/20 flex items-center gap-1 transition" style={{ color: 'var(--text-secondary)' }}>
          <ArrowsOutSimple weight="bold"/><span>全屏歌词</span>
        </button>
      </div>

      <div onClick={openLyrics} className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group">
        <img src={track.cover} alt="Album Cover" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="px-3 py-1.5 rounded-full bg-black/75 text-white text-xs font-medium flex items-center gap-1.5">
            <MicrophoneStage weight="fill"/> 进入沉浸歌词
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="overflow-hidden">
          <h3 className="text-lg font-bold tracking-tight truncate">{track.title}</h3>
          <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>{track.artist}</p>
        </div>
        <button onClick={toggleLike} className={`mt-1 text-xl hover:scale-110 transition ${track.liked ? 'text-rose-500' : 'opacity-40'}`}>
          <Heart weight="fill"/>
        </button>
      </div>

      <div className="rounded-2xl p-4 space-y-3 relative overflow-hidden transition-colors duration-700" style={{ backgroundColor: 'rgba(150, 150, 150, 0.08)' }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider">实时歌词</span>
          <button onClick={openLyrics} className="text-xs opacity-75 hover:opacity-100">展开</button>
        </div>
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {track.lyrics.map((line, i) => (
            <p key={i} onClick={() => jumpToLyric(i)}
              className={`cursor-pointer text-sm font-semibold transition-all duration-300 ${i === activeLine ? 'opacity-100 scale-[1.02]' : 'opacity-40 hover:opacity-70'}`}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden bg-neutral-500/10 border" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="h-28 w-full relative">
          <img src={track.cover} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
            <span className="text-xs font-bold text-white">关于音乐人</span>
          </div>
        </div>
        <div className="p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">{track.artist}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>每月 482.6 万听众</div>
            </div>
            <button onClick={() => setFollowed(f => !f)} className="px-3 py-1 rounded-full border text-xs font-semibold hover:scale-105 transition" style={{ borderColor: 'var(--text-secondary)' }}>
              {followed ? '已关注' : '关注'}
            </button>
          </div>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{track.bio}</p>
        </div>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────
   底部播放栏
───────────────────────────────────────────── */
function BottomBar({ track, isPlaying, togglePlay, prev, next, seconds, seek, volume, setVol, toggleLike, openLyrics }) {
  return (
    <footer className="h-20 px-4 flex items-center justify-between shrink-0 z-20">
      <div className="flex items-center gap-3.5 w-1/4 min-w-[180px]">
        <div onClick={openLyrics} className="w-14 h-14 rounded-xl overflow-hidden shadow-md shrink-0 cursor-pointer group relative">
          <img src={track.cover} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <CaretDown weight="bold" size={16} className="text-white rotate-180"/>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-2">
            <div onClick={openLyrics} className="text-sm font-semibold truncate cursor-pointer hover:underline">{track.title}</div>
            <button onClick={toggleLike} className={`hover:scale-110 transition shrink-0 ${track.liked ? 'text-rose-500' : 'opacity-40'}`}>
              <Heart weight="fill" size={14}/>
            </button>
          </div>
          <div className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{track.artist}</div>
        </div>
      </div>

      <div className="flex flex-col items-center max-w-xl w-2/4 gap-1.5">
        <div className="flex items-center gap-6">
          <button className="text-sm hover:opacity-100 opacity-60 transition" title="随机播放"><Shuffle weight="bold"/></button>
          <button onClick={prev} className="text-xl hover:scale-110 transition" title="上一首"><SkipBack weight="fill"/></button>
          <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition">
            {isPlaying ? <Pause weight="fill" size={16}/> : <Play weight="fill" size={16} className="ml-0.5"/>}
          </button>
          <button onClick={next} className="text-xl hover:scale-110 transition" title="下一首"><SkipForward weight="fill"/></button>
          <button className="text-sm hover:opacity-100 opacity-60 transition" title="单曲循环"><Repeat weight="bold"/></button>
        </div>
        <div className="w-full flex items-center gap-2.5 slider-wrapper">
          <span className="text-[11px] font-medium w-9 text-right" style={{ color: 'var(--text-secondary)' }}>{formatTime(seconds)}</span>
          <div className="relative flex-1 flex items-center">
            <input type="range" min="0" max="100" value={(seconds / track.duration) * 100 || 0} step="0.1"
              onChange={e => seek(Number(e.target.value))} className="sleek-slider w-full z-10"/>
          </div>
          <span className="text-[11px] font-medium w-9" style={{ color: 'var(--text-secondary)' }}>{formatTime(track.duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3.5 w-1/4 min-w-[180px]">
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-500/15" style={{ color: 'var(--text-secondary)' }} title="Apple ALAC / FLAC 无损音频流">
          <Waveform weight="bold"/> 无损
        </span>
        <button onClick={openLyrics} className="p-1.5 rounded-lg hover:bg-neutral-500/15 transition" title="沉浸全屏歌词">
          <Quotes weight="bold" size={16}/>
        </button>
        <div className="flex items-center gap-2 slider-wrapper">
          <button onClick={() => setVol(volume === 0 ? 80 : 0)} className="hover:opacity-80">
            {volume === 0 ? <SpeakerSlash weight="fill" size={16} className="text-rose-500"/> : <SpeakerHigh weight="fill" size={16}/>}
          </button>
          <input type="range" min="0" max="100" value={volume} onChange={e => setVol(Number(e.target.value))} className="sleek-slider w-20"/>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   全屏流体歌词覆盖层
───────────────────────────────────────────── */
function LyricsOverlay({ track, isPlaying, togglePlay, prev, next, activeLine, jumpToLyric, close }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 overflow-hidden text-white transition-all duration-500">
      <div className="absolute inset-0 bg-neutral-950 -z-20"></div>
      <img src={track.cover} className="mesh-anim absolute -top-1/4 -left-1/4 w-[130%] h-[130%] object-cover blur-[110px] opacity-65 -z-10 pointer-events-none"/>
      <div className="absolute inset-0 bg-black/35 backdrop-blur-2xl -z-10 pointer-events-none"></div>

      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium">
          <Waveform weight="fill" className="text-emerald-400"/>
          <span>24-Bit / 96kHz 无损云端串流</span>
        </div>
        <button onClick={close} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition" title="收起歌词页">
          <CaretDown weight="bold" size={18}/>
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl w-full mx-auto my-auto overflow-hidden z-10">
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6">
          <img src={track.cover} className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl object-cover shadow-[0_25px_70px_rgba(0,0,0,0.65)] border border-white/10 transition duration-500"/>
          <div className="w-full max-w-xs space-y-1 text-center lg:text-left">
            <h2 className="text-2xl font-extrabold tracking-tight">{track.title}</h2>
            <p className="text-base text-white/70">{track.artist}</p>
          </div>
          <div className="flex items-center gap-8 pt-2">
            <button onClick={prev} className="text-2xl text-white/80 hover:text-white transition"><SkipBack weight="fill"/></button>
            <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 transition">
              {isPlaying ? <Pause weight="fill" size={24}/> : <Play weight="fill" size={24} className="ml-0.5"/>}
            </button>
            <button onClick={next} className="text-2xl text-white/80 hover:text-white transition"><SkipForward weight="fill"/></button>
          </div>
        </div>
        <div className="lg:col-span-7 h-[55vh] overflow-y-auto space-y-6 pr-4 py-16">
          {track.lyrics.map((line, i) => (
            <p key={i} onClick={() => jumpToLyric(i)}
              className={`cursor-pointer text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug transition-all duration-500 origin-left ${
                i === activeLine ? 'text-white scale-100 blur-0' : 'text-white/30 hover:text-white/60 scale-95 blur-[0.5px]'
              }`}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-white/40 z-10">点击任意一行歌词即可直接跳转播放进度</div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   主应用：状态 + WebAudio 演示合成器
───────────────────────────────────────────── */
export default function App() {
  const [tracks, setTracks] = useState(initialTracks)
  const [page, setPage] = useState('home')
  const [theme, setTheme] = useState('spotify')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [filter, setFilterCat] = useState('all')
  const [filterTitle, setFilterTitle] = useState('热门飙升单曲')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showLyrics, setShowLyrics] = useState(false)
  const [volume, setVolume] = useState(80)

  const track = tracks[currentIndex]
  const activeLine = Math.min(track.lyrics.length - 1, Math.floor((seconds / track.duration) * track.lyrics.length))

  /* 主题切换 */
  useEffect(() => {
    document.body.classList.remove('theme-apple-light', 'theme-apple-dark')
    if (theme !== 'spotify') document.body.classList.add(`theme-${theme}`)
  }, [theme])

  /* 顶部环境渐变跟随当前曲目 */
  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-color', track.themeColor)
  }, [track])

  /* 播放进度 tick */
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setSeconds(s => {
        if (s + 0.25 >= track.duration) { next(); return 0 }
        return s + 0.25
      })
    }, 250)
    return () => clearInterval(id)
  }, [isPlaying, currentIndex])

  /* WebAudio 演示合成器（原版设计自带，之后换成 rodio 真播放） */
  const audioRef = useRef({ ctx: null, gain: null, timer: null })
  useEffect(() => {
    const a = audioRef.current
    if (isPlaying) {
      if (!a.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext
        a.ctx = new AC()
        a.gain = a.ctx.createGain()
        a.gain.connect(a.ctx.destination)
      }
      if (a.ctx.state === 'suspended') a.ctx.resume()
      a.gain.gain.value = (volume / 100) * 0.12
      clearInterval(a.timer)
      const playNote = () => {
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]
        const osc = a.ctx.createOscillator()
        const env = a.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(notes[Math.floor(Math.random() * notes.length)], a.ctx.currentTime)
        env.gain.setValueAtTime(0.001, a.ctx.currentTime)
        env.gain.exponentialRampToValueAtTime(0.18, a.ctx.currentTime + 0.08)
        env.gain.exponentialRampToValueAtTime(0.001, a.ctx.currentTime + 0.85)
        osc.connect(env); env.connect(a.gain)
        osc.start(); osc.stop(a.ctx.currentTime + 0.9)
      }
      playNote()
      a.timer = setInterval(playNote, 420)
    } else {
      clearInterval(a.timer)
    }
    return () => clearInterval(a.timer)
  }, [isPlaying])

  useEffect(() => {
    const a = audioRef.current
    if (a.gain) a.gain.gain.value = (volume / 100) * 0.12
  }, [volume])

  /* ── 动作 ── */
  const go = p => setPage(p)
  const filterBy = (cat, title) => { setFilterCat(cat); setFilterTitle(title); setPage('home') }
  const onSearch = val => {
    setSearchKeyword(val)
    setPage('home')
    setFilterCat('all')
    setFilterTitle(val ? `搜索结果: "${val}"` : '热门飙升单曲')
  }
  const togglePlay = () => setIsPlaying(p => !p)
  const playTrackById = id => {
    const idx = tracks.findIndex(t => t.id === id)
    if (idx !== -1) { setCurrentIndex(idx); setSeconds(0); setIsPlaying(true) }
  }
  const next = () => { setCurrentIndex(i => (i + 1) % tracks.length); setSeconds(0) }
  const prev = () => { setCurrentIndex(i => (i - 1 + tracks.length) % tracks.length); setSeconds(0) }
  const seek = pct => setSeconds((pct / 100) * track.duration)
  const jumpToLyric = i => { setSeconds((i / track.lyrics.length) * track.duration); setIsPlaying(true) }
  const toggleLike = () => setTracks(ts => ts.map((t, i) => i === currentIndex ? { ...t, liked: !t.liked } : t))

  return (
    <div className="h-screen w-screen flex flex-col p-2 gap-2 select-none">
      <TopBar go={go} onSearch={onSearch} theme={theme} setTheme={setTheme} openLyrics={() => setShowLyrics(true)}/>

      <div className="flex-1 flex gap-2 overflow-hidden min-h-0">
        <Sidebar page={page} go={go} filterBy={filterBy}/>

        <main className="flex-1 island rounded-2xl overflow-y-auto relative flex flex-col">
          <div className="h-64 w-full absolute top-0 left-0 pointer-events-none opacity-35 transition-colors duration-1000"
            style={{ background: 'linear-gradient(180deg, var(--dynamic-color) 0%, transparent 100%)' }}></div>
          {page === 'home'
            ? <HomePage tracks={tracks} go={go} playTrackById={playTrackById} currentTrack={track} isPlaying={isPlaying}
                filter={filter} setFilter={filterBy} filterTitle={filterTitle} searchKeyword={searchKeyword}/>
            : <ExplorePage tracks={tracks} filterBy={filterBy} playTrackById={playTrackById}/>}
        </main>

        <RightIsland track={track} activeLine={activeLine} jumpToLyric={jumpToLyric} toggleLike={toggleLike} openLyrics={() => setShowLyrics(true)}/>
      </div>

      <BottomBar track={track} isPlaying={isPlaying} togglePlay={togglePlay} prev={prev} next={next}
        seconds={seconds} seek={seek} volume={volume} setVol={setVolume} toggleLike={toggleLike} openLyrics={() => setShowLyrics(true)}/>

      {showLyrics && <LyricsOverlay track={track} isPlaying={isPlaying} togglePlay={togglePlay} prev={prev} next={next}
        activeLine={activeLine} jumpToLyric={jumpToLyric} close={() => setShowLyrics(false)}/>}
    </div>
  )
}
