import { faker } from '@faker-js/faker/locale/zh_CN'

export interface MockSpeakingBook {
  id: number
  title: string
  description: string
  cover?: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: 'daily' | 'business' | 'travel' | 'academic' | 'social'
  articleCount: number
  duration: number
  rating: number
  createdAt: string
}

export interface MockSpeakingArticle {
  id: number
  bookId: number
  title: string
  content: string
  translation: string
  audioUrl?: string
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  keywords: string[]
  tips: string[]
  order: number
  createdAt: string
}

const BOOK_POOL: Omit<MockSpeakingBook, 'id' | 'articleCount' | 'duration' | 'rating' | 'createdAt'>[] = [
  {
    title: '日常英语口语入门',
    description: '适合英语初学者的日常口语练习，涵盖问候、购物、问路等常见场景，帮助你快速掌握基础会话能力。',
    cover: 'https://picsum.photos/400/300?random=201',
    level: 'beginner',
    category: 'daily',
  },
  {
    title: '商务英语实战手册',
    description: '专为职场人士设计，包含会议、谈判、邮件写作等商务场景，提升你的职场英语沟通能力。',
    cover: 'https://picsum.photos/400/300?random=202',
    level: 'intermediate',
    category: 'business',
  },
  {
    title: '旅游英语一本通',
    description: '出国旅行必备口语指南，涵盖机场、酒店、餐厅、景点等场景，让你的旅行更加顺畅。',
    cover: 'https://picsum.photos/400/300?random=203',
    level: 'beginner',
    category: 'travel',
  },
  {
    title: '学术英语写作与演讲',
    description: '适合研究生和学术工作者，包含论文写作、学术演讲、研讨会交流等内容。',
    cover: 'https://picsum.photos/400/300?random=204',
    level: 'advanced',
    category: 'academic',
  },
  {
    title: '社交英语会话技巧',
    description: '提升社交场合的英语表达能力，包含派对、约会、交友等场景，让你在社交中更自信。',
    cover: 'https://picsum.photos/400/300?random=205',
    level: 'intermediate',
    category: 'social',
  },
  {
    title: '英语面试通关秘籍',
    description: '针对求职面试场景设计，包含自我介绍、回答问题、薪资谈判等内容，助你成功拿到offer。',
    cover: 'https://picsum.photos/400/300?random=206',
    level: 'intermediate',
    category: 'business',
  },
  {
    title: '医疗英语专业会话',
    description: '医疗从业者专用，包含医患沟通、医疗报告、国际会议等专业场景。',
    cover: 'https://picsum.photos/400/300?random=207',
    level: 'advanced',
    category: 'business',
  },
  {
    title: '留学英语生存指南',
    description: '为留学生量身打造，涵盖校园生活、租房、银行、签证等必备场景。',
    cover: 'https://picsum.photos/400/300?random=208',
    level: 'intermediate',
    category: 'daily',
  },
]

const ARTICLE_TEMPLATES: { title: string; content: string; translation: string; keywords: string[]; tips: string[] }[] = [
  {
    title: '自我介绍',
    content: "Hello, my name is [Your Name]. I'm from [City/Country]. I work as a [Job Title] at [Company]. In my free time, I enjoy [Hobby]. It's nice to meet you!",
    translation: '你好，我叫[你的名字]。我来自[城市/国家]。我在[公司]担任[职位]。业余时间我喜欢[爱好]。很高兴认识你！',
    keywords: ['introduction', 'name', 'job', 'hobby'],
    tips: ['说话时保持微笑和眼神接触', '语速适中，不要过快', '可以适当加入一些个人特色'],
  },
  {
    title: '询问方向',
    content: "Excuse me, could you tell me how to get to [Destination]? Is it within walking distance or should I take a bus? Thank you so much for your help!",
    translation: '打扰一下，请问去[目的地]怎么走？是步行距离还是需要坐公交？非常感谢你的帮助！',
    keywords: ['direction', 'location', 'distance', 'transportation'],
    tips: ['使用礼貌用语开头', '确认是否需要交通工具', '记得表示感谢'],
  },
  {
    title: '餐厅点餐',
    content: "I'd like to have [Dish Name], please. Could you also recommend a good wine to go with it? And could I have a glass of water as well? Thank you!",
    translation: '我想要[菜名]。你能推荐一款搭配的酒吗？另外能给我一杯水吗？谢谢！',
    keywords: ['order', 'recommend', 'drink', 'water'],
    tips: ['使用"I\'d like"比"I want"更礼貌', '可以询问推荐', '记得说谢谢'],
  },
  {
    title: '购物砍价',
    content: "This looks nice! How much is it? That's a bit expensive. Could you give me a discount? What's the best price you can offer?",
    translation: '这个看起来不错！多少钱？有点贵。能给我打个折吗？你能给的最低价是多少？',
    keywords: ['price', 'discount', 'expensive', 'negotiate'],
    tips: ['先表达对商品的兴趣', '委婉地表示价格高', '询问最低价'],
  },
  {
    title: '预约见面',
    content: "I'd like to schedule a meeting with [Name]. Would next Tuesday at 2 PM work for you? If not, what time would be convenient? I'll send a calendar invite.",
    translation: '我想预约和[名字]见面。下周二下午2点可以吗？如果不方便，什么时间合适？我会发送日历邀请。',
    keywords: ['schedule', 'meeting', 'time', 'calendar'],
    tips: ['提供具体的时间选项', '询问对方是否方便', '确认后续跟进方式'],
  },
  {
    title: '电话沟通',
    content: "Hello, this is [Your Name] calling. May I speak to [Name]? It's regarding [Topic]. Could you please ask them to call me back at [Phone Number]?",
    translation: '你好，我是[你的名字]。请问[名字]在吗？是关于[话题]的。能请他回电话到[电话号码]吗？',
    keywords: ['phone', 'call', 'message', 'callback'],
    tips: ['先表明身份', '说明来电目的', '留下联系方式'],
  },
  {
    title: '表达观点',
    content: "In my opinion, [Topic] is very important because [Reason]. I believe that [Viewpoint]. What do you think about it? I'd love to hear your perspective.",
    translation: '在我看来，[话题]非常重要，因为[原因]。我认为[观点]。你怎么看？我想听听你的看法。',
    keywords: ['opinion', 'believe', 'think', 'perspective'],
    tips: ['使用"In my opinion"引出观点', '给出理由支持', '邀请对方分享看法'],
  },
  {
    title: '请求帮助',
    content: "I'm having trouble with [Problem]. Could you help me with it? I've tried [Solution] but it didn't work. Do you have any suggestions?",
    translation: '我在[问题]上遇到了困难。你能帮帮我吗？我试过[解决方案]但没用。你有什么建议吗？',
    keywords: ['help', 'trouble', 'solution', 'suggestion'],
    tips: ['清楚描述问题', '说明已尝试的方法', '请求具体建议'],
  },
]

export function createMockSpeakingBooks(): MockSpeakingBook[] {
  return BOOK_POOL.map((book, index) => ({
    ...book,
    id: index + 1,
    articleCount: faker.number.int({ min: 8, max: 20 }),
    duration: faker.number.int({ min: 30, max: 120 }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
  }))
}

export function createMockSpeakingArticles(bookId: number, count: number): MockSpeakingArticle[] {
  return Array.from({ length: count }, (_, index) => {
    const template = ARTICLE_TEMPLATES[index % ARTICLE_TEMPLATES.length]
    return {
      id: bookId * 100 + index + 1,
      bookId,
      title: template.title,
      content: template.content,
      translation: template.translation,
      duration: faker.number.int({ min: 3, max: 15 }),
      difficulty: index < count / 3 ? 'easy' : index < (count * 2) / 3 ? 'medium' : 'hard',
      keywords: template.keywords,
      tips: template.tips,
      order: index + 1,
      createdAt: faker.date.past({ years: 1 }).toISOString(),
    }
  })
}
