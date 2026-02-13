

```markdown
# DemoLanguageWebRun

一个在线代码执行与语法高亮展示的 Web 应用。

## 项目简介

DemoLanguageWebRun 是一个前后端分离的代码演示平台，支持代码语法解析高亮与在线执行功能。项目采用 Go 语言构建后端服务，React + TypeScript + Vite 构建前端界面。

## 技术栈

### 后端 (Server)
- **Go** - 主要开发语言
- **Gin** - Web 框架
- **RESTful API** - 接口设计风格

### 前端 (Web)
- **React** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **CSS Modules** - 样式管理

## 项目结构

```
DemoLanguageWebRun/
├── server/                 # Go 后端服务
│   ├── main.go            # 程序入口
│   ├── parser_controller.go # 语法解析控制器
│   ├── run_code_controller.go # 代码执行控制器
│   └── token.go           # Token 数据结构定义
├── web/                    # React 前端应用
│   ├── src/
│   │   ├── App.tsx        # 主应用组件
│   │   ├── App.css        # 主样式文件
│   │   └── ...
│   ├── index.html
│   └── package.json
└── LICENSE
```

## 功能特性

1. **代码语法高亮** - 支持关键词、标识符、括号、数字、字符串、注释等语法元素的彩色显示
2. **在线代码解析** - 对输入代码进行词法分析，生成 Token 序列
3. **代码执行** - 支持在线运行代码并展示执行结果
4. **错误提示** - 语法错误可视化展示

## 快速开始

### 前置条件

- Go 1.16+
- Node.js 16+
- npm 或 yarn

### 启动后端服务

```bash
cd server
go mod download
go run main.go
```

后端服务默认运行在 `http://localhost:8080`

### 启动前端开发服务器

```bash
cd web
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/parse` | POST | 解析代码并返回 Token 序列 |
| `/api/run` | POST | 执行代码并返回结果 |

### 请求示例

```bash
# 解析 Token
curl -X POST http://localhost:8080/api/parse \
  -H "Content-Type: application/json" \
  -d '{"code": "your code here"}'

# 执行代码
curl -X POST http://localhost:8080/api/run \
  -H "Content-Type: application/json" \
  -d '{"code": "your code here"}'
```

## 使用说明

1. 在代码输入框中编写代码
2. 点击「解析」按钮查看词法分析结果（Token 序列）
3. 点击「运行」按钮执行代码并查看输出结果
4. 语法错误会在界面上以红色标注

## 许可证

本项目采用 MIT 许可证，详见 LICENSE 文件。

## 贡献指南

欢迎提交 Issue 和 Pull Request 来完善本项目。
```