/**
 * Mock 数据层 —— 案例字段严格对齐 docs/prompt_generate_v2.txt 字段规范
 *
 * 案例字段：id(case_XXX)/title/source/source_url/publish_date(YYYYMMDD)/
 *           collect_date/version/category(六类)/review_status(六状态)/background/
 *           content(PDF链接)/process/result/profession(数组)/keywords(技术词数组)/
 *           professional_knowledge(数组)/ideological_elements(思政标签数组)/teaching_value
 */

// ============ 工具函数 ============
export function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function now() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/** 生成 YYYYMMDD 格式当天日期 */
export function todayCompact() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// ============ 案例分类（六类） ============
export const CASE_CATEGORIES = ['人物案例', '政策文件', '行业案例', '新闻资讯', '专业资料', '项目资料']

// ============ 案例状态（六种，见需求规格文档 V1.0 §3.2.1） ============
export const REVIEW_STATUSES = ['草稿', '待审核', '需补充', '审核驳回', '已发布', '已下线']

// 状态流转顺序（用于展示）
export const STATUS_FLOW = ['草稿', '待审核', '已发布']
export const STATUS_SIDE = ['需补充', '审核驳回', '已下线']

// ============ 案例来源方式（四种，见 V1.0 §4.8） ============
export const SOURCE_TYPES = ['网络采集', '人工导入', '教师上传', 'AI生成']

// ============ 思政标签（18 个，见 V1.0 §5.5，供 ideological_elements 选填） ============
export const IDEOLOGICAL_TAGS = [
  '科技自立自强', '自主创新', '科技报国', '攻坚克难', '团结协作', '严谨求实',
  '工匠精神', '家国情怀', '责任担当', '国际合作', '人民至上', '创新驱动发展',
  '文化自信', '诚实守信', '法治精神', '生态文明', '艰苦奋斗', '开拓进取',
]

// ============ 专业领域清单 ============
export const PROFESSIONS = [
  '国际经济与贸易', '法学', '运动训练', '英语', '德语', '数学与应用数学', '信息与计算科学',
  '应用物理学', '分子科学与工程', '生物技术', '生态学', '统计学', '工程力学', '机械设计制造及其自动化',
  '材料成型及控制工程', '机械电子工程', '工业设计', '微机电系统工程', '增材制造工程', '智能交互设计',
  '材料科学与工程', '材料物理', '高分子材料与工程', '复合材料与工程', '能源与动力工程',
  '电气工程及其自动化', '电子信息工程', '电子科学与技术', '通信工程', '微电子科学与工程',
  '光电信息科学与工程', '信息工程', '水声工程', '集成电路设计与集成系统', '人工智能', '柔性电子学',
  '自动化', '机器人工程', '计算机科学与技术', '软件工程', '信息安全', '物联网工程',
  '数据科学与大数据技术', '网络空间安全', '保密技术', '化学工程与工艺', '马克思主义理论',
  '低空技术与工程', '船舶与海洋工程', '海洋工程与技术', '航空航天工程', '飞行器设计与工程',
  '飞行器制造工程', '飞行器动力工程', '飞行器控制与信息工程', '探测制导与控制技术', '建筑学',
  '信息管理与信息系统', '工程管理',
]

// ============ 用户 ============
export const mockUsers = [
  { id: 1, username: 'student01', password: '123456', role: 'student', nickName: '张同学', avatar: '', phone: '13800000001', intro: '计算机学院本科生', status: 0, createTime: '2024-09-01' },
  { id: 2, username: 'teacher01', password: '123456', role: 'teacher', nickName: '李老师', avatar: '', phone: '13800000002', intro: '软件学院讲师，主讲软件工程', status: 0, createTime: '2024-09-01' },
  { id: 3, username: 'admin01', password: '123456', role: 'admin', nickName: '系统管理员', avatar: '', phone: '13800000003', intro: '平台管理员，负责内容与用户管理', status: 0, createTime: '2024-09-01' },
  { id: 4, username: 'student02', password: '123456', role: 'student', nickName: '王同学', avatar: '', phone: '13800000004', intro: '电子信息学院本科生', status: 0, createTime: '2024-09-10' },
  { id: 5, username: 'teacher02', password: '123456', role: 'teacher', nickName: '赵老师', avatar: '', phone: '13800000005', intro: '马克思主义学院讲师', status: 0, createTime: '2024-10-01' },
  { id: 6, username: 'teacher03', password: '123456', role: 'teacher', nickName: '钱老师', avatar: '', phone: '13800000006', intro: '计算机学院副教授', status: 0, createTime: '2025-01-01' },
  { id: 7, username: 'admin02', password: '123456', role: 'admin', nickName: '内容审核员', avatar: '', phone: '13800000007', intro: '平台内容审核', status: 0, createTime: '2025-02-01' },
  { id: 8, username: 'frozen01', password: '123456', role: 'student', nickName: '孙同学', avatar: '', phone: '13800000008', intro: '账号已被冻结', status: 1, createTime: '2025-03-01' },
]

// ============ 案例（字段对齐 prompt_generate_v2 规范） ============
export const mockCases = [
  {
    id: 'case_001', title: '钱学森归国与两弹一星精神',
    source: '人民日报', source_url: 'https://www.people.com.cn/case_001',
    publish_date: '20241001', collect_date: '20241001', version: 'V1.1',
    category: '人物案例', review_status: '已发布',
    background: '新中国成立初期，百废待兴，国防科技基础薄弱。钱学森放弃美国优厚待遇，历经艰难险阻毅然回国，主持我国火箭导弹与卫星研制，为国防现代化奠定根基。',
    content: 'https://case.example.com/files/case_001.pdf',
    process: '在极端困难的条件下，钱学森带领团队从零起步，突破了一个又一个关键技术，建立起我国独立的航天工业体系，培养了大批骨干人才。',
    result: '1964年第一颗原子弹爆炸成功，1970年东方红一号卫星发射成功，铸就了我国航天事业的里程碑。',
    profession: ['航空航天工程', '飞行器设计与工程', '机械设计制造及其自动化'],
    keywords: ['火箭技术', '导弹研制', '系统工程', '航天工业'],
    professional_knowledge: ['系统工程方法论', '复杂系统集成', '迭代开发与风险控制'],
    ideological_elements: ['家国情怀', '科技报国', '艰苦奋斗'],
    teaching_value: '适用于航空航天、机械类专业课程。结合系统工程与复杂项目管理知识点，引导学生体会家国情怀、科技报国的精神内涵。',
    views: 1280, createTime: '2024-10-01', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_002', title: '港珠澳大桥的建设智慧与工匠精神',
    source: '新华社', source_url: 'https://www.xinhuanet.com/case_002',
    publish_date: '20241105', collect_date: '20241105', version: 'V1.1',
    category: '行业案例', review_status: '已发布',
    background: '港珠澳大桥是世界最长的跨海大桥，被誉为"世纪工程"，其建设面临海底隧道、人工岛等世界级工程难题，施工环境复杂、精度要求极高。',
    content: 'https://case.example.com/files/case_002.pdf',
    process: '建设团队对每道工序精益求精，仅隧道沉管就进行了上千次试验，将误差控制在毫米级，创新多项施工工艺与质量管理方法。',
    result: '大桥于2018年正式通车，创造多项世界纪录，成为中国工程建设的亮丽名片。',
    profession: ['工程管理', '信息管理与信息系统', '机械电子工程'],
    keywords: ['跨海大桥', '沉管隧道', '工程质量管理', '结构健康监测'],
    professional_knowledge: ['项目质量管理', '过程改进', '缺陷预防'],
    ideological_elements: ['工匠精神', '攻坚克难', '团结协作'],
    teaching_value: '适用于工程管理、信息管理类课程。结合项目质量管理与过程改进知识点，诠释精益求精、追求卓越的工匠精神。',
    views: 1050, createTime: '2024-11-05', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_003', title: '个人信息保护法的法治力量',
    source: '法治日报', source_url: 'https://www.legaldaily.com.cn/case_003',
    publish_date: '20241210', collect_date: '20241210', version: 'V1.1',
    category: '政策文件', review_status: '已发布',
    background: '互联网时代，个人信息被滥用的现象频发，数据安全与隐私保护成为社会关切。《中华人民共和国个人信息保护法》于2021年正式施行，为数据治理提供法治依据。',
    content: 'https://case.example.com/files/case_003.pdf',
    process: '法律明确了个人信息处理的原则与边界，要求"告知-同意"，企业需建立数据合规体系，监管部门依法查处多起违法行为。',
    result: '多起违法收集个人信息案件被查处，用户数据权益得到有效保护，全社会数据法治意识显著提升。',
    profession: ['法学', '信息安全', '网络空间安全'],
    keywords: ['个人信息', '数据合规', '隐私保护', '告知-同意'],
    professional_knowledge: ['数据脱敏', '加密传输', '访问控制', '最小权限原则'],
    ideological_elements: ['法治精神', '人民至上', '诚实守信'],
    teaching_value: '适用于法学、信息安全类课程。结合数据合规与隐私保护技术知识点，强化法治意识与职业道德教育。',
    views: 960, createTime: '2024-12-10', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_004', title: '敦煌数字化的文化传承之路',
    source: '光明日报', source_url: 'https://www.gmw.cn/case_004',
    publish_date: '20250115', collect_date: '20250115', version: 'V1.1',
    category: '行业案例', review_status: '已发布',
    background: '敦煌莫高窟千年壁画面临风化和损坏风险，传统保护手段难以根本解决，数字化成为迫在眉睫的抢救性保护课题。',
    content: 'https://case.example.com/files/case_004.pdf',
    process: '数字化团队采用高精度扫描、三维重建、图像修复等技术，将洞窟文物"搬"进数字世界，构建海量数字资源库。',
    result: '"数字敦煌"上线，全球观众足不出户即可欣赏千年艺术，实现了文化遗产的永久保存与广泛传播。',
    profession: ['信息管理与信息系统', '人工智能', '智能交互设计'],
    keywords: ['数字化保护', '三维重建', '图像修复', '数字资源库'],
    professional_knowledge: ['高分辨率采集', '点云建模', '色彩还原', '大数据存储'],
    ideological_elements: ['文化自信', '创新驱动发展'],
    teaching_value: '适用于信息管理、人工智能类课程。结合图像处理与三维重建技术，让学生理解以现代科技守护中华优秀传统文化的意义。',
    views: 870, createTime: '2025-01-15', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_005', title: '科技小院：把论文写在祖国大地上',
    source: '中国青年报', source_url: 'https://www.cyol.com/case_005',
    publish_date: '20250220', collect_date: '20250220', version: 'V1.1',
    category: '新闻资讯', review_status: '已发布',
    background: '许多农科研究生常年驻扎农村"科技小院"，与农民同吃同住，将科研成果直接应用于田间地头，破解科研与生产脱节难题。',
    content: 'https://case.example.com/files/case_005.pdf',
    process: '师生们针对当地农业痛点开展攻关，推广智能化种植与数据监测技术，帮助农民科学决策、增产增收。',
    result: '科技小院模式推广至全国，成为高校服务乡村振兴、培养知农爱农新型人才的典范。',
    profession: ['物联网工程', '数据科学与大数据技术', '生态学'],
    keywords: ['智慧农业', '物联网', '数据监测', '乡村振兴'],
    professional_knowledge: ['传感器部署', '数据采集', '决策支持系统'],
    ideological_elements: ['人民至上', '开拓进取', '艰苦奋斗'],
    teaching_value: '适用于物联网、大数据类课程。结合传感器与数据分析技术，引导学生关注民生、勇担时代责任。',
    views: 740, createTime: '2025-02-20', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_006', title: '航空发动机"中国心"的攻坚之路',
    source: '人民网', source_url: 'https://www.people.com.cn/case_006',
    publish_date: '20250308', collect_date: '20250308', version: 'V1.1',
    category: '行业案例', review_status: '已发布',
    background: '航空发动机被誉为工业皇冠上的明珠，长期受制于人是我国航空工业的心头之痛，关键核心技术自主可控迫在眉睫。',
    content: 'https://case.example.com/files/case_006.pdf',
    process: '科研团队数十年如一日攻关高温合金、叶片精密加工、控制系统等核心技术，打破国外技术封锁，实现多型发动机自主研制。',
    result: '多型国产发动机研制成功，为国产大飞机装上"中国心"，我国航空动力自主保障能力大幅提升。',
    profession: ['航空航天工程', '能源与动力工程', '机械设计制造及其自动化'],
    keywords: ['航空发动机', '高温合金', '精密加工', '嵌入式控制'],
    professional_knowledge: ['实时操作系统', '可靠性设计', '容错机制', '实时调度'],
    ideological_elements: ['科技自立自强', '攻坚克难', '开拓进取'],
    teaching_value: '适用于航空航天、机械类课程。结合嵌入式高可靠性软件知识点，深化科技自立自强的价值认同。',
    views: 1320, createTime: '2025-03-08', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_007', title: '华为鸿蒙系统的技术突围',
    source: '新华网', source_url: 'https://www.xinhuanet.com/case_007',
    publish_date: '20250412', collect_date: '20250412', version: 'V1.1',
    category: '行业案例', review_status: '已发布',
    background: '面对外部技术封锁，我国基础软件面临"卡脖子"困境，华为自立自强研发鸿蒙操作系统，构建万物互联的生态体系。',
    content: 'https://case.example.com/files/case_007.pdf',
    process: '鸿蒙采用分布式架构设计，微内核与跨端协同，数千名工程师持续打磨代码质量，逐步完善开发生态。',
    result: '鸿蒙生态设备突破数亿台，成为全球第三大移动操作系统，国产基础软件实现重要突破。',
    profession: ['计算机科学与技术', '软件工程', '网络空间安全'],
    keywords: ['操作系统', '分布式架构', '微内核', '跨端协同'],
    professional_knowledge: ['微内核设计', '分布式架构', '任务调度', '内存管理'],
    ideological_elements: ['自主创新', '科技自立自强', '工匠精神'],
    teaching_value: '适用于计算机、软件工程类课程。结合操作系统架构设计知识点，探讨"卡脖子"背景下国产基础软件的自强之路。',
    views: 1180, createTime: '2025-04-12', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_008', title: '算法推荐中的伦理边界',
    source: '经济日报', source_url: 'https://www.ce.cn/case_008',
    publish_date: '20250501', collect_date: '20250501', version: 'V1.1',
    category: '专业资料', review_status: '已发布',
    background: '算法推荐让信息分发更高效，却也带来信息茧房、过度沉迷等伦理问题，如何平衡商业效率与社会责任成为行业难题。',
    content: 'https://case.example.com/files/case_008.pdf',
    process: '平台在商业效率与社会责任间寻求平衡，落实算法透明度和用户自主选择权，《互联网信息服务算法推荐管理规定》出台。',
    result: '算法治理进入法治轨道，行业逐步形成"技术+伦理+合规"三位一体的治理共识。',
    profession: ['人工智能', '计算机科学与技术', '法学'],
    keywords: ['推荐系统', '算法治理', '信息茧房', '算法透明度'],
    professional_knowledge: ['协同过滤', '特征工程', '公平性评估', '算法透明性'],
    ideological_elements: ['法治精神', '人民至上', '诚实守信'],
    teaching_value: '适用于人工智能、法学类课程。结合推荐系统与算法治理知识点，强化科技向善与算法伦理教育。',
    views: 890, createTime: '2025-05-01', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_009', title: '国家版本馆的中华文明赓续',
    source: '央视新闻', source_url: 'https://www.cctv.com/case_009',
    publish_date: '20250605', collect_date: '20250605', version: 'V1.1',
    category: '新闻资讯', review_status: '已发布',
    background: '中国国家版本馆收藏古今中外版本资源，是赓续中华文脉、保存文明记忆的国家文化殿堂，数字化建设需求迫切。',
    content: 'https://case.example.com/files/case_009.pdf',
    process: '版本馆运用数字化手段对珍贵典籍进行系统整理、修复与永久保存，构建中华文明资源总库。',
    result: '海量珍贵版本资源实现数字化共享，为文化自信提供坚实的资源支撑。',
    profession: ['信息管理与信息系统', '保密技术', '马克思主义理论'],
    keywords: ['数字资源库', '元数据', '长期保存', '信息组织'],
    professional_knowledge: ['元数据标准', '数字资源长期保存', '知识组织体系'],
    ideological_elements: ['文化自信', '家国情怀'],
    teaching_value: '适用于信息管理类课程。结合数字资源组织与长期保存技术，认识守护文化根脉、坚定文化自信的时代价值。',
    views: 620, createTime: '2025-06-05', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_010', title: '青年程序员投身乡村振兴',
    source: '共青团中央', source_url: 'https://www.gqt.org.cn/case_010',
    publish_date: '20250710', collect_date: '20250710', version: 'V1.1',
    category: '新闻资讯', review_status: '已发布',
    background: '一批青年程序员组建志愿服务团队，深入偏远乡村开发助农信息平台，用技术弥合城乡数字鸿沟。',
    content: 'https://case.example.com/files/case_010.pdf',
    process: '团队为当地搭建农产品电商平台、村务管理系统，培训村民使用数字工具，持续迭代服务。',
    result: '多个村庄的特色农产品打开销路，乡村治理更加高效透明，数字惠农初见成效。',
    profession: ['软件工程', '计算机科学与技术', '数据科学与大数据技术'],
    keywords: ['数字乡村', '电商平台', '低代码开发', '信息鸿沟'],
    professional_knowledge: ['Web应用开发', '前后端架构', '低代码平台', '用户培训'],
    ideological_elements: ['人民至上', '艰苦奋斗', '开拓进取'],
    teaching_value: '适用于软件工程、计算机类课程。结合 Web 应用开发技术，引导学生思考如何用专业所学服务社会民生。',
    views: 530, createTime: '2025-07-10', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_011', title: 'DeepSeek-V3开源大模型的自主研发与高效训练',
    source: '中国科学网', source_url: 'https://www.sciencenet.cn/case_011',
    publish_date: '20260806', collect_date: '20260806', version: 'V1.1',
    category: '行业案例', review_status: '已发布',
    background: '大语言模型训练长期面临算力成本高、资源消耗大的挑战，我国基础模型架构创新相对薄弱，亟需在核心算法层面实现突破。',
    content: 'https://case.example.com/files/case_011.pdf',
    process: 'DeepSeek团队从底层架构设计入手，采用混合专家（MoE）架构和稀疏激活机制，构建高质量训练数据集，通过分布式训练框架实现高效收敛。',
    result: 'DeepSeek-V3在MMLU等多项国际基准测试中取得领先成绩，模型开源后获得全球开发者社区广泛关注，成为国产大模型自主创新的标杆。',
    profession: ['软件工程', '计算机科学与技术', '人工智能'],
    keywords: ['混合专家架构', '稀疏激活', '分布式训练', '大语言模型'],
    professional_knowledge: ['混合专家架构设计', '分布式训练框架', '模型推理优化', '自然语言处理'],
    ideological_elements: ['科技自立自强', '自主创新', '工匠精神'],
    teaching_value: '适用于软件工程、计算机类专业的人工智能课程。结合混合专家架构、分布式训练等知识点，引导学生思考核心技术自主研发对 AI 产业安全的重要意义。',
    views: 1500, createTime: '2026-08-06', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  {
    id: 'case_012', title: '数字中国建设中的文化传播创新',
    source: '人民网', source_url: 'https://www.people.com.cn/case_012',
    publish_date: '20260801', collect_date: '20260801', version: 'V1.1',
    category: '新闻资讯', review_status: '已发布',
    background: '依托数字技术，中华优秀传统文化以短视频、云展览、数字文创等新形式走向大众，传播方式亟待创新。',
    content: 'https://case.example.com/files/case_012.pdf',
    process: '创作者运用 AIGC、虚拟现实等技术，让文物、诗词、非遗"活"起来、"潮"起来，探索跨媒体叙事。',
    result: '《只此青绿》等数字作品火爆出圈，传统文化传播力、影响力显著提升。',
    profession: ['智能交互设计', '人工智能', '信息与计算科学'],
    keywords: ['AIGC', '数字文创', '沉浸式交互', '跨媒体叙事'],
    professional_knowledge: ['内容生成', '虚拟现实', '交互设计'],
    ideological_elements: ['文化自信', '创新驱动发展'],
    teaching_value: '适用于智能交互、人工智能类课程。结合 AIGC 内容创作技术，探讨数字化表达中文化本真的坚守与创新。',
    views: 410, createTime: '2026-08-01', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  // ===== 待审核 / 已驳回案例（供后台演示） =====
  {
    id: 'case_013', title: '区块链技术在供应链溯源中的应用',
    source: '教师投稿', source_url: '', publish_date: '20260728', collect_date: '20260728', version: 'V1.1',
    category: '行业案例', review_status: '待审核',
    background: '假冒伪劣问题困扰商品流通领域，区块链以其不可篡改特性成为溯源的重要技术手段。',
    content: 'https://case.example.com/files/case_013.pdf',
    process: '将生产、流通、销售各环节信息上链，构建全链路可信溯源体系。',
    result: '试点应用证明可有效降低追溯成本、提升消费者信任。',
    profession: ['计算机科学与技术', '信息安全', '法学'],
    keywords: ['区块链', '分布式账本', '智能合约'],
    professional_knowledge: ['共识机制', '智能合约', '分布式账本'],
    ideological_elements: ['诚实守信', '法治精神'],
    teaching_value: '适用于信息安全、法学类课程。结合区块链溯源技术，探讨技术诚信与市场公平。',
    views: 120, createTime: '2026-07-28', submitterName: '赵老师', sourceType: '教师上传', isFavorite: false,
  },
  {
    id: 'case_014', title: '智慧养老平台的适老化改造',
    source: '教师投稿', source_url: '', publish_date: '20260802', collect_date: '20260802', version: 'V1.1',
    category: '项目资料', review_status: '待审核',
    background: '我国老龄化加速，智慧养老平台成为缓解养老服务压力的重要手段，但老年人数字鸿沟问题突出。',
    content: 'https://case.example.com/files/case_014.pdf',
    process: '针对老年人使用习惯进行界面与交互的适老化改造，并引入一键求助功能。',
    result: '平台在试点社区投入使用，显著提升老年人生活便利性。',
    profession: ['软件工程', '人工智能', '信息管理与信息系统'],
    keywords: ['智慧养老', '适老化', '无障碍设计'],
    professional_knowledge: ['人机交互', '无障碍设计', '语音交互'],
    ideological_elements: ['人民至上', '人民至上'],
    teaching_value: '适用于软件工程、人机交互类课程。结合无障碍设计知识点，思考如何让科技发展惠及老年人。',
    views: 90, createTime: '2026-08-02', submitterName: '钱老师', sourceType: '教师上传', isFavorite: false,
  },
  {
    id: 'case_015', title: 'AI辅助课堂教学的创新实践',
    source: '教师投稿', source_url: '', publish_date: '20260806', collect_date: '20260806', version: 'V1.1',
    category: '专业资料', review_status: '审核驳回',
    background: 'AI 助教走进课堂，为学生提供个性化学习辅导，教育数字化转型深入推进。',
    content: 'https://case.example.com/files/case_015.pdf',
    process: '开发智能问答系统，根据学生学习数据动态调整讲解内容。',
    result: '试点班级学习效率提升，获得师生好评。',
    profession: ['人工智能', '计算机科学与技术'],
    keywords: ['智能问答', '学习分析', '个性化推荐'],
    professional_knowledge: ['自然语言处理', '知识图谱', '个性化推荐'],
    ideological_elements: ['创新驱动发展', '严谨求实'],
    teaching_value: '适用于人工智能类课程。结合智能问答技术，思考 AI 教育的价值观正确性。',
    views: 30, createTime: '2026-08-06', submitterName: '赵老师', sourceType: '教师上传', isFavorite: false,
  },
  {
    id: 'case_016', title: '经典教学案例（已下线示例）',
    source: '内部整理', source_url: '', publish_date: '20240501', collect_date: '20240501', version: 'V1.1',
    category: '专业资料', review_status: '已下线',
    offlineReason: '来源链接失效，暂时下线待补充有效来源。',
    background: '已下线案例示例，来源失效或不再对外使用，停止对外展示但保留记录。',
    content: '',
    process: '示例内容。',
    result: '示例结果。',
    profession: ['软件工程'],
    keywords: ['示例'],
    professional_knowledge: ['示例'],
    ideological_elements: ['严谨求实'],
    teaching_value: '示例。',
    views: 50, createTime: '2024-05-01', submitterName: '系统', sourceType: '网络采集', isFavorite: false,
  },
  // ===== 草稿 / 需补充案例（供教师工作区演示，见 V1.0 §3.2.1） =====
  {
    id: 'case_017', title: '（未完成）人工智能伦理的课程案例',
    source: '', source_url: '', publish_date: '', collect_date: '20260820', version: 'V1.0',
    category: '专业资料', review_status: '草稿',
    background: '正在撰写中，尚未填写完整。',
    content: '',
    process: '',
    result: '',
    profession: ['人工智能'],
    keywords: ['AI伦理'],
    professional_knowledge: ['算法伦理'],
    ideological_elements: ['法治精神'],
    teaching_value: '',
    views: 0, createTime: '2026-08-20', submitterName: '李老师', sourceType: '教师上传', isFavorite: false,
  },
  {
    id: 'case_018', title: '国产大飞机 C919 的自主研制',
    source: '教师投稿', source_url: '', publish_date: '20260815', collect_date: '20260815', version: 'V1.0',
    category: '行业案例', review_status: '需补充',
    supplementNote: '请补充案例背景的权威来源链接，并细化教学价值部分。',
    background: 'C919 是我国首款按照国际通行适航标准自行研制、具有自主知识产权的大型喷气式客机。',
    content: 'https://case.example.com/files/case_018.pdf',
    process: '研制团队突破总体设计、气动、结构、航电等关键技术，完成型号合格审定。',
    result: 'C919 投入商业运营，标志着我国航空工业迈入新阶段。',
    profession: ['航空航天工程', '机械设计制造及其自动化'],
    keywords: ['大型客机', '适航审定', '系统集成'],
    professional_knowledge: ['适航标准', '系统工程', '结构设计'],
    ideological_elements: ['科技自立自强', '攻坚克难', '责任担当'],
    teaching_value: '适用于航空航天类课程。',
    views: 0, createTime: '2026-08-15', submitterName: '李老师', sourceType: '教师上传', isFavorite: false,
  },
]

// ============ 收藏（按用户隔离，localStorage 持久化） ============
const FAV_KEY = 'cs2_favorites'
const defaultFavorites = {
  student01: ['case_001', 'case_005'],
  teacher01: ['case_002', 'case_007'],
  admin01: ['case_003'],
}
export const mockFavorites = load(FAV_KEY, defaultFavorites)

export function getFavorites(username) {
  if (!mockFavorites[username]) mockFavorites[username] = []
  return mockFavorites[username]
}

export function setFavorites(username, ids) {
  mockFavorites[username] = ids
  save(FAV_KEY, mockFavorites)
}

export function toggleFavorite(username, caseId) {
  const ids = getFavorites(username)
  const idx = ids.indexOf(caseId)
  if (idx >= 0) {
    ids.splice(idx, 1)
    return { favorited: false }
  }
  ids.push(caseId)
  return { favorited: true }
}

// ============ AI 生成记录 ============
export const mockAiRecords = [
  {
    id: 101, username: 'teacher01', createTime: '2026-08-12 10:20',
    category: '行业案例',
    topic: '软件工程中的系统集成与质量保证', ideological_direction: '工匠精神',
    contentPreview: '本案例围绕软件工程中的系统集成与质量保证，结合我国航天工程发展历程……',
    content: '【案例背景】软件系统规模日益庞大，集成与质量保证成为工程成败关键。\n【案例正文】以航天工程"归零"质量文化为切入……',
    publish_date: '20260812', version: 'V1.1',
  },
  {
    id: 102, username: 'teacher01', createTime: '2026-08-11 15:40',
    category: '专业资料',
    topic: '算法公平性与数据合规', ideological_direction: '法治精神',
    contentPreview: '本案例聚焦算法公平性问题，探讨数据合规与伦理审查在 AI 开发中的重要性……',
    content: '【案例背景】算法偏见可能放大社会不公。',
    publish_date: '20260811', version: 'V1.1',
  },
]

// ============ 问答记录（FR-36） ============
export const mockAskRecords = [
  {
    id: 301, username: 'teacher01', caseId: 'case_001', caseTitle: '钱学森归国与两弹一星精神',
    question: '这个案例体现了哪些思政元素？',
    answer: '本案例体现了家国情怀、科技报国、艰苦奋斗等思政元素……',
    createTime: '2026-08-12 11:05',
  },
  {
    id: 302, username: 'student01', caseId: 'case_007', caseTitle: '华为鸿蒙系统的技术突围',
    question: '鸿蒙的技术难点在哪里？',
    answer: '鸿蒙采用分布式架构与微内核设计，难点在于跨端协同与生态构建……',
    createTime: '2026-08-11 16:20',
  },
]

// ============ 提交审核记录 ============
export const mockSubmits = [
  {
    id: 204, username: 'teacher01', submitterName: '李老师', title: '数据要素市场化配置的政策解读（草稿）',
    source: '教师投稿', category: '政策文件', submitTime: '2026-08-10 10:00', status: '草稿', rejectReason: '',
    profession: ['信息管理与信息系统'], keywords: ['数据要素', '市场化配置'],
    professional_knowledge: ['数据要素流通机制'],
    ideological_elements: ['创新驱动发展'],
    teaching_value: '适用于信息管理类课程的草稿案例。',
    background: '数据作为新型生产要素，其市场化配置成为改革重点。',
    process: '围绕数据确权、流通、交易等环节展开。',
    result: '形成数据要素市场的基本制度框架。',
    content: '',
  },
  {
    id: 201, username: 'teacher01', submitterName: '李老师', title: '区块链技术在供应链溯源中的应用',
    source: '教师投稿', category: '行业案例', submitTime: '2026-08-05 09:30', status: '待审核', rejectReason: '',
    profession: ['计算机科学与技术', '信息安全'], keywords: ['区块链', '分布式账本'],
    professional_knowledge: ['共识机制', '智能合约'],
    ideological_elements: ['诚实守信', '法治精神'],
    teaching_value: '适用于信息安全类课程。',
    background: '假冒伪劣问题困扰商品流通领域。',
    process: '将各环节信息上链构建可信溯源体系。',
    result: '试点应用证明可有效提升消费者信任。',
    content: 'https://case.example.com/files/submit_201.pdf',
  },
  {
    id: 202, username: 'teacher01', submitterName: '李老师', title: 'AI辅助课堂教学的创新实践',
    source: '教师投稿', category: '专业资料', submitTime: '2026-08-03 14:00', status: '审核驳回', rejectReason: '正文内容过短，思政元素挖掘不够深入，请补充完整案例背景与教学成效。',
    profession: ['人工智能'], keywords: ['智能问答'],
    professional_knowledge: ['自然语言处理'],
    ideological_elements: ['创新驱动发展'],
    teaching_value: '适用于人工智能类课程。',
    background: 'AI 助教走进课堂。',
    process: '开发智能问答系统。',
    result: '试点班级学习效率提升。',
    content: 'https://case.example.com/files/submit_202.pdf',
  },
  {
    id: 203, username: 'teacher02', submitterName: '赵老师', title: '智慧养老平台的适老化改造',
    source: '教师投稿', category: '项目资料', submitTime: '2026-08-06 11:00', status: '待审核', rejectReason: '',
    profession: ['软件工程'], keywords: ['智慧养老'],
    professional_knowledge: ['人机交互'],
    ideological_elements: ['人民至上'],
    teaching_value: '适用于软件工程类课程。',
    background: '我国老龄化加速。',
    process: '进行界面适老化改造。',
    result: '平台在试点社区投入使用。',
    content: 'https://case.example.com/files/submit_203.pdf',
  },
]

// ============ 统计与首页数据 ============
export const mockStats = {
  totalCases: 156,
  collectedCaseCount: 138,
  totalUsers: 328,
  todayAiCount: 47,
  pendingReviewCount: 12,
  categoryDistribution: [
    { name: '人物案例', count: 32 },
    { name: '政策文件', count: 18 },
    { name: '行业案例', count: 41 },
    { name: '新闻资讯', count: 26 },
    { name: '专业资料', count: 24 },
    { name: '项目资料', count: 15 },
  ],
  sourceDistribution: [
    { name: '网络采集', value: 138 },
    { name: '人工导入', value: 32 },
    { name: '教师上传', value: 24 },
    { name: 'AI生成', value: 18 },
  ],
}

// ============ 专业字典（FR-43，供后台维护） ============
export const mockProfessions = PROFESSIONS.map((name, i) => ({
  id: i + 1,
  name,
  caseCount: 0,
  status: 1, // 1 启用；0 停用
  createTime: '2026-08-01',
}))

// ============ 首页平台数据（展示平台规模） ============
export const mockHomeIndex = {
  totalCases: 156,
  collectedCaseCount: 138,
  totalProfessions: 58,
  totalTags: 18,
  totalAiGenerated: 1240,
}

// ============ 操作记录 / 审计日志（FR-07） ============
export const mockAuditLogs = [
  { id: 1, operator: '系统管理员', username: 'admin01', action: '审核通过', target: 'case_001', detail: '网络案例入库审核通过，案例发布', time: '2026-08-10 09:12' },
  { id: 2, operator: '系统管理员', username: 'admin01', action: '调整角色', target: 'teacher01', detail: '角色：学生 → 教师', time: '2026-08-11 14:30' },
  { id: 3, operator: '内容审核员', username: 'admin02', action: '冻结账号', target: 'student02', detail: '账号冻结，令牌失效', time: '2026-08-12 10:05' },
  { id: 4, operator: '系统管理员', username: 'admin01', action: '重置密码', target: 'teacher02', detail: '重置为初始密码', time: '2026-08-13 16:20' },
  { id: 5, operator: '内容审核员', username: 'admin02', action: '下线案例', target: 'case_016', detail: '下线原因：来源链接失效', time: '2026-08-14 11:00' },
]
