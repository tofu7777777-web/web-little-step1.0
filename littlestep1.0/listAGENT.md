# list应用 AI 开发指令

## 项目概述
-小脚印（Little Steps）是一款面向 6–15 岁学生的任务管理与成长辅助 Web 应用。
###
核心目标：
-帮助学生建立时间管理意识
-用“可爱陪伴式”体验提升持续使用意愿
-用可视化方式展示每日时间投入情况

## 开发规范
###前端：
-React + Vite
-TypeScript
-TailwindCSS
-Zustand（轻量状态管理）
-Day.js（日期处理）

###后端：
-Node.js + Express
-TypeScript
-RESTful API

###数据库：
-PostgreSQL
-使用 Prisma ORM

###部署：
-Docker 容器化
-环境变量管理敏感信息

###框架原则
-前后端分离
-单体架构（MVP 阶段）
-RESTful API 设计规范
-数据库使用关系型结构
-所有接口返回统一 JSON 格式
{
  "success": true,
  "data": {},
  "message": ""
}

## 代码风格
###通用原则
-保持函数单一职责
-每个文件只做一件事
-不写超过 300 行的文件
-不嵌套超过 3 层

###
-变量：camelCase
-组件：PascalCase
-数据库字段：snake_case
-API路径：
/api/tasks
/api/tasks/:id
/api/tasks/date/:date

###目录架构规范
####前端
src/
 ├── components/
 ├── pages/
 ├── store/
 ├── services/
 ├── hooks/
 ├── utils/
 └── types/

####后端
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middleware/
 ├── prisma/
 └── utils/

####UI规范
视觉风格必须符合：
马卡龙色系
圆角（rounded-2xl）
大按钮
卡片式布局
无商务感
无复杂表格

移动端优先：
以 375px 宽度为基准设计
使用 flex + grid
不允许出现横向滚动

###数据模型规范
User
id
nickname
password_hash
created_at
Task
id
title
category
due_date
status
user_id
created_at
SubTask
id
title
status
task_id

## 测试要求
1. 手动测试清单
每个功能完成后必须测试：
创建任务是否成功
子任务是否正确保存
状态切换是否更新数据库
刷新页面是否数据仍存在

2. 边界情况测试
空标题
超长标题（>100字）
同一天多个任务
子任务为空
删除父任务是否级联删除子任务

3. 数据验证
后端必须校验字段
不允许信任前端输入
所有写操作必须 try/catch

## 注意事项
-不要一开始实现能量豆系统
-不要实现宠物系统
-不要实现社交功能
-不要做权限分级
-不要引入复杂状态机
-MVP 原则：先让“任务创建 + 查看 + 完成”完整闭环跑通。
