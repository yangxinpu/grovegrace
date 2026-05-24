import { faker } from '@faker-js/faker/locale/zh_CN'

export interface MockQuote {
  id: number
  content: string
  author: string
  source: string
  category: 'philosophy' | 'literature' | 'science' | 'life' | 'wisdom'
  createdAt: string
}

const QUOTE_POOL: Omit<MockQuote, 'id' | 'createdAt'>[] = [
  { content: '生活不是等待暴风雨过去，而是学会在雨中跳舞', author: '维维安·格林', source: '人生感悟', category: 'life' },
  { content: '未经审视的人生不值得过', author: '苏格拉底', source: '申辩篇', category: 'philosophy' },
  { content: '我思故我在', author: '笛卡尔', source: '方法论', category: 'philosophy' },
  { content: '想象力比知识更重要', author: '爱因斯坦', source: '论科学', category: 'science' },
  { content: '一千个读者就有一千个哈姆雷特', author: '莎士比亚', source: '文学评论', category: 'literature' },
  { content: '知人者智，自知者明', author: '老子', source: '道德经', category: 'wisdom' },
  { content: '天行健，君子以自强不息', author: '周文王', source: '周易', category: 'wisdom' },
  { content: '路漫漫其修远兮，吾将上下而求索', author: '屈原', source: '离骚', category: 'literature' },
  { content: '宇宙不仅比我们想象的更奇怪，而且比我们能想象的更奇怪', author: '海森堡', source: '物理学与哲学', category: 'science' },
  { content: '真正的智慧是知道自己的无知', author: '苏格拉底', source: '对话录', category: 'wisdom' },
  { content: '人生如逆旅，我亦是行人', author: '苏轼', source: '临江仙', category: 'literature' },
  { content: '世界上只有一种英雄主义，就是看清生活的真相之后依然热爱生活', author: '罗曼·罗兰', source: '米开朗琪罗传', category: 'life' },
  { content: '存在先于本质', author: '萨特', source: '存在与虚无', category: 'philosophy' },
  { content: '不要温和地走进那个良夜', author: '狄兰·托马斯', source: '不要温和地走进那个良夜', category: 'literature' },
  { content: '万物皆有裂痕，那是光照进来的地方', author: '莱昂纳德·科恩', source: '颂歌', category: 'life' },
]

export function createMockQuote(overrides?: Partial<MockQuote>): MockQuote {
  const base = faker.helpers.arrayElement(QUOTE_POOL)
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    ...base,
    ...overrides,
  }
}

export function createMockQuoteList(count: number = 10): MockQuote[] {
  return Array.from({ length: count }, () => createMockQuote())
}
