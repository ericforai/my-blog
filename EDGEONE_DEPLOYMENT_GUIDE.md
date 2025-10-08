# 🚀 EdgeOne 部署指南

## ✅ 问题已解决

### 原问题
```
[NoAdapterInstalled] Cannot use server-rendered pages without an adapter
```

### 解决方案
- ✅ 删除了 `/src/pages/api/subscribe.ts`（静态站点不支持服务器端 API）
- ✅ 构建成功，生成 `dist/` 目录
- ✅ 已打包 `dist.zip` 便于手动上传

---

## 📤 EdgeOne 部署步骤

### 方式 1：EdgeOne Pages（Git 自动部署）

#### 1. 访问控制台
https://edgeone.ai/pages

#### 2. 新建项目
- 点击 "新建项目"
- 选择 "导入 Git 仓库"
- 连接 GitHub：`ericforai/my-blog`
- 选择分支：`main`

#### 3. 构建配置
```bash
# 构建命令
npm run build

# 输出目录
dist

# 安装命令
npm install

# Node.js 版本
20.x
```

#### 4. 环境变量（可选）
```
PUBLIC_GA_ID=G-4P5N3X3GBG
```

#### 5. 部署
- 点击 "部署" 按钮
- 等待 2-3 分钟
- 获取部署 URL：`https://your-project.edgeone.app`

#### 6. 绑定自定义域名
- 在 EdgeOne 控制台添加域名：`www.aixiaohai.com`
- 配置 DNS 记录（CNAME）
- 启用 HTTPS 自动证书

---

### 方式 2：手动上传（已打包好）

#### 1. 使用打包文件
项目根目录已生成 `dist.zip`，包含所有静态文件。

#### 2. 上传到 EdgeOne
- 登录 EdgeOne 控制台
- 选择 "静态网站托管"
- 上传 `dist.zip` 或 `dist/` 目录
- 等待解压完成

#### 3. 配置 CDN
- 绑定域名：`www.aixiaohai.com`
- 配置缓存规则：
  ```
  HTML: 不缓存或 5 分钟
  CSS/JS: 1 年
  图片: 30 天
  ```
- 启用 HTTPS
- 配置 Gzip/Brotli 压缩

---

## 🔄 重新部署步骤

### 本地重新构建
```bash
# 1. 清理旧构建
rm -rf dist dist.zip

# 2. 重新构建
npm run build

# 3. 打包（如果需要手动上传）
zip -r dist.zip dist/

# 4. 预览（可选）
npm run preview
```

### Git 推送（自动部署）
```bash
# 1. 提交更改
git add .
git commit -m "Fix: Remove API route for static deployment"

# 2. 推送到 GitHub
git push origin main

# 3. EdgeOne 自动部署（如果配置了 Git 集成）
```

---

## ⚠️ Newsletter 订阅功能说明

### 当前状态
- ✅ 前端表单正常显示
- ⚠️ 提交后显示模拟成功消息（非真实订阅）
- ❌ 后端 API 已删除（静态站点不支持）

### 生产环境解决方案

#### 方案 A：使用第三方服务（推荐）

**1. Mailchimp**
```html
<!-- 替换 Newsletter.astro 中的表单 -->
<form 
  action="https://your-domain.us1.list-manage.com/subscribe/post"
  method="POST"
>
  <input type="hidden" name="u" value="YOUR_USER_ID">
  <input type="hidden" name="id" value="YOUR_LIST_ID">
  <input type="email" name="EMAIL" placeholder="输入你的邮箱" required>
  <button type="submit">立即订阅</button>
</form>
```

**2. ConvertKit**
```html
<form 
  action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions"
  method="POST"
>
  <input type="email" name="email_address" required>
  <button type="submit">订阅</button>
</form>
```

**3. EmailOctopus**
```html
<form 
  action="https://emailoctopus.com/lists/YOUR_LIST_ID/forms/subscribe"
  method="POST"
>
  <input type="email" name="field_0" required>
  <button type="submit">订阅</button>
</form>
```

#### 方案 B：使用 Serverless Function

**1. 部署到 Vercel**
- Vercel 支持 API Routes
- 保持现有代码结构
- 自动处理服务器端逻辑

**2. 使用 Cloudflare Workers**
```javascript
// worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const { email } = await request.json()
    
    // 调用 Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'hello@aixiaohai.com',
        to: email,
        subject: '欢迎订阅！'
      })
    })
    
    return new Response(JSON.stringify({ success: true }))
  }
}
```

#### 方案 C：保持模拟（临时）
当前实现仅显示成功消息，不实际发送邮件。适合演示或测试环境。

---

## 🔍 部署验证

### 1. 检查页面访问
```bash
# 主页
https://www.aixiaohai.com

# 博客列表
https://www.aixiaohai.com/blog

# 关于页面
https://www.aixiaohai.com/about
```

### 2. 检查 SEO
- ✅ Sitemap：https://www.aixiaohai.com/sitemap.xml
- ✅ RSS：https://www.aixiaohai.com/rss.xml
- ✅ Robots.txt：https://www.aixiaohai.com/robots.txt

### 3. 检查性能
- Lighthouse 性能评分 > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s

### 4. 检查 GA（可选）
- Google Analytics 实时报告
- 检查页面浏览事件
- 验证用户追踪

---

## 📊 部署后配置

### 1. Google Search Console
```bash
# 1. 添加网站
https://search.google.com/search-console

# 2. 提交 Sitemap
https://www.aixiaohai.com/sitemap.xml

# 3. 请求索引
提交主要页面 URL
```

### 2. DNS 配置
```
# A 记录（如果使用 IP）
@ → EdgeOne IP 地址

# CNAME（如果使用别名）
www → your-project.edgeone.app

# TXT 记录（验证）
_edgeone-verify → verification-token
```

### 3. SSL/TLS 证书
- EdgeOne 自动颁发 Let's Encrypt 证书
- 强制 HTTPS 重定向
- HTTP/2 启用
- HSTS 配置

---

## 🐛 常见问题

### 问题 1：构建失败
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 问题 2：404 错误
- 检查 `dist/` 目录是否包含所有文件
- 验证路由配置
- 确认 EdgeOne 根目录设置为 `/`

### 问题 3：样式丢失
- 检查 CSS 文件路径
- 确认 `base` 配置（如果使用子目录）
- 清除 CDN 缓存

### 问题 4：环境变量不生效
- 在 EdgeOne 控制台重新添加
- 确认变量名以 `PUBLIC_` 开头（如果在客户端使用）
- 重新部署

---

## 📞 需要帮助？

### EdgeOne 文档
- 官方文档：https://edgeone.ai/docs
- API 文档：https://edgeone.ai/api

### Astro 文档
- 部署指南：https://docs.astro.build/en/guides/deploy/
- 静态站点：https://docs.astro.build/en/core-concepts/routing/

### 联系方式
- GitHub Issues：https://github.com/ericforai/my-blog/issues
- Email：hello@aixiaohai.com

---

**🎉 部署成功后，你的 AI 博客将在全球 CDN 上运行！**

访问：https://www.aixiaohai.com

