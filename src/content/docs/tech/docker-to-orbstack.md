---
title: 从 Docker Desktop 迁移到 OrbStack
sidebar:
  label: Docker -> OrbStack 迁移
description: >-
  从 Docker Desktop 迁移到 OrbStack 的完整指南，包括安装、配置、迁移和踩坑记录。
authors:
  - Buterr
lastUpdated: 2026-07-15
tags:
  - Docker
  - OrbStack
  - macOS
  - 容器
---

# 从 Docker Desktop 迁移到 OrbStack：一次丝滑的容器体验升级

> 如果你也是 macOS 用户，并且正在使用 Docker Desktop 进行容器开发，那么 OrbStack 绝对值得你花 10 分钟来体验一下。本文将从安装、配置、迁移到踩坑，完整记录这次迁移的全过程。

---

## 一、为什么想换？

Docker Desktop 在 macOS 上的痛点，相信不少人都有共鸣：

- 🐢 **启动慢**：冷启动动辄几十秒，等待 VM 启动和 daemon 连接
- 💰 **收费**：2021 年起对非个人/非小型企业用户开始收费，且功能被切割
- 💾 **内存占用高**：即使空闲时，VM 也会常驻大量内存
- 🔧 **配置复杂**：资源限制、网络配置、磁盘映射都需要手动调
- 🐛 **稳定性**：时不时遇到 "connection refused"、镜像拉取失败等问题

OrbStack 作为 macOS 上的容器运行时替代方案，主打**轻量、快速、原生集成**，号称能做到秒级启动，而且对个人用户**永久免费**。

---

## 二、OrbStack 是什么？

OrbStack 是一个基于 Wasm（WebAssembly）的容器运行时，专门为 macOS 设计。它不依赖传统的 Linux VM（如 Docker Desktop 使用的 gVisor 或 HyperKit），而是通过 macOS 内核的原生网络栈和文件系统，直接运行容器。

**核心优势：**

| 对比项 | Docker Desktop | OrbStack |
|--------|----------------|----------|
| 启动速度 | 10-30 秒 | <1 秒 |
| 内存占用 | 4GB+（默认） | ~200MB |
| 文件系统速度 | 较慢（gRPC FUSE） | 原生 macOS 文件系统 |
| 免费策略 | 仅个人/小团队 | 个人用户永久免费 |
| 网络 | 需手动配置 | 自动分配宿主机可达 IP |
| 镜像格式 | OCI | OCI（兼容） |
| CLI | docker | docker（完全兼容） |

---

## 三、安装 OrbStack

### 3.1 下载安装

前往官网：https://orbstack.dev/

下载 `.dmg` 安装包，拖入 Applications 即可。

### 3.2 启动配置

首次启动时 OrbStack 会要求设置一些参数：

```
OrbStack Configuration
├─ Container runtime:  Linux / Windows
├─ Memory:             4 GB（推荐 8GB+）
├─ CPU:                4 cores
├─ Storage:            60 GB
└─ Enable Docker CLI:  ✅ 默认开启
```

保持默认即可，后续可以在设置面板调整。

### 3.3 验证安装

终端运行：

```bash
docker --version
docker ps
docker info
```

如果正常输出，说明迁移成功，`docker` 命令仍然可用，无需修改任何脚本。

---

## 四、迁移现有项目

### 4.1 导入已有镜像

Docker Desktop 的镜像可以直接导入：

```bash
# 在 Docker Desktop 中导出
docker save my-image -o my-image.tar

# 在 OrbStack 中导入
docker load -i my-image.tar
```

### 4.2 迁移 Docker Compose 项目

大多数 `docker-compose.yml` **无需修改**即可直接使用：

```bash
docker compose up -d
```

### 4.3 迁移 Dockerfile 构建的镜像

```bash
docker build -t my-app ./my-project/
```

完全兼容，无需改 Dockerfile。

### 4.4 迁移 Docker Volume 数据

⚠️ **这是最容易踩坑的地方！**

Docker Volume 数据**不会自动迁移**，需要手动导出再导入：

```bash
# 在 Docker Desktop 中
docker run --rm -v my-vol:/data alpine tar czf /tmp/data.tar.gz -C /data .

# 导入到 OrbStack
docker run --rm -v my-vol-new:/data -v $(pwd):/tmp alpine sh -c "tar xzf /tmp/data.tar.gz -C /data"
```

如果是简单目录挂载（`-v ./data:/app/data`），直接用宿主机路径即可，无需迁移。

---

## 五、OrbStack 的独特功能

### 5.1 原生宿主机可达网络

OrbStack 为每个容器自动分配一个宿主机可访问的 IP，无需手动映射端口：

```bash
docker run -d --name my-app nginx
docker inspect my-app --format '{{.NetworkSettings.IPAddress}}'
# 输出: 127.0.0.1（自动分配，浏览器直接访问）
```

### 5.2 多运行时切换

同一台机器可以同时运行 **Linux 容器**和 **Windows 容器**：

```bash
orb settings runtime linux   # 切换 Linux
orb settings runtime windows # 切换 Windows
```

### 5.3 Wasm 容器支持

OrbStack 原生支持 Wasm 容器，这是 Docker Desktop 不具备的：

```bash
docker run --rm --platform wasi/wasm cloudwego/helloworld
```

### 5.4 资源控制

```bash
# 查看当前资源使用
orb stats

# 调整内存限制
orb settings memory 8192
```

---

## 六、踩坑记录

### 6.1 镜像拉取慢

OrbStack 默认镜像仓库在国内访问较慢，建议配置镜像加速器：

```bash
orb settings registry-mirror add https://mirror.ccs.tencentyun.com
```

或者使用国内镜像源配置到 Docker 配置中：

```bash
# 编辑 ~/.docker/daemon.json
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://hub-mirror.c.163.com"
  ]
}
```

### 6.2 Docker Volume 不兼容

如前所述，Docker Volume 数据需要手动迁移。如果项目依赖 Volume 存储数据，提前导出。

### 6.3 企业版功能缺失

OrbStack 对非个人用户（企业）仍提供功能，但与 Docker Desktop 的企业级功能（如内容信任、镜像签名等）相比仍有差距。

### 6.4 某些系统调用不兼容

极少数依赖特定 Linux 内核特性的容器（如某些 GPU 加速场景）可能无法完美运行。

---

## 七、总结

| 项目 | 评价 |
|------|------|
| 迁移难度 | ⭐⭐ 低（镜像和 Compose 无需改） |
| 启动速度 | ⭐⭐⭐⭐⭐ 秒级 |
| 资源占用 | ⭐⭐⭐⭐⭐ 极低 |
| 功能完整度 | ⭐⭐⭐⭐ 满足个人开发需求 |
| 稳定性 | ⭐⭐⭐⭐ 基本无问题 |

**推荐场景：**

- ✅ 个人开发、学习、小型项目
- ✅ CI/CD 本地调试
- ✅ 需要快速启动/停止容器的场景
- ❌ 企业级生产环境（功能仍有差距）
- ❌ 需要 GPU 加速的容器

**一句话总结：OrbStack 是 macOS 开发者在 Docker Desktop 之外最轻量、最优雅的替代选择。如果你只是用来本地开发和调试，迁移过来只会让你更爱容器。**

---

> 📝 文章作者：Buterr  
> 📅 更新时间：2026-07-15  
> 🏷️ 标签：Docker, OrbStack, macOS, 容器
