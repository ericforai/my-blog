# 🔧 Giscus 评论系统配置指南

> Giscus 是一个基于 GitHub Discussions 的免费开源评论系统  
> 配置时间：5 分钟  
> 更新时间：2025-10-08

---

## 📋 配置步骤

### 第一步：创建 GitHub 仓库

1. **访问 GitHub**
   - 登录 https://github.com
   - 点击右上角 `+` → `New repository`

2. **仓库设置**
   ```
   Repository name: my-blog-comments
   Description: 博客评论系统
   Visibility: Public（必须公开）
   ✅ Add a README file
   ```

3. **创建仓库**
   - 点击 `Create repository`

---

### 第二步：开启 Discussions 功能

1. **进入仓库设置**
   - 点击仓库的 `Settings` 标签页

2. **启用 Discussions**
   - 滚动到 `Features` 部分
   - ✅ 勾选 `Discussions`
   - 点击 `Set up discussions`

3. **创建第一个 Discussion**
   - GitHub 会自动创建欢迎帖
   - 点击 `Start discussion` 完成设置

---

### 第三步：安装 Giscus App

1. **访问 Giscus 配置页面**
   - https://giscus.app/zh-CN

2. **连接 GitHub**
   - 页面中部会提示 "安装 Giscus app"
   - 点击 `Install the giscus app on GitHub`

3. **授权仓库**
   ```
   选择授权方式：
   ○ All repositories（所有仓库）
   ● Only select repositories（推荐）
     ✅ my-blog-comments
   ```

4. **确认安装**
   - 点击 `Install`
   - GitHub 会重定向回 Giscus 配置页

---

### 第四步：生成配置代码

1. **填写仓库信息**
   ```
   Repository: yourusername/my-blog-comments
   (替换为你的 GitHub 用户名)
   ```

2. **Discussion 映射方式**（推荐选项）
   ```
   ● pathname（路径名）
   每个页面对应一个独立的 Discussion
   ```

3. **Discussion 分类**
   ```
   ● Announcements（推荐）
   适合评论场景
   ```

4. **功能选项**
   ```
   ✅ 启用反应（让读者可以点赞评论）
   □ 在主帖子上方显示评论输入框（可选）
   ✅ 懒加载评论（提升性能）
   ```

5. **主题**
   ```
   ● preferred_color_scheme
   自动适配浅色/深色模式
   ```

---

### 第五步：复制配置代码

配置完成后，页面底部会生成类似代码：

```html
<script src="https://giscus.app/client.js"
        data-repo="yourusername/my-blog-comments"
        data-repo-id="R_kgDOxxxxxxxxxx"
        data-category="Announcements"
        data-category-id="DIC_kwDOxxxxxxxxxx"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
```

**重要**：记录以下参数（需要填入网站配置）
```
data-repo="yourusername/my-blog-comments"
data-repo-id="R_kgDOxxxxxxxxxx"  ← 复制这个
data-category-id="DIC_kwDOxxxxxxxxxx"  ← 复制这个
```

---

### 第六步：更新网站配置

打开 `src/layouts/PostLayout.astro`，找到 Giscus 配置部分，更新参数：

```typescript
// 第 121-124 行，更新为你的实际值
script.setAttribute('data-repo', 'yourusername/my-blog-comments');
script.setAttribute('data-repo-id', 'R_kgDOxxxxxxxxxx');  // 从 Giscus 复制
script.setAttribute('data-category-id', 'DIC_kwDOxxxxxxxxxx');  // 从 Giscus 复制
```

**完整示例**：
```typescript
<script is:inline>
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', 'eric/my-blog-comments');  // ← 改这里
  script.setAttribute('data-repo-id', 'R_kgDOL5xKpQ');  // ← 改这里
  script.setAttribute('data-category', 'Announcements');
  script.setAttribute('data-category-id', 'DIC_kwDOL5xKpc4CkK8h');  // ← 改这里
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'top');
  script.setAttribute('data-theme', 'preferred_color_scheme');
  script.setAttribute('data-lang', 'zh-CN');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  
  const giscusContainer = document.querySelector('.giscus');
  if (giscusContainer) {
    giscusContainer.innerHTML = '';
    giscusContainer.appendChild(script);
  }
</script>
```

---

## ✅ 验证配置

### 本地测试

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问任意文章**
   ```
   http://localhost:4321/blog/ai-marketing-revolution
   ```

3. **检查评论区**
   - 滚动到文章底部
   - 应该看到 Giscus 评论框
   - 如果看到加载错误，检查配置参数

### 在线测试

1. **部署网站**
   ```bash
   npm run build
   # 部署到 Vercel/Netlify/GitHub Pages
   ```

2. **发布评论测试**
   - 用 GitHub 账号登录
   - 发布一条测试评论
   - 刷新页面查看是否显示

3. **检查 GitHub Discussions**
   - 访问 `https://github.com/yourusername/my-blog-comments/discussions`
   - 应该看到自动创建的 Discussion

---

## 🎨 自定义配置

### 修改主题颜色

Giscus 支持多种主题：

```typescript
// 浅色主题
script.setAttribute('data-theme', 'light');

// 深色主题
script.setAttribute('data-theme', 'dark');

// 自动适配（推荐）
script.setAttribute('data-theme', 'preferred_color_scheme');

// GitHub 风格
script.setAttribute('data-theme', 'github_light');
script.setAttribute('data-theme', 'github_dark');

// 自定义 CSS
script.setAttribute('data-theme', 'https://yourdomain.com/giscus-custom.css');
```

### 修改评论输入框位置

```typescript
// 输入框在上方（推荐，方便评论）
script.setAttribute('data-input-position', 'top');

// 输入框在下方
script.setAttribute('data-input-position', 'bottom');
```

### 修改语言

```typescript
// 中文
script.setAttribute('data-lang', 'zh-CN');

// 英文
script.setAttribute('data-lang', 'en');

// 繁体中文
script.setAttribute('data-lang', 'zh-TW');
```

---

## 🔒 隐私与安全

### Giscus 如何保护隐私？

1. **无第三方追踪**
   - 不使用 Google Analytics 等追踪工具
   - 不收集用户个人数据

2. **GitHub 账号登录**
   - 评论需要 GitHub 账号
   - 自动过滤垃圾评论
   - 方便管理和审核

3. **数据存储**
   - 所有评论存储在你的 GitHub Discussions
   - 你完全掌控数据
   - 可随时导出或删除

---

## ❓ 常见问题

### Q1: 评论不显示怎么办？

**检查清单**：
- [ ] 仓库是否设为 Public？
- [ ] Discussions 功能是否开启？
- [ ] Giscus App 是否已安装？
- [ ] `data-repo-id` 和 `data-category-id` 是否正确？
- [ ] 浏览器控制台是否有报错？

**解决方案**：
```bash
# 1. 检查浏览器控制台（F12）
# 2. 查看错误信息
# 3. 访问 https://github.com/yourusername/my-blog-comments/discussions
# 4. 确认 Discussion 是否自动创建
```

---

### Q2: 如何删除/编辑评论？

1. **评论者本人**
   - 鼠标悬停在评论上
   - 点击 `...` 菜单
   - 选择 Edit / Delete

2. **博客管理员（你）**
   - 访问 GitHub Discussions
   - 找到对应的评论
   - 可以编辑/删除任何评论

---

### Q3: 如何防止垃圾评论？

**内置保护**：
- 需要 GitHub 账号才能评论（天然门槛）
- GitHub 的反垃圾系统

**额外设置**：
```typescript
// 开启严格模式（只允许已有 Discussion 的页面评论）
script.setAttribute('data-strict', '1');

// 设置评论审核（需手动批准）
// 在 GitHub Discussions 设置中开启 "Require approval"
```

---

### Q4: 评论数据会丢失吗？

**不会！**
- 评论存储在 GitHub（全球最可靠的代码托管平台）
- 你拥有完全控制权
- 可随时导出数据

**备份方案**：
```bash
# 使用 GitHub API 定期备份评论
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/yourusername/my-blog-comments/discussions \
     > comments_backup.json
```

---

### Q5: 如何迁移到其他评论系统？

如果未来想换评论系统：

1. **导出数据**
   - 使用 GitHub API 导出所有 Discussions
   - 格式：JSON

2. **转换格式**
   - 编写脚本转换为目标系统格式
   - 常见目标：Disqus、Commento

3. **导入新系统**
   - 各系统都提供导入功能

---

## 📊 评论数据统计

### 查看评论统计

访问仓库的 Insights：
```
https://github.com/yourusername/my-blog-comments/pulse
```

可以看到：
- 评论总数
- 活跃用户
- 互动趋势

### 集成 Google Analytics

在评论事件中添加 GA 追踪：

```typescript
// 监听评论提交事件
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://giscus.app') return;
  
  const giscusData = event.data;
  if (giscusData.discussion) {
    // 发送 GA 事件
    gtag('event', 'comment_posted', {
      page_path: window.location.pathname
    });
  }
});
```

---

## 🚀 进阶功能

### 功能 1：评论统计组件

创建一个显示评论数的组件：

```astro
---
// src/components/CommentCount.astro
interface Props {
  slug: string;
}
const { slug } = Astro.props;
---

<span class="comment-count" data-slug={slug}>
  <span class="loading">加载中...</span>
</span>

<script>
  // 通过 GitHub API 获取评论数
  const elements = document.querySelectorAll('.comment-count');
  elements.forEach(async (el) => {
    const slug = el.getAttribute('data-slug');
    // 实现 API 调用...
  });
</script>
```

### 功能 2：评论通知

设置 GitHub 通知，及时收到新评论：

1. 访问 `https://github.com/settings/notifications`
2. 确保开启 `Discussions` 通知
3. 选择通知方式：
   - ✅ Email
   - ✅ Web（GitHub 站内）
   - ✅ Mobile（GitHub App）

---

## ✨ 最佳实践

### 1. 鼓励互动

在文章结尾添加：
```markdown
💬 你有什么想法？欢迎在评论区分享！
🤝 如果觉得有帮助，点个赞支持一下
```

### 2. 及时回复

- 新评论 24 小时内回复
- 建立社区氛围
- 提升用户粘性

### 3. 精华评论置顶

在 GitHub Discussions 中：
- 点赞优质评论
- 标记为 "Answered"
- 固定重要讨论

---

## 📚 相关资源

- [Giscus 官网](https://giscus.app/zh-CN)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)
- [Giscus GitHub 仓库](https://github.com/giscus/giscus)

---

## 🎉 完成！

配置完成后，你的博客就有了一个：
- ✅ 免费开源的评论系统
- ✅ 无需数据库
- ✅ GitHub 账号登录（防垃圾）
- ✅ 完全掌控数据
- ✅ 支持深色模式
- ✅ 响应式设计

**下一步**：发布你的第一篇文章，邀请读者评论互动！🚀

---

*最后更新：2025-10-08*  
*有问题？在 GitHub 提 Issue 或在评论区留言！*

