# 📊 Google Analytics 4 配置指南

> 完整的 GA4 集成与数据追踪方案  
> 配置时间：10 分钟  
> 更新时间：2025-10-08

---

## 📋 前置准备

### 需要的账号
- [ ] Google 账号
- [ ] 网站管理权限

---

## 🚀 步骤 1：创建 GA4 账号

### 1.1 注册 Google Analytics

1. **访问 GA4**
   - https://analytics.google.com/

2. **创建账号**
   - 点击「开始衡量」
   - 账号名称：`AI小孩博客`
   - 账号数据共享设置：按需勾选

3. **创建媒体资源**
   - 媒体资源名称：`AI小孩`
   - 报告时区：`(GMT+08:00) 中国时间 - 北京`
   - 货币：`CNY - 人民币 ¥`

4. **选择行业类别**
   - 行业类别：`技术 > 互联网和电信`
   - 业务规模：`小型（员工数 1-10）`

5. **业务目标**
   - ✅ 检查基准化数据
   - ✅ 衡量客户参与度
   - ✅ 获取客户洞察

---

### 1.2 设置数据流

1. **选择平台**
   - 点击「网站」

2. **配置网站流**
   ```
   网站网址：https://yourdomain.com
   流名称：网站数据流
   ```

3. **增强型衡量**（推荐全部开启）
   - ✅ 网页浏览量
   - ✅ 滚动（阅读深度）
   - ✅ 出站点击
   - ✅ 网站搜索
   - ✅ 视频互动
   - ✅ 文件下载

4. **获取衡量 ID**
   - 创建完成后，会显示类似：`G-XXXXXXXXXX`
   - **复制保存**这个 ID

---

## 🔧 步骤 2：集成到网站

### 2.1 配置环境变量

创建 `.env` 文件（已在 `.gitignore`）：

```bash
# Google Analytics 4
PUBLIC_GA_ID=G-XXXXXXXXXX  # 替换为你的实际 ID
```

**注意**：`PUBLIC_` 前缀表示该变量会暴露给客户端

---

### 2.2 引入 Analytics 组件

打开 `src/layouts/BaseLayout.astro`，在 `<head>` 中添加：

```astro
---
import Analytics from '~/components/Analytics.astro';
---

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  
  <!-- Google Analytics -->
  <Analytics />
  
  <!-- 其他 meta 标签 -->
</head>
```

---

## ✅ 步骤 3：验证配置

### 3.1 本地测试

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **打开浏览器开发者工具**
   - 按 `F12`
   - 切换到「Console」
   - 应该看到：`📊 Analytics: Disabled in development mode`
   - 这是正常的，开发环境不发送数据

---

### 3.2 生产环境测试

1. **构建并部署**
   ```bash
   npm run build
   npm run preview  # 本地预览生产版本
   ```

2. **访问网站**
   - 打开浏览器
   - 按 `F12` → Network 标签页
   - 筛选 `google-analytics`
   - 应该看到请求发送到 GA 服务器

3. **GA4 实时报告**
   - 访问 GA4 控制台
   - 左侧菜单：`报告` → `实时`
   - 应该看到「当前活跃用户」数据
   - 如果看到自己的访问，说明配置成功 ✅

---

## 📊 步骤 4：自定义事件追踪

### 4.1 已内置的事件

Analytics 组件已经内置了以下事件追踪：

| 事件名称 | 触发条件 | 用途 |
|---------|---------|------|
| `page_view` | 页面加载 | 统计浏览量 |
| `click` (outbound) | 点击外链 | 统计出站链接 |
| `scroll` | 阅读深度 25%/50%/75%/90% | 衡量内容吸引力 |
| `sign_up` | Newsletter 订阅成功 | 统计转化率 |

---

### 4.2 添加自定义事件

**示例 1：追踪文章阅读完成**

在 `PostLayout.astro` 中添加：

```astro
<script>
  // 检测用户是否读完文章（滚动到底部）
  let hasReachedEnd = false;
  
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 95 && !hasReachedEnd) {
      hasReachedEnd = true;
      
      // 发送 GA 事件
      if (typeof gtag !== 'undefined') {
        gtag('event', 'article_complete', {
          event_category: 'engagement',
          event_label: window.location.pathname,
          value: 1
        });
      }
    }
  });
</script>
```

---

**示例 2：追踪代码复制**

```astro
<script>
  // 追踪代码块复制行为
  document.addEventListener('copy', (e) => {
    const selection = window.getSelection().toString();
    
    if (selection.length > 50) {  // 复制内容超过 50 字符
      if (typeof gtag !== 'undefined') {
        gtag('event', 'code_copy', {
          event_category: 'engagement',
          event_label: 'code_snippet',
          value: selection.length
        });
      }
    }
  });
</script>
```

---

**示例 3：追踪 CTA 点击**

```astro
<a 
  href="/subscribe"
  onclick="gtag('event', 'click', { event_category: 'cta', event_label: 'subscribe_button' });"
>
  立即订阅
</a>
```

---

## 📈 步骤 5：设置转化目标

### 5.1 创建转化事件

1. **进入 GA4 管理界面**
   - 左下角齿轮图标 → `管理`

2. **配置转化事件**
   - 媒体资源 → `事件`
   - 点击事件名称旁的「标记为转化」

3. **推荐标记为转化的事件**
   - ✅ `sign_up`（Newsletter 订阅）
   - ✅ `article_complete`（文章读完）
   - ✅ `click` (分类为 CTA 的)

---

### 5.2 创建自定义目标

1. **进入转化**
   - `管理` → `转化`
   - 点击「新建转化事件」

2. **配置示例**
   ```
   事件名称：engaged_reader
   条件：
   - event_name = scroll
   - event_label = 75%
   ```

---

## 🎯 步骤 6：关键指标监控

### 6.1 必看报告

| 报告 | 路径 | 关注指标 |
|-----|------|---------|
| **实时报告** | 报告 → 实时 | 当前活跃用户 |
| **获客报告** | 报告 → 生命周期 → 获客 | 流量来源、渠道 |
| **互动报告** | 报告 → 生命周期 → 互动 | 页面浏览量、活跃度 |
| **转化报告** | 报告 → 生命周期 → 创收 → 转化 | 转化次数、转化率 |

---

### 6.2 自定义仪表板

创建专属博客仪表板：

1. **进入「探索」**
   - 左侧菜单 → `探索`

2. **创建新探索**
   - 模板：`空白`

3. **添加关键指标**
   ```
   维度：
   - 页面路径
   - 流量来源
   - 设备类别
   
   指标：
   - 用户
   - 会话
   - 互动率
   - 转化率
   ```

4. **可视化类型**
   - 折线图：趋势分析
   - 表格：详细数据
   - 饼图：来源占比

---

## 🔐 步骤 7：隐私合规

### 7.1 GDPR 合规

已在 Analytics 组件中配置：

```javascript
gtag('config', GA_ID, {
  anonymize_ip: true,  // IP 匿名化
});
```

### 7.2 添加隐私政策

创建 `src/pages/privacy.astro`：

```astro
---
import PageLayout from '~/layouts/PageLayout.astro';
---

<PageLayout title="隐私政策">
  <div class="prose mx-auto">
    <h1>隐私政策</h1>
    
    <h2>数据收集</h2>
    <p>
      本网站使用 Google Analytics 收集匿名访问数据，包括：
    </p>
    <ul>
      <li>页面浏览量</li>
      <li>访问来源</li>
      <li>设备类型</li>
      <li>地理位置（城市级别）</li>
    </ul>
    
    <h2>Cookie 使用</h2>
    <p>
      我们使用 Cookie 来改善用户体验和分析网站流量。
      您可以通过浏览器设置禁用 Cookie。
    </p>
    
    <h2>数据安全</h2>
    <p>
      我们不会出售、交易或转让您的个人信息。
      所有数据仅用于网站优化和内容改进。
    </p>
    
    <h2>联系方式</h2>
    <p>
      如有隐私相关问题，请联系：
      <a href="mailto:privacy@yourdomain.com">privacy@yourdomain.com</a>
    </p>
  </div>
</PageLayout>
```

---

### 7.3 添加 Cookie 同意横幅（可选）

```astro
<!-- src/components/CookieBanner.astro -->
<div id="cookie-banner" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <p class="text-sm">
      我们使用 Cookie 来改善用户体验。
      <a href="/privacy" class="underline">了解更多</a>
    </p>
    <button id="accept-cookies" class="bg-primary px-4 py-2 rounded text-sm">
      接受
    </button>
  </div>
</div>

<script>
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  
  if (localStorage.getItem('cookie-accepted') !== 'true') {
    banner.style.display = 'block';
  }
  
  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem('cookie-accepted', 'true');
    banner.style.display = 'none';
  });
</script>
```

---

## 📊 进阶配置

### UTM 参数追踪

在分享链接时添加 UTM 参数：

```
https://yourdomain.com/blog/ai-marketing?utm_source=twitter&utm_medium=social&utm_campaign=launch
```

参数说明：
- `utm_source`：流量来源（twitter, newsletter, zhihu）
- `utm_medium`：媒介类型（social, email, referral）
- `utm_campaign`：营销活动（launch, weekly, special）

---

### Google Search Console 集成

1. **访问 Search Console**
   - https://search.google.com/search-console

2. **添加资源**
   - 输入网站 URL
   - 选择验证方式：「Google Analytics」
   - 自动验证（因为已安装 GA）

3. **关联 GA4**
   - GA4 管理 → 媒体资源设置
   - Search Console 链接
   - 选择对应网站

---

## ✅ 完成检查清单

- [ ] 创建 GA4 账号
- [ ] 获取衡量 ID
- [ ] 配置环境变量
- [ ] 集成 Analytics 组件
- [ ] 验证数据收集
- [ ] 设置转化目标
- [ ] 创建自定义仪表板
- [ ] 添加隐私政策
- [ ] 关联 Search Console

---

## 🎯 关键指标参考

### 健康博客的数据标准

| 指标 | 新博客 | 成长期 | 成熟期 |
|-----|-------|-------|-------|
| **月活用户** | 1K-5K | 5K-20K | 20K+ |
| **跳出率** | < 70% | < 60% | < 50% |
| **平均会话时长** | 1-2 分钟 | 2-4 分钟 | 4+ 分钟 |
| **互动率** | 20-30% | 30-50% | 50%+ |
| **转化率（订阅）** | 1-2% | 2-5% | 5%+ |

---

## 🎉 完成！

现在你可以：
- ✅ 实时监控访问数据
- ✅ 分析用户行为
- ✅ 优化内容策略
- ✅ 追踪转化效果

**下一步**：
1. 定期查看报告（每周）
2. 分析热门内容
3. 优化低表现页面
4. A/B 测试标题和内容

---

*最后更新：2025-10-08*  
*参考：[GA4 官方文档](https://support.google.com/analytics)*

