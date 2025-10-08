import type { APIRoute } from 'astro';

// Newsletter 订阅 API
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    if (!body) {
      return new Response(JSON.stringify({
        success: false,
        message: '请求体为空'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { email } = JSON.parse(body);
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        message: '请输入有效的邮箱地址'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 这里可以集成真实的邮件服务
    // 选项1: Resend (推荐)
    // 选项2: Mailchimp
    // 选项3: ConvertKit
    // 选项4: SendGrid
    
    // 示例：使用 Resend
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      // 发送欢迎邮件
      const welcomeEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AI小孩 <hello@aixiaohai.com>',
          to: [email],
          subject: '🎉 欢迎订阅 AI 周刊！',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2563eb, #f97316); color: white; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 28px;">🧭 欢迎加入 AI 小孩！</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">面对AI，我们都是学习者</p>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #2563eb;">感谢您的订阅！</h2>
                <p>您已成功订阅 AI 周刊，我们将每周为您发送：</p>
                
                <ul style="line-height: 1.8;">
                  <li>🔧 <strong>AI 工具周报</strong>：最新工具评测与使用技巧</li>
                  <li>📊 <strong>趋势深度分析</strong>：解读 AI 行业重要变化</li>
                  <li>📝 <strong>Prompt 模板库</strong>：实用模板直接套用</li>
                  <li>📚 <strong>学习资源推荐</strong>：精选课程与学习路径</li>
                </ul>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #f97316; margin-top: 0;">🎁 订阅福利</h3>
                  <p>作为新订阅用户，您将获得：</p>
                  <ul style="line-height: 1.6;">
                    <li>AI 工具清单（PDF版本）</li>
                    <li>Prompt 模板库（Excel版本）</li>
                    <li>独家深度文章访问权限</li>
                  </ul>
                </div>
                
                <p>如果您有任何问题或建议，请随时联系我们：</p>
                <p>📧 Email: <a href="mailto:hello@aixiaohai.com">hello@aixiaohai.com</a></p>
                <p>🌐 网站: <a href="https://www.aixiaohai.com">www.aixiaohai.com</a></p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://www.aixiaohai.com/blog" 
                     style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                    阅读最新文章
                  </a>
                </div>
              </div>
              
              <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 10px;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">
                  如果您不想再收到我们的邮件，可以 <a href="#" style="color: #2563eb;">取消订阅</a>
                </p>
              </div>
            </div>
          `
        })
      });

      if (!welcomeEmailResponse.ok) {
        throw new Error('发送欢迎邮件失败');
      }
    }

    // 记录订阅（可以存储到数据库）
    console.log(`Newsletter subscription: ${email}`);
    
    // Google Analytics 事件追踪
    // 这个会在前端处理
    
    return new Response(JSON.stringify({
      success: true,
      message: '订阅成功！请查收欢迎邮件 🎉'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: '订阅失败，请稍后重试'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
