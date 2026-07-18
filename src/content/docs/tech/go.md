---
title: Go语言
sidebar:
  label: Go语言
description: >-
  Go语言
authors:
  - Buterr
lastUpdated: 2025-07-10
tags:
  - 技术笔记
  - Go语言
copyright: Buterr
footer: 自我提升
---

# Go语言

## Go 语言用途
Go 语言被设计成一门应用于搭载 Web 服务器，存储集群或类似用途的巨型中央服务器的系统编程语言。

### Go语言程序结构
#### Go 语言的基础组成有以下几个部分：
* 包声明
* 引入包
* 函数
* 变量
* 语句 & 表达式
* 注释

举例
```go
package main // 包声明

import "fmt" // 引入包

// 函数
func main() {
    fmt.Println("Hello, World!")
}
```
* package main表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包。
* import "fmt" 引入了 fmt 包，提供格式化 I/O 函数。
* func main() 定义了一个名为 main 的函数，这是程序的入口点。
* fmt.Println("Hello, World!") 调用 fmt 包中的 Println 函数，输出字符串 "Hello, World!" 到标准输出。

<font color=Red>注意：`{` 符号不可单独成行，否则报错</font>

