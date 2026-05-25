import { faker } from '@faker-js/faker/locale/zh_CN'

export interface MockQuote {
  id: number
  content: string
  author: string
  source: string
  category: 'philosophy' | 'literature' | 'science' | 'life' | 'wisdom'
  detailId: number
  createdAt: string
}

export interface MockQuoteDetail {
  id: number
  quoteId: number
  content: string
  author: string
  source: string
  category: 'philosophy' | 'literature' | 'science' | 'life' | 'wisdom'
  story: string
  background: string
  createdAt: string
}

const QUOTE_POOL: Omit<MockQuote, 'id' | 'detailId' | 'createdAt'>[] = [
  { content: '生活不是等待暴风雨过去，而是学会在雨中跳舞', author: '维维安·格林', source: '人生感悟', category: 'life' },
  { content: '一千个读者就有一千个哈姆雷特', author: '莎士比亚', source: '文学评论', category: 'literature' },
  { content: '路漫漫其修远兮，吾将上下而求索', author: '屈原', source: '离骚', category: 'literature' },
  { content: '宇宙不仅比我们想象的更奇怪，而且比我们能想象的更奇怪', author: '海森堡', source: '物理学与哲学', category: 'science' },
  { content: '世界上只有一种英雄主义，就是看清生活的真相之后依然热爱生活', author: '罗曼·罗兰', source: '米开朗琪罗传', category: 'life' },
  { content: '万物皆有裂痕，那是光照进来的地方', author: '莱昂纳德·科恩', source: '颂歌', category: 'life' },
  { content: '未经审视的人生不值得过', author: '苏格拉底', source: '申辩篇', category: 'philosophy' },
  { content: '我思故我在', author: '笛卡尔', source: '方法论', category: 'philosophy' },
  { content: '想象力比知识更重要', author: '爱因斯坦', source: '论科学', category: 'science' },
  { content: '知人者智，自知者明', author: '老子', source: '道德经', category: 'wisdom' },
  { content: '天行健，君子以自强不息', author: '周文王', source: '周易', category: 'wisdom' },
  { content: '真正的智慧是知道自己的无知', author: '苏格拉底', source: '对话录', category: 'wisdom' },
  { content: '人生如逆旅，我亦是行人', author: '苏轼', source: '临江仙', category: 'literature' },
  { content: '存在先于本质', author: '萨特', source: '存在与虚无', category: 'philosophy' },
  { content: '不要温和地走进那个良夜', author: '狄兰·托马斯', source: '不要温和地走进那个良夜', category: 'literature' },
]

const DETAIL_STORIES: Record<string, { story: string; background: string }> = {
  '维维安·格林': {
    story: '维维安·格林是一位英国作家和心理治疗师，她以独特的视角看待人生困境。这句话出自她的著作，表达了一种积极面对生活挑战的态度。她认为，生活中的困难和挫折是不可避免的，关键在于我们如何应对这些挑战。',
    background: '维维安·格林生活在20世纪，她的作品多关注人类心理和情感成长。这句话反映了她对人生哲学的深刻理解，鼓励人们在逆境中寻找成长的机会。',
  },
  '莎士比亚': {
    story: '莎士比亚在《哈姆雷特》中创造了这个经典比喻。他通过这句话表达了文学作品的多义性和读者解读的主观性。每个人根据自己的经历、情感和理解，会对同一部作品产生不同的感悟。',
    background: '莎士比亚是英国文艺复兴时期最伟大的剧作家和诗人。《哈姆雷特》是他最著名的悲剧作品之一，讲述了丹麦王子哈姆雷特为父报仇的故事。',
  },
  '屈原': {
    story: '这句诗出自屈原的代表作《离骚》，表达了诗人对理想的执着追求和不屈不挠的精神。屈原在政治上遭受挫折后，依然坚持自己的信念，不断探索前进的道路。',
    background: '屈原是中国战国时期楚国的政治家、诗人，被誉为中国浪漫主义文学的奠基人。《离骚》是中国古代最长的抒情诗，展现了屈原高尚的品格和深沉的爱国情怀。',
  },
  '海森堡': {
    story: '海森堡是量子力学的创始人之一，他提出的测不准原理彻底改变了人类对微观世界的认识。这句话反映了他对科学探索的谦逊态度，承认宇宙的奥秘远超人类的想象。',
    background: '维尔纳·海森堡是德国物理学家，1932年获得诺贝尔物理学奖。他的测不准原理是量子力学的核心概念之一，揭示了微观粒子的本质特性。',
  },
  '罗曼·罗兰': {
    story: '这句话出自罗曼·罗兰的《米开朗琪罗传》，是他对英雄主义的独特诠释。他认为真正的英雄不是没有恐惧和痛苦，而是在认清生活的残酷真相后，依然选择热爱和坚持。',
    background: '罗曼·罗兰是法国作家、音乐评论家，1915年获得诺贝尔文学奖。他的作品多关注人类精神力量和理想主义，《约翰·克利斯朵夫》是他的代表作。',
  },
  '莱昂纳德·科恩': {
    story: '这句诗出自科恩的歌曲《颂歌》。他用"裂痕"比喻人生的不完美和缺陷，认为正是这些不完美让光明得以照进我们的生命。这是一种深刻的人生哲学，鼓励人们接受自己的不完美。',
    background: '莱昂纳德·科恩是加拿大歌手、诗人和小说家，被誉为"音乐界的诗人"。他的作品以深沉、忧郁的风格著称，歌词充满哲学思辨和宗教意象。',
  },
  '苏格拉底': {
    story: '苏格拉底在雅典法庭上为自己辩护时说出这句话。他认为，未经反思的生活是没有价值的，真正的智慧来自于不断地质疑和审视自己的信念和行为。',
    background: '苏格拉底是古希腊哲学家，被誉为西方哲学的奠基人之一。他通过"苏格拉底式对话"启发人们思考，最终因"腐蚀青年"和"不敬神"的罪名被判处死刑。',
  },
  '笛卡尔': {
    story: '这是笛卡尔哲学体系的核心命题。他通过怀疑一切来寻找不可怀疑的真理，最终发现"我在思考"这一事实本身是不可怀疑的，从而确立了"我思故我在"的哲学基础。',
    background: '勒内·笛卡尔是法国哲学家、数学家和科学家，被誉为"现代哲学之父"。他创立了解析几何，提出了身心二元论，对后世哲学产生了深远影响。',
  },
  '爱因斯坦': {
    story: '爱因斯坦在一次演讲中表达了这一观点。他认为，想象力比知识更重要，因为知识是有限的，而想象力概括着世界上的一切，推动着进步，并且是知识进化的源泉。',
    background: '阿尔伯特·爱因斯坦是德国出生的理论物理学家，1921年获得诺贝尔物理学奖。他提出了相对论，彻底改变了人类对时间、空间和物质的认识。',
  },
  '老子': {
    story: '这句话出自《道德经》第三十三章。老子认为，了解他人是一种智慧，但了解自己才是真正的明智。这种自我认知是人生修养的最高境界。',
    background: '老子是中国古代哲学家，道家学派的创始人。《道德经》是中国历史上最伟大的哲学著作之一，以"道"为核心概念，阐述了宇宙万物的本源和规律。',
  },
  '周文王': {
    story: '这句话出自《周易》乾卦的象辞。"天行健"意为天道运行刚健有力，"君子以自强不息"则是说君子应该效法天道，不断自我完善，永不懈怠。',
    background: '周文王是周朝的奠基者，相传他在被囚禁期间推演了《周易》。《周易》是中国最古老的占卜和哲学著作，被誉为"群经之首"。',
  },
  '苏轼': {
    story: '这句词出自苏轼的《临江仙·送钱穆父》。他以"逆旅"比喻人生，表达了对人生短暂和无常的感慨。这种豁达的人生态度体现了苏轼超然物外的精神境界。',
    background: '苏轼是北宋文学家、书画家，"唐宋八大家"之一。他的诗词豪放飘逸，散文汪洋恣肆，书法自成一家，是中国文化史上罕见的全才。',
  },
  '萨特': {
    story: '这是萨特存在主义哲学的核心命题。他认为，人没有预定的本质，人首先存在，然后通过自己的选择和行动来定义自己。这一观点强调人的自由和责任。',
    background: '让-保罗·萨特是法国哲学家、作家，存在主义的代表人物。他拒绝接受1964年的诺贝尔文学奖，代表作有《存在与虚无》《恶心》等。',
  },
  '狄兰·托马斯': {
    story: '这首诗是托马斯最著名的作品之一，写给病重的父亲。他呼吁父亲不要平静地接受死亡，而是要像烈火一样燃烧到最后一刻，展现了对生命的强烈热爱。',
    background: '狄兰·托马斯是威尔士诗人、作家，以独特的语言风格和强烈的情感表达著称。他的诗歌充满音乐性和意象，对后世诗人产生了深远影响。',
  },
}

export function createMockQuote(overrides?: Partial<MockQuote>): MockQuote {
  const base = faker.helpers.arrayElement(QUOTE_POOL)
  const detailId = faker.number.int({ min: 1, max: 10000 })
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    detailId,
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    ...base,
    ...overrides,
  }
}

export function createMockQuoteList(count: number = 10): MockQuote[] {
  return Array.from({ length: count }, () => createMockQuote())
}

export function createMockQuoteDetail(quote: MockQuote): MockQuoteDetail {
  const authorInfo = DETAIL_STORIES[quote.author] || {
    story: `${quote.author}是一位杰出的思想家，这句话体现了其对人生的深刻洞察。通过这句名言，我们可以感受到作者对生命、智慧和人类处境的独特理解。`,
    background: `${quote.author}在${quote.source}中表达了这一思想，这句话至今仍激励着无数人思考人生的意义和价值。`,
  }

  return {
    id: quote.detailId,
    quoteId: quote.id,
    content: quote.content,
    author: quote.author,
    source: quote.source,
    category: quote.category,
    story: authorInfo.story,
    background: authorInfo.background,
    createdAt: quote.createdAt,
  }
}
