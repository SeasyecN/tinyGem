// ── 假数据：之后换成 ncm-api-rs 的真实接口数据 ──

export const playlists = [
  {
    id: 'jpop',
    title: 'Tokyo CityPop 1983',
    subtitle: '山下达郎、竹内玛莉亚与都会霓虹夜色',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
    color: '#db2777'
  },
  {
    id: 'pop',
    title: 'Today’s Top Hits',
    subtitle: 'The Weeknd, Dua Lipa 全球流行风向标',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
    color: '#4f46e5'
  },
  {
    id: 'chill',
    title: 'Late Night Coding',
    subtitle: '深度心流：无歌词的后摇与电子环境音',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    color: '#059669'
  },
  {
    id: 'liked',
    title: 'Acoustic Morning',
    subtitle: '温暖原声吉他与独立民谣精选集',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    color: '#d97706'
  },
  {
    id: 'all',
    title: 'Spatial Audio 空间音频',
    subtitle: 'Apple Music 杜比全景声官方试音碟',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    color: '#7c3aed'
  }
]

export const initialTracks = [
  {
    id: 1,
    title: "Midnight Pretenders",
    artist: "亚兰知子 (Tomoko Aran)",
    album: "浮游空间 (Fuyuu Kuukan)",
    duration: 225,
    category: "jpop",
    liked: true,
    themeColor: "#be185d",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    bio: "日本昭和时期极具代表性的 City-Pop 女歌手，1983年发行的《浮游空间》被 The Weeknd 在《Out of Time》中采样后再度席卷全球流媒体榜单。",
    lyrics: [
      "I'm in love with you, 夜色温柔地笼罩东京湾",
      "车窗外划过高速道路连绵的琥珀色路灯",
      "Midnight Pretenders, 假装不在乎黎明的到来",
      "收录在黑胶沟槽里的萨克斯独奏轻轻响起",
      "就算只是一场清醒的梦，也别在今夜叫醒我",
      "Say you love me too, 在霓虹熄灭之前"
    ]
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours (Deluxe)",
    duration: 200,
    category: "pop",
    liked: true,
    themeColor: "#dc2626",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    bio: "加拿大流行天王 The Weeknd 创下 Spotify 历史最高播放量纪录的现象级神曲，将 80 年代复古合成器浪潮重新带回主流视野。",
    lyrics: [
      "I've been tryna call, I've been on my own for long enough",
      "Maybe you can show me how to love, maybe",
      "I'm going through withdrawals",
      "I look around and Sin City's cold and empty",
      "I said, ooh, I'm blinded by the lights",
      "No, I can't sleep until I feel your touch"
    ]
  },
  {
    id: 3,
    title: "Stay With Me (2026 Remaster)",
    artist: "松原みき (Miki Matsubara)",
    album: "POCKET PARK",
    duration: 248,
    category: "jpop",
    liked: true,
    themeColor: "#4f46e5",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
    bio: "松原美纪 1979 年出道单曲，跨越四十余年依然在全球流媒体平台保持超高热度的都会流行教科书。",
    lyrics: [
      "To you... yes, my love to you",
      "灰色夹克上还留着咖啡馆熟悉的香气",
      "Stay with me... 真夜中のドアをたたき",
      "敲响午夜的房门，挽留即将远行的心",
      "不愿告别那个有你在身边的季节"
    ]
  },
  {
    id: 4,
    title: "Weightless Horizon",
    artist: "Ólafur Arnalds & Nils Frahm",
    album: "Late Night Tales",
    duration: 192,
    category: "chill",
    liked: false,
    themeColor: "#0f766e",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    bio: "来自冰岛的新古典主义音乐人 Ólafur Arnalds，擅长将弱音钢琴、弦乐四重奏与温暖的模拟合成器融为一体。",
    lyrics: [
      "（纯音乐 / 冰岛弱音钢琴与大提琴室内乐）",
      "第一乐章：晨雾越过雷克雅未克海岸",
      "第二乐章：温暖的模拟磁带延音循环",
      "第三乐章：静谧归于深海"
    ]
  },
  {
    id: 5,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    category: "pop",
    liked: true,
    themeColor: "#7c3aed",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
    bio: "格莱美最佳流行专辑《Future Nostalgia》核心单曲，融合放克贝斯线与未来复古迪斯科节拍。",
    lyrics: [
      "If you wanna run away with me, I know a galaxy",
      "And I can take you for a ride",
      "I had a premonition that we fell into a rhythm",
      "Glitter in the sky, glitter in my eyes",
      "You want me, I want you, baby"
    ]
  },
  {
    id: 6,
    title: "Merry Christmas Mr. Lawrence",
    artist: "坂本龙一 (Ryuichi Sakamoto)",
    album: "1996 /Playing the Piano",
    duration: 264,
    category: "chill",
    liked: true,
    themeColor: "#334155",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80",
    bio: "世界级音乐巨匠坂本龙一传世代表作，清澈而充满宿命感的钢琴旋律跨越时代。",
    lyrics: [
      "（纯音乐 / 斯坦威三角钢琴独奏版）",
      "清冷的泛音在空旷音乐厅中缓缓回荡",
      "主旋律层层递进，克制而汹涌",
      "尾声渐弱，余音绕梁"
    ]
  }
]

export function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
