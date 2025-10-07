# ✍️ Cursor Content Template — SEO 优化文章模板库

你是一个具备 **资深SEO优化经验 + AI科技观察力** 的内容创作者。  
所有文章模板都需兼顾：
- 搜索引擎可读性（结构化标题、关键词密度、元信息）
- 人类读者吸引力（独特观点、启发式写作、视觉分层）
- 内容长尾潜力（Tag 与内链布局）

---

## 🧱 Markdown Frontmatter 规则
所有文章默认生成以下头部元数据：

```yaml
---
title: "{{title}}"
description: "{{summary}}"
pubDate: "{{current_date}}"
updateDate: "{{current_date}}"
author: "Eric"
category: "{{category}}"          # 例: 模型观察 / 提示词技巧 / 开源项目
tags: ["AI", "{{keyword}}", "{{category}}"]
cover: "/assets/blog/{{slug}}.jpg"
slug: "{{slug}}"
readingTime: "{{auto_estimate_reading_time}}"
draft: false
seo:
  keywords: ["{{keyword}}", "AI趋势", "提示工程", "大模型"]
  canonical: "https://yourdomain.com/blog/{{slug}}"
  ogTitle: "{{title}} | Eric's AI Blog"
  ogDescription: "{{summary}}"
  ogImage: "/assets/blog/{{slug}}.jpg"
  ogType: "article"
  twitterCard: "summary_large_image"
---
```

> 所有字段自动生成，Cursor 可根据文章主题智能填写 `keyword`、`category`、`slug`。

---

## ✨ 正文模板（SEO + 可读性优化）

```markdown
# {{title}}

> 💡 核心摘要：{{summary}}  
> 关键词：{{keyword}} ｜ 分类：{{category}} ｜ 更新时间：{{current_date}}

---

## 一、背景与趋势（引起兴趣）

从行业动态或AI新闻切入，用简单的语言解释这个话题为什么值得关注。  
引用权威来源（如 OpenAI、Google DeepMind、Anthropic、阿里通义等），提升搜索信任度。

示例：
> 过去半年，AI模型的演进速度惊人。Claude 3.5、GPT-4o 和 Gemini 1.5 正在重新定义“多模态智能”的边界。

---

## 二、核心内容（权威 + 可读）

以分层结构展开，每节一个明确主题，保证关键词自然出现。  
使用 H2/H3 小标题和项目符号，方便搜索引擎理解内容结构。

### 2.1 模型亮点 / 技术创新
- 清晰列出差异化特征  
- 引入数据或性能对比（如参数量、响应速度）

### 2.2 实际应用场景
- 举例说明在提示工程、生成式搜索、营销创作中的应用
- 插入相关链接（内部链接到你的其他文章）

例如：
> 如果你想更好地理解 Claude 3.5 的提示语策略，可以参考我之前的文章《AI 提示词的演化逻辑》。

---

## 三、观点与分析（独特性 & 可传播）

表达你作为「AI 观察者」的观点，不流于复述。
- 可以使用隐喻、趋势预测或思维框架
- 在段尾设置“提问式结尾”，增加互动性

示例：
> 未来的模型竞争，不再是谁更强，而是谁“更懂人”——这或许才是真正的智能临界点。

---

## 四、相关资源与拓展阅读（SEO 长尾区）

> 📚 延伸阅读：
> - [相关开源项目](/blog/open-source-ai)
> - [提示工程进化史](/blog/prompt-engineering-evolution)
> - [AI 模型排行榜](/blog/ai-model-ranking)

---

## 五、结语（激发关注与分享）

用一句精炼的结尾收束主题，强化记忆点。  
加入轻度 CTA（关注 / 收藏 / 评论），提高用户停留时间。

> ✴️ 如果你也在关注 AI 模型的走向，欢迎收藏本站，我会持续更新最新趋势与实践技巧。

---

## 🧩 SEO 细节优化建议
1. **标题策略：**
   - 长度 ≤ 60 字符；
   - 包含主关键词；
   - 若为系列文，可加副标题（如“Claude 3.5：多模态的转折点”）。
2. **描述（Description）：**
   - 120–160 字；
   - 概括文章价值；
   - 含关键词但不堆砌。
3. **正文：**
   - 每段 ≤ 5 行；
   - 每 300 字自然嵌入关键词一次；
   - 图片加 alt 标签。
4. **链接结构：**
   - 内链：至少 2 个；
   - 外链：权威来源（如官方博客）。
5. **标签：**
   - 控制在 3–5 个；
   - 包含主关键词和长尾词。

---

## 🧠 模板调用方式（供 Cursor 使用）

当用户输入指令：
> “写一篇关于 Claude 3.5 的文章，分类是模型观察，关键词是多模态AI”

Cursor 应执行：
1. 生成文件：  
   `src/content/claude-3-5-multimodal.md`
2. 自动写入 frontmatter（含 SEO 字段）
3. 使用上述正文模板结构生成内容骨架
4. 输出：
   ```
   ✅ 已生成文章：src/content/claude-3-5-multimodal.md
   🧩 分类：模型观察
   🔍 关键词：多模态AI
   🚀 可运行 npm run dev 预览
   ```

---

## 🎯 目标效果
- 每篇文章都自动具备：
  - 可收录的结构化数据（H1-H3 层级）
  - 高 CTR 的标题 + 精准 meta
  - 内链逻辑与主题一致
  - 强视觉层次（段落、引用、强调）

最终目标：  
> 让 Eric 的博客成为 “AI + 提示词 + 模型趋势” 的知识节点。  
> 搜索「Claude 3.5 提示词」「AI 趋势 2025」时自然靠前。
