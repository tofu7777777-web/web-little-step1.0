# 技术应用技术设计

## 技术栈
1.1 前端技术
###框架/库:
-React.js：用于构建用户界面，提供高效的组件化开发，使得UI层次清晰，易于维护和扩展。
-Redux：用于全局状态管理，帮助管理任务列表、用户信息、UI状态等。
-Styled Components 或 CSS Modules：用于CSS-in-JS样式管理，确保样式与组件逻辑解耦，并支持动态样式调整。
-React Router：用于前端页面导航管理，支持单页面应用(SPA)的路由跳转。
-Day.js 或 Moment.js：用于日期和时间处理，生成日历视图所需的时间数据。

###UI库/框架:
-Ant Design 或 Material-UI：提供丰富的UI组件，能够加速开发进度，如按钮、弹窗、日历视图、进度条等。
-Framer Motion：用于动画效果，增强界面的互动性，尤其是在任务完成、过渡等场景中的应用。

1.2 后端技术
###框架:
-Node.js + Express：用于处理API请求，支持RESTful风格的接口，易于与前端进行数据交互。
-GraphQL：用于灵活的数据查询，减少冗余请求和提升性能，尤其是在数据需求复杂或多变的情况下。

1.3 数据库
###关系型数据库:
-PostgreSQL：一个功能强大的开源关系型数据库，能够高效地存储任务数据、用户信息和历史记录等结构化数据。

###非关系型数据库:
-MongoDB：用于存储不规则的数据，如任务的备注信息、用户的成长日志等。

###缓存:
-Redis：用于存储一些高频访问的数据，如用户任务缓存、提醒通知等，提升响应速度。

1.4 云平台与部署
###云服务:
-AWS 或 阿里云：用于托管后端服务，支持弹性扩展，能够处理大量的并发请求。
-CDN:Cloudflare：加速前端资源加载，提升用户体验。
###容器化:
-Docker：用于部署前后端服务，简化环境配置和管理。
-Kubernetes：用于自动化管理和扩展容器应用，保证系统的高可用性和可伸缩性。

## 项目结构
###前端：
/src
├── /assets                # 存放图片、图标等静态资源
├── /components            # 可复用组件，如按钮、任务列表项
├── /pages                 # 页面组件，如任务详情、首页、个人空间
├── /redux                 # 全局状态管理
├── /services              # 接口请求服务，如任务相关API
├── /styles                # 样式文件，支持CSS-in-JS
├── /utils                 # 工具函数，如日期格式化、UI动画等
├── App.js                 # 主应用入口
└── index.js               # 项目入口文件

###后端：
/src
├── /controllers           # 控制器，处理请求并返回数据
├── /models                # 数据模型定义，PostgreSQL数据结构
├── /routes                # API路由配置
├── /middlewares           # 中间件，如认证、错误处理
├── /services              # 业务逻辑层，处理具体的任务管理逻辑
├── /utils                 # 工具函数，如日期处理、通知推送
└── index.js               # 后端服务器启动文件


## 数据模型
###用户模型
{
  "user_id": "string", // 用户唯一标识符
  "username": "string", // 用户名
  "email": "string",    // 邮箱地址
  "password_hash": "string", // 密码（加密存储）
  "created_at": "datetime",  // 账号创建时间
  "updated_at": "datetime"   // 账号更新时间
}

###任务模型
{
  "task_id": "string",     // 任务唯一标识符
  "title": "string",       // 任务标题
  "description": "string", // 任务描述
  "category": "string",    // 任务类别（作业、生活、习惯等）
  "due_date": "datetime",  // 任务截止日期
  "status": "string",      // 任务状态（待办、进行中、已完成）
  "user_id": "string",     // 关联的用户ID
 "subtasks": [            // 子任务列表
    {
      "subtask_id": "string",
      "title": "string",
      "status": "string"
    }
  ],
  "tags": ["string"],      // 任务标签，如：运动、家务等
  "created_at": "datetime",
  "updated_at": "datetime"
}

###日历模型
{
  "calendar_id": "string", // 日历ID
  "user_id": "string",     // 关联的用户ID
  "tasks": [               // 关联的任务
    {
      "task_id": "string",
      "date": "datetime"   // 任务对应的日期
    }
  ]
}

###成长日志模型
{
  "log_id": "string",      // 日志唯一标识符
  "user_id": "string",     // 关联的用户ID
  "log_content": "string", // 日志内容
  "log_date": "datetime"   // 日志记录时间
}

