#!/bin/bash

# OpenAI API Key 配置脚本

echo "🔑 配置 OpenAI API Key..."

# 检查是否已存在 .env 文件
if [ -f ".env" ]; then
    echo "⚠️  .env 文件已存在，是否覆盖？(y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ 取消配置"
        exit 1
    fi
fi

# 创建 .env 文件
cat > .env << EOF
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Image Generation Settings
AI_IMAGE_MODEL=dall-e-3
AI_IMAGE_SIZE=1024x1024
AI_IMAGE_QUALITY=standard
AI_IMAGE_STYLE=natural

# Cache Settings
AI_IMAGE_CACHE_ENABLED=true
AI_IMAGE_CACHE_DIR=./public/generated-images
EOF

echo "✅ .env 文件创建成功！"
echo ""
echo "📋 下一步操作："
echo "1. 重启开发服务器: npm run dev"
echo "2. 在页面中设置 useAIImage: true"
echo "3. 测试 AI 图片生成功能"
echo ""
echo "💰 成本提醒："
echo "- 单张图片约 $0.01-0.02"
echo "- 建议先测试少量文章"
echo "- 监控 OpenAI 控制台使用情况"
echo ""
echo "🔒 安全提醒："
echo "- .env 文件已添加到 .gitignore"
echo "- 不要将 API Key 提交到版本控制"
echo "- 定期检查 API 使用情况"
