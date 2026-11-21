# Mock 数据说明

> 任务三：平台前端与交互

| 版本 | 日期 | 作者 | 状态 |
|---|---|---|---|
| V1.0 | 2026-09-05 | 任务三·前端 | 依据《需求规格文档 V1.0》同步枚举与接口约定 |
| V0.2 | 2026-08-29 | 任务三·前端 | 草案（依据《项目知识库需求与数据规范文档》V1.1 更新数据规范） |
| V0.1 | 2026-08-29 | 任务三·前端 | 草案（待全组确认） |

> 说明：前端开发阶段的 Mock 数据方案，字段对齐《prompt_generate_v2》字段规范。

---

## 一、字段规范对齐

Mock 案例字段严格对齐 **prompt_generate_v2.txt** 定义的字段：

```
id(case_XXX) / title / source / source_url / publish_date(YYYYMMDD) /
collect_date / version / category(六类) / review_status(六状态) / background /
content(PDF链接，接口完成前留空) / process / result / profession(数组，不设上限) / keywords(通常3-8个，纯技术词) /
professional_knowledge(数组) / ideological_elements(思政标签数组) / teaching_value
```

**枚举值（对齐《需求规格文档 V1.0》）：**
- 案例分类：人物案例 / 政策文件 / 行业案例 / 新闻资讯 / 专业资料 / 项目资料（V1.0 §5.3）
- 案例状态：**草稿 / 待审核 / 需补充 / 审核驳回 / 已发布 / 已下线**（V1.0 §3.2.1）
- 来源方式：**网络采集 / 人工导入 / 教师上传 / AI生成**（V1.0 §4.8）
- 思政标签：**18 个**（科技自立自强、自主创新、科技报国、攻坚克难、团结协作、严谨求实、工匠精神、家国情怀、责任担当、国际合作、人民至上、创新驱动发展、文化自信、诚实守信、法治精神、生态文明、艰苦奋斗、开拓进取）——V1.0 §5.5
- 专业：约 60 个（软件工程、计算机科学与技术、人工智能等）

**已移除**：五大思政指标、所属课程。

## 二、Mock 文件结构（src/api/mockData.js）

| 导出 | 内容 |
|---|---|
| `CASE_CATEGORIES` | 案例分类 6 类 |
| `REVIEW_STATUSES` | 案例状态 6 种（草稿/待审核/需补充/审核驳回/已发布/已下线） |
| `SOURCE_TYPES` | 来源方式 4 种（网络采集/人工导入/教师上传/AI生成） |
| `IDEOLOGICAL_TAGS` | 思政标签 18 个 |
| `PROFESSIONS` | 专业清单约 60 个 |
| `mockUsers` | 三类角色用户（student01/teacher01/admin01，密码 123456）+ 冻结账号 |
| `mockCases` | 案例库（已发布案例 + 待审核/需补充/驳回/草稿/已下线样例） |
| `mockFavorites` | 按用户收藏（localStorage 持久化） |
| `mockAiRecords` | AI 生成记录（含辅助评价与分稿得分） |
| `mockSubmits` | 我的案例 / 提交记录（草稿/待审核/需补充/审核驳回/已发布/已下线） |
| `mockAskRecords` | 问答记录（FR-36，AI 问答自动写入） |
| `mockProfessions` | 专业字典（FR-43，供后台维护） |
| `mockAuditLogs` | 操作记录 / 审计日志（FR-07） |
| `mockStats` | 统计（总数 + 案例分类分布 + 来源分布） |

## 三、Mock 实现方式

- `src/api/index.js` 每个 API 函数**直接返回 mock 数据**（带 `delay` 模拟网络延迟），不经过 axios
- 统一返回结构 **`{ code, message, data }`**（`code = 0` 为成功，见 V1.0 §6.1），分页 `{ records, total, page, size }`
- 接口前缀 **`/api/v1`**（`request.js` baseURL）
- 登录/收藏/个人信息用 `localStorage` 持久化，刷新不丢失
- **AI 生成接口模拟 SSE 流式**：先回调 `onEvent` 推送过程事件（分稿进度 / 评分中），再将最优稿正文按 2~4 字符切段、`setTimeout` 间隔回调 `onChunk`，实现打字机效果（多稿择优见 V1.0 §3.7 / FR-37/38）

## 四、示例数据

### 测试账号
| 账号 | 密码 | 角色 |
|---|---|---|
| student01 | 123456 | 学生 |
| teacher01 | 123456 | 教师 |
| admin01 | 123456 | 管理员 |

### 案例示例（字段）
```json
{
  "id": "case_011",
  "title": "DeepSeek-V3开源大模型的自主研发与高效训练",
  "source": "中国科学网",
  "publish_date": "20260806",
  "category": "行业案例",
  "review_status": "已发布",
  "sourceType": "网络采集",
  "profession": ["软件工程", "计算机科学与技术", "人工智能"],
  "keywords": ["混合专家架构", "稀疏激活", "分布式训练"],
  "ideological_elements": ["科技自立自强", "自主创新", "工匠精神"],
  "content": "https://case.example.com/files/case_011.pdf"
}
```

## 五、切换到真实接口

1. 后端按 D6 接口契约完成接口后，将 `api/index.js` 各函数体替换为 `request.js` 的 `get/post/put/del`
2. `request.js` baseURL 已为 `/api/v1`；在 `vite.config.js` 配置 `/api` 代理指向后端地址
3. 删除/停用 Mock 数据文件（或保留作为联调对照）
4. AI 生成/问答改为 fetch + ReadableStream 解析 SSE（页面零改动）