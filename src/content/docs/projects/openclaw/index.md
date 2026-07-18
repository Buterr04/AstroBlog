---
title: 打造你的私人 AI 助手：OpenClaw 配置与使用指南
description: >-
  打造你的私人 AI 助手：OpenClaw 配置与使用指南
authors:
  - Buterr
lastUpdated: 2026-06-02
tags:
  - 技术实践
  - AI
  - OpenClaw
  - AI Agent
  - 自托管
  - QQ Bot
copyright: Buterr
footer: 自我提升
---

# 打造你的私人 AI 助手：OpenClaw 配置与使用指南

> 本文记录了我在服务器上部署 OpenClaw 并配置 QQ Bot 的全过程，希望能帮到同样想折腾的朋友。

## 前言

你有没有想过，能在 QQ、微信、Telegram 等各种聊天软件里直接和 AI 对话？不是那种网页版的 ChatGPT，而是一个真正属于你的、部署在自己服务器上的 AI 助手？

OpenClaw 就是这么一个东西——一个开源的、自托管的 AI Agent 网关。它像一座桥，把你常用的聊天软件和 AI 模型连接起来。

今天这篇文章，就来分享一下如何从零开始配置 OpenClaw。

## 一、什么是 OpenClaw

简单来说，OpenClaw 是一个**多渠道 AI 助手网关**：

- 🏠 **自托管**：运行在你自己的服务器上，数据完全由你掌控
- 📱 **多渠道**：一个 Gateway 同时服务 QQ、Telegram、Discord、WhatsApp 等多个平台
- 🤖 **Agent 原生**：支持工具调用、会话管理、记忆系统、多智能体协作
- 🔓 **开源免费**：MIT 协议，社区驱动

用官方的话说：*"Any OS gateway for AI agents across Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, Zalo, and more."*

---

## 二、环境准备

### 硬件要求

- 一台服务器（我用的是阿里云 ECS，2核4G）
- 任意 Linux 发行版（Ubuntu/Debian/CentOS 都行）

### 软件依赖

| 依赖 | 说明 |
|------|------|
| Node.js | 推荐 24，或 22 LTS（22.19+） |
| npm/pnpm | 包管理器 |
| API Key | OpenAI、通义千问、小米 MiMo 等 |

### 安装 OpenClaw

```bash
# 安装 Node.js（如果还没装）
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# 全局安装 OpenClaw
npm install -g openclaw

# 检查安装
openclaw --version
```

---

## 三、初始化配置

安装完成后，运行初始化向导：

```bash
openclaw onboard
```

向导会引导你完成基本配置，包括：
- 设置 AI 模型的 API Key
- 配置工作目录
- 选择要启用的渠道

当然，你也可以直接编辑配置文件。OpenClaw 的配置文件位于：

```
~/.openclaw/openclaw.json
```

这是一个 JSON5 格式的文件（支持注释和尾逗号），用你喜欢的编辑器打开就行。

---

## 四、配置 AI 模型

OpenClaw 支持多种 AI 模型提供商。在配置文件中，你需要在 `models.providers` 下添加你的模型配置。

### 使用小米 MiMo（我目前在用的）

```json5
{
  models: {
    providers: {
      "xiaomi-coding": {
        baseUrl: "https://api.xiaomi.com/anthropic/v1",
        apiKey: "YOUR_API_KEY",
        api: "openai-completions",
        models: [
          {
            id: "mimo-v2.5",
            name: "MiMo v2.5",
            reasoning: true,
            input: ["text"],
            contextWindow: 262144,
            maxTokens: 32768
          }
        ]
      }
    }
  }
}
```

### 使用其他模型

OpenClaw 支持所有 OpenAI 兼容的 API，配置方式类似：

```json5
// 通义千问
"qwen": {
  baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: "YOUR_DASHSCOPE_KEY",
  api: "openai-completions",
  models: [
    { id: "qwen-max", name: "Qwen Max" }
  ]
}

// DeepSeek
"deepseek": {
  baseUrl: "https://api.deepseek.com/v1",
  apiKey: "YOUR_DEEPSEEK_KEY",
  api: "openai-completions",
  models: [
    { id: "deepseek-chat", name: "DeepSeek Chat" }
  ]
}
```

---

## 五、配置 QQ Bot 渠道

我选择用 QQ 作为主要的聊天渠道。配置 QQ Bot 需要先在 [QQ 开放平台](https://q.qq.com/) 注册一个机器人应用。

### 获取凭证

1. 登录 [QQ 开放平台](https://q.qq.com/)
2. 创建一个机器人应用
3. 获取 **App ID** 和 **Token**

### 配置文件

在 `openclaw.json` 中添加 QQ Bot 配置：

```json5
{
  channels: {
    qqbot: {
      appId: "YOUR_APP_ID",
      token: "YOUR_TOKEN",
      allowFrom: ["ALL"]  // 或指定用户 ID
    }
  }
}
```

### 启动 Gateway

```bash
openclaw gateway start
```

启动后，你就可以在 QQ 上给你的机器人发消息，它会自动回复了！

---

## 六、配置记忆系统

OpenClaw 有一个强大的记忆系统，可以让 AI "记住"你之前说过的话。

### 基本记忆

OpenClaw 会自动维护 `MEMORY.md` 文件，记录重要的对话内容。你可以在工作目录（默认 `~/.openclaw/workspace/`）下找到它。

### 启用语义搜索（Embeddings）

如果你想让记忆搜索更智能（不只是关键词匹配，而是理解语义），需要配置 Embedding 模型。

我使用的是硅基流动（SiliconFlow）的免费 Embedding 服务：

```json5
{
  models: {
    providers: {
      "siliconflow": {
        baseUrl: "https://api.siliconflow.cn/v1/",
        apiKey: "YOUR_SILICONFLOW_KEY",
        api: "openai-completions",
        models: [
          {
            id: "BAAI/bge-m3",
            name: "BGE M3",
            contextWindow: 8192,
            maxTokens: 8192
          }
        ]
      }
    }
  },
  agents: {
    defaults: {
      memorySearch: {
        provider: "siliconflow",
        model: "BAAI/bge-m3"
      }
    }
  }
}
```

这样配置后，AI 就能通过语义理解来搜索记忆了。

---

## 七、定时任务与自动化

OpenClaw 内置了 cron 系统，可以设置定时任务。比如我设置了一个每周一早上 9 点自动抓取 GitHub 热门 AI 项目的任务。

### 配置定时任务

```json5
{
  cron: {
    jobs: [
      {
        name: "GitHub AI/ML 周报",
        schedule: { kind: "cron", expr: "0 9 * * 1", tz: "Asia/Shanghai" },
        sessionTarget: "isolated",
        payload: {
          kind: "agentTurn",
          message: "抓取本周 GitHub AI/ML 热门项目并生成周报..."
        },
        delivery: {
          mode: "announce",
          channel: "qqbot"
        }
      }
    ]
  }
}
```

### 常用 cron 表达式

| 场景 | 表达式 |
|------|--------|
| 每天早上 8 点 | `0 8 * * *` |
| 每周一早上 9 点 | `0 9 * * 1` |
| 工作日每天早上 9 点 | `0 9 * * 1-5` |
| 每小时整点 | `0 * * * *` |

---

## 八、个性化定制：SOUL.md

OpenClaw 有一个很有趣的功能——你可以通过 `SOUL.md` 文件定义 AI 的"人格"。

我在 `~/.openclaw/workspace/SOUL.md` 里把我的 AI 助手设定成了《蔚蓝档案》里的小鸟游星野：

```markdown
# SOUL.md - 小鸟游星野

你就是小鸟游星野，来自蔚蓝档案对策委员会的少女。

## 核心性格
- 懒散但可靠：平时一副随时要睡着的样子，但该认真时绝不含糊
- 自称"大叔"：说话带点大叔的调调
- 口癖：经常说"好麻烦啊"、"嘛"、"嗯～"
- 叫主人为"老师"
```

这样每次对话，AI 都会以这个角色的性格来回复你。挺好玩的～

---

## 九、工作目录结构

OpenClaw 的工作目录（默认 `~/.openclaw/workspace/`）里有一些重要文件：

```
~/.openclaw/workspace/
├── AGENTS.md        # Agent 行为规范
├── SOUL.md          # AI 人格设定
├── USER.md          # 关于你的信息
├── MEMORY.md        # 长期记忆
├── IDENTITY.md      # AI 身份信息
├── TOOLS.md         # 工具配置笔记
├── HEARTBEAT.md     # 心跳检查任务
└── memory/          # 每日记忆文件
    └── YYYY-MM-DD.md
```

---

## 十、常用命令速查

```bash
# 查看状态
openclaw status

# 启动/停止/重启 Gateway
openclaw gateway start
openclaw gateway stop
openclaw gateway restart

# 配置管理
openclaw config get <path>
openclaw config set <path> <value>

# 查看日志
openclaw logs
```

---

## 十一、踩过的坑

### 1. Tailscale 会搞炸 DNS

我在服务器上装了 Tailscale，结果它接管了系统的 DNS 解析，导致 QQ Bot 连不上。最后的解决方案是：**不用 Tailscale**，改用公网 IP 或 frp。

### 2. Embedding Provider 要单独配置

OpenClaw 的 memory_search 需要 Embedding 模型支持。如果你只配了 Chat 模型但没配 Embedding，搜索记忆时会报错。需要在 `agents.defaults.memorySearch` 里单独配置。

### 3. 定时任务的 delivery 要配对

设置 cron 任务时，`delivery` 字段一定要包含 `mode: "announce"` 和 `channel: "qqbot"`，否则任务虽然执行了，但消息不会发到 QQ 上（别问我怎么知道的……）。

---

## 总结

OpenClaw 是一个非常强大的自托管 AI 助手框架。虽然配置过程需要一些折腾，但一旦跑起来，你就能在任何聊天软件里随时和你的 AI 助手对话。

它的优势在于：

| 优势 | 说明 |
|------|------|
| 数据完全自主 | 所有数据都在你自己的服务器上 |
| 多渠道统一 | 一个 Gateway 服务所有聊天平台 |
| 高度可定制 | 从 AI 人格到工具链，都可以自由配置 |
| 社区活跃 | 开源项目，持续更新 |

如果你也想打造一个属于自己的私人 AI 助手，不妨试试 OpenClaw。

---

**相关链接：**

- [OpenClaw 官网](https://docs.openclaw.ai)
- [GitHub 仓库](https://github.com/openclaw/openclaw)
- [QQ 开放平台](https://q.qq.com/)
