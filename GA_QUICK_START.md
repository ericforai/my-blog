# 🚀 Google Analytics 快速配置（5 分钟）

## 第一步：获取 GA4 衡量 ID

### 方法 1：已有 GA 账号

1. 访问 https://analytics.google.com/
2. 选择或创建媒体资源
3. 点击「管理」（左下角齿轮图标）
4. 媒体资源 → 数据流 → 选择你的网站流
5. 复制「衡量 ID」（格式：G-XXXXXXXXXX）

### 方法 2：新用户注册（5 分钟）

**1. 创建 Google Analytics 账号**

访问：https://analytics.google.com/

点击「开始衡量」，填写信息：
```
账号名称：AI小孩博客
账号数据共享：按需勾选
```

**2. 创建媒体资源**
```
媒体资源名称：AI小孩
报告时区：(GMT+08:00) 中国时间 - 北京
货币：CNY - 人民币 ¥
```

**3. 选择业务详情**
```
行业类别：技术 > 互联网和电信
业务规模：小型（1-10 人）
使用 GA 的目的：
  ✅ 衡量客户参与度
  ✅ 获取客户洞察
```

**4. 设置数据流**
```
平台：网站
网站网址：https://yourdomain.com
流名称：网站数据流
```

**5. 复制衡量 ID**

创建完成后会显示：
```
衡量 ID: G-XXXXXXXXXX  ← 复制这个
```

---

## 第二步：配置网站

### 1. 创建环境变量文件

在项目根目录创建 `.env` 文件：

```bash
# 方式 1：手动创建
touch .env

# 方式 2：从模板复制
cp .env.example .env
```

### 2. 添加 GA ID

编辑 `.env` 文件，粘贴你的衡量 ID：

```bash
PUBLIC_GA_ID=G-XXXXXXXXXX  # 替换为你的实际 ID
```

**完整示例**：
```bash
# .env 文件内容
PUBLIC_GA_ID=G-ABC123XYZ9
```

### 3. 验证文件

确保 `.env` 文件内容正确：

```bash
cat .env
```

应该看到：
```
PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 第三步：测试验证

### 本地测试（开发环境）

```bash
# 1. 启动开发服务器
npm run dev

# 2. 打开浏览器访问
open http://localhost:4321

# 3. 打开开发者工具（F12）
# 4. 查看 Console，应该看到：
📊 Analytics: Disabled in development mode
```

✅ 这是正常的！开发环境不会发送数据到 GA。

---

### 生产环境测试

```bash
# 1. 构建生产版本
npm run build

# 2. 预览生产版本
npm run preview

# 3. 打开浏览器
open http://localhost:4321

# 4. 打开开发者工具 → Network 标签
# 5. 筛选 "google-analytics"
# 6. 应该看到请求发送到 GA 服务器
```

---

### GA4 实时验证

1. **访问 GA4 控制台**
   ```
   https://analytics.google.com/
   ```

2. **查看实时报告**
   - 左侧菜单：`报告` → `实时`
   - 应该看到「当前活跃用户」数据

3. **验证成功标志**
   - 活跃用户数：1（你自己）
   - 查看：过去 30 分钟的活动
   - 页面标题：显示你访问的页面

✅ **如果看到上述数据，说明配置成功！**

---

## 第四步：部署上线

```bash
# 1. 提交代码
git add .
git commit -m "feat: 集成 Google Analytics 4"

# 2. 确保 .env 不被提交
git status  # 应该看不到 .env 文件

# 3. 推送到远程仓库
git push

# 4. 触发部署（Vercel/Netlify 会自动部署）
```

### ⚠️ 重要：在部署平台配置环境变量

如果使用 **Vercel**：
1. 进入项目设置：`Settings` → `Environment Variables`
2. 添加变量：
   ```
   Name: PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   ```
3. 重新部署项目

如果使用 **Netlify**：
1. 进入 `Site settings` → `Build & deploy` → `Environment`
2. 添加变量：
   ```
   Key: PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   ```
3. 重新部署

---

## 🎯 验证清单

配置完成后，检查以下项目：

- [ ] ✅ 已获取 GA4 衡量 ID
- [ ] ✅ `.env` 文件已创建并配置
- [ ] ✅ 本地开发环境显示"Disabled"提示
- [ ] ✅ 生产环境可以看到 GA 请求
- [ ] ✅ GA4 实时报告显示活跃用户
- [ ] ✅ 部署平台已配置环境变量
- [ ] ✅ 线上网站已部署最新版本

---

## 📊 查看数据

### 实时数据（即时查看）

```
GA4 控制台 → 报告 → 实时
```

可以看到：
- 当前活跃用户
- 用户来源
- 正在浏览的页面
- 事件触发情况

### 历史数据（24 小时后）

```
GA4 控制台 → 报告 → 生命周期
```

可以看到：
- 用户获取（流量来源）
- 互动度（页面浏览、停留时间）
- 转化（订阅、点击等）

---

## 🔍 高级追踪（已内置）

Analytics 组件已经自动追踪以下事件：

| 事件 | 说明 | 用途 |
|-----|------|------|
| **page_view** | 页面浏览 | 统计访问量 |
| **click (outbound)** | 外链点击 | 追踪出站链接 |
| **scroll (25%/50%/75%/90%)** | 阅读深度 | 衡量内容吸引力 |
| **sign_up** | Newsletter 订阅 | 转化追踪 |

所有这些事件会自动记录，无需额外配置！

---

## ❓ 常见问题

### Q1: 看不到数据怎么办？

**检查步骤**：
1. 确认 `.env` 文件中的 ID 正确
2. 确认浏览器未安装广告拦截插件
3. 确认已部署到生产环境（开发环境不发送数据）
4. 等待 5-10 分钟（数据有延迟）

### Q2: 本地开发时能看到数据吗？

**不能！** 开发环境默认禁用 GA（避免污染数据）。

如果需要本地测试，修改 `Analytics.astro`：
```typescript
const isDev = false;  // 临时改为 false
```

### Q3: 如何更换 GA ID？

1. 编辑 `.env` 文件
2. 替换新的 ID
3. 重启开发服务器
4. 重新部署

### Q4: 数据会被其他人看到吗？

**不会！** 只有你（GA 账号所有者）能看到数据。

---

## 🎉 完成！

现在你可以：
- ✅ 实时监控网站访问
- ✅ 分析用户行为
- ✅ 优化内容策略
- ✅ 追踪转化效果

**下一步建议**：
1. 设置每周数据报告
2. 创建自定义仪表板
3. 设置转化目标
4. 关联 Google Search Console

详细教程见：`ANALYTICS_SETUP.md`

---

**🔗 有用的链接**

- [GA4 官方文档](https://support.google.com/analytics)
- [完整配置指南](./ANALYTICS_SETUP.md)
- [数据隐私政策](./ANALYTICS_SETUP.md#隐私合规)

---

**需要帮助？** 查看 `ANALYTICS_SETUP.md` 完整文档！

