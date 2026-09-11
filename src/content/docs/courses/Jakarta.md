---
title: Jakarta EE程序设计 笔记📒
sidebar:
  label: 程序设计
description: >-
    Jakarta EE程序设计 笔记📒
authors:
  - Buterr
lastUpdated: 2026-09-11
tags:
  - 课程笔记
  - Jakarta EE
  - 程序设计
copyright: Buterr
footer: UESTC 2026秋季课程
---

# 面向对象的Jakarta EE程序设计

实验过程存储在仓库Github
https://github.com/Buterr04/JakartaEE_PRS

## 实验环境
Tomcat 10.1.44  JDK 21

## Web & Servlet
Web：超文本，可跳转
Servlet：Java编写的服务器端程序，运行在服务器上，处理客户端HTTP请求并生成响应。大多数情况下返回HTML页面。
    是一个Java类，由Web容器加载调用

## 如何编写Servlet：
### 引入Java包以使用
```java
import jakarta.servlet.*;
import jakarta.servlet.http.*;
```


### 可扩展Servlet类
```java
// 创建一个HelloServlet类，继承HttpServlet
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 处理GET请求
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 处理POST请求
    }
}
```
可以直接使用封装好的HTTP请求处理机制

### 重写核心方法
```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 处理GET请求
}
@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 处理POST请求
}
```

### 按需重写生命周期方法
Web资源获取释放
```java
@Override
public void init() throws ServletException {
    // 初始化Servlet
}
@Override
public void init(ServletConfig config) throws ServletException {
    // 初始化Servlet
}
@Override
public void destroy() {
    // 销毁Servlet
}
```
可以在Servlet生命周期中获取和释放资源

### 部署与访问

修改web.xml配置映射
```xml

```
或者直接注解
```java
@WebServlet("/hello")
```
GET 获取信息，POST 提交信息

构造方法以及init方法只会执行一次，init在启动时执行一些一次性的初始化任务。构造方法一般不需要手动编写。

构造方法-创建对象本身｜init方法-进行一些初始化操作

XML配置：Servlet 3.0之后可以使用注解@WebServlet来代替web.xml配置，简化了配置过程。
```xml
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    // 方法
}
```
用于声明WebServlet类

## HTTP请求与响应
- web：request 与 response（每次都是独立的）

### Jakarta EE 请求对象
HTTP Servelet Request对象，包含请求行、请求头与请求体
```java
// 通用
jakarta.servlet.ServletRequest request = ...;

// HTTP专用
jakarta.servlet.http.HttpServletRequest httpRequest = ...;
``` 

- 每次请求都是独立的
- 不能将数据保存在Request对象中，因为每次请求都会创建新的Request对象

### HTTPServelet方法
```java
// 获取请求参数
String getProtocol() // 获取请求协议
String getMethod() // 获取请求方法
String getRequestURL() // 获取请求URL，返回的是StringBuffer对象
String getRequestURI() // 获取请求URI，URI是URL的一部分，去掉了协议、主机和端口号
```

