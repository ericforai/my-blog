# Eric's AI Blog

探索AI、营销与技术的前沿思考

## 🚀 项目结构

```
📂 my-blog/
 ┣ 📁 src/                # 主代码目录
 ┃ ┣ 📁 components/       # 页面组件（导航栏、页脚等）
 ┃ ┣ 📁 layouts/          # 页面布局模板
 ┃ ┣ 📁 pages/            # 站点页面（index、blog、about等）
 ┃ ┣ 📁 styles/           # 样式文件
 ┃ ┗ 📁 config.mjs        # 站点配置
 ┣ 📁 public/             # 公共资源（图片、Logo等）
 ┣ 📄 astro.config.mjs    # Astro 主配置文件
 ┣ 📄 package.json        # 依赖与脚本
 ┗ 📄 tailwind.config.js  # Tailwind 主题与样式配置
```

## 🛠️ 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 `http://localhost:4321` 查看网站

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 🎨 自定义配置

### 修改站点信息
编辑 `src/config.mjs` 文件来修改站点标题、描述等信息。

### 调整主题色
编辑 `tailwind.config.js` 中的 `colors` 配置来更改主题颜色。

### 替换 Logo
替换 `public/logo.svg` 文件。

## 📝 添加文章

在 `src/pages/blog/` 目录下创建新的 `.astro` 或 `.md` 文件来添加博客文章。

## 🚀 部署到 Vercel

1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测 Astro 项目并配置构建设置
5. 点击部署即可

## 📄 许可证

MIT

