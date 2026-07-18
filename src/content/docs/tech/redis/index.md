---
title: Redis（Remote Dictionary Server）
description: >-
  Redis（Remote Dictionary Server）
authors:
  - Buterr
lastUpdated: 2025-01-01
---

# Redis（Remote Dictionary Server）

> Redis是一个开源的内存数据库，遵守 BSD 协议，它提供了一个高性能的键值（key-value）存储系统，常用于缓存、消息队列、会话存储等应用场景。通常用于处理高并发操作

## 一、为什么选择 Redis？

相比传统数据库或文件系统，Redis 有以下优势：

- 🚀 **超快的访问速度**：所有数据存储于内存中，读写速度可达十万级 QPS。
- 📦 **丰富的数据结构**：支持字符串、列表、集合、有序集合、哈希等多种结构。
- 💾 **支持持久化**：通过 RDB、AOF 两种方式将内存快照保存到磁盘。
- 📡 **内置高可用机制**：支持主从复制、哨兵、集群部署。
- 🧠 **广泛应用场景**：从缓存到排行榜、分布式锁等，都能胜任。

---

## 二、Redis 常见数据结构

| 类型   | 示例命令                    | 典型应用场景         |
|--------|-----------------------------|----------------------|
| String | `SET key value`             | 缓存对象、计数器     |
| Hash   | `HSET user:1 name "Tom"`    | 用户信息、配置项     |
| List   | `LPUSH list "msg1"`         | 消息队列、任务队列   |
| Set    | `SADD tags "java"`          | 去重、标签系统       |
| ZSet   | `ZADD rank 100 "Tom"`       | 排行榜、延时任务队列 |
| 类型   | 应用                             | 示例命令 |
|--------|----------------------------------|----------|
| String | 单个值，如 Token、验证码         | `SET key value` |
| Hash   | 对象结构，如用户信息             | `HSET user:1 name "Tom"` |
| List   | 队列，适合任务异步处理           | `LPUSH queue task` |
| Set    | 去重集合，适合标签、抽奖池       | `SADD lottery user:1` |
| ZSet   | 有序集合，适合排行榜/延时任务    | `ZADD rank 100 user:1` |

---


