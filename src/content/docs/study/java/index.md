---
title: Java高级语言程序设计 笔记📒
description: >-
  Java高级语言程序设计 笔记📒
authors:
  - Buterr
lastUpdated: 2024-06-02
tags:
  - 课程笔记
  - Java
  - 程序设计
copyright: Buterr
footer: BUPT2024春季课程
---

# Java 高级语言程序设计 笔记

## 一、基础语法

### 1.1 标识符

- 首字母不得是数字，区分大小写
- 由字母、数字、下划线、美元符号`$`组成
- 不能使用关键字

### 1.2 访问修饰符

| 修饰符 | 访问范围 |
|--------|----------|
| `public` | 本包及外部包均可访问 |
| `protected` | 当前类的子类 |
| `private` | 仅本类访问 |
| 默认（无修饰符） | 本包内访问 |

### 1.3 基本数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `boolean` | 布尔型 | `true` / `false` |
| `char` | 字符型 | `'A'` |
| `byte` | 字节型 | `127` |
| `short` | 短整型 | `32767` |
| `int` | 整型 | `100` |
| `long` | 长整型 | `34L` |
| `float` | 单精度浮点 | `1.5F` |
| `double` | 双精度浮点 | `3.14` |

### 1.4 类型转换

- **隐式转换**：低级 → 高级（自动）
- **显式转换**：高级 → 低级（需强制转换符）

```java
double d = 100;      // 隐式：int → double
int i = (int) 3.14;  // 显式：double → int
```

### 1.5 运算符

```java
Math.pow(2.0, 3.0);  // 幂运算：2³
7 / 5                 // 整除：1
7 % 5                 // 取模：2（符号与第一个操作数相同）
```

**布尔运算：**`&` AND、`|` OR、`^` XOR、`!` NOT

**条件运算：**`&&` AND、`||` OR

**位运算：**`<<` 左移、`>>` 右移、`>>>` 无符号右移

**三元运算：**`条件 ? 表达式1 : 表达式2`

---

## 二、面向对象程序设计

### 2.1 核心概念

- **类（Class）**：对象的模板，具有共同特征的数据和方法的封装
- **对象（Object）**：类的实例
- **三大特性**：封装性、继承性、多态性

### 2.2 类的定义

```java
[修饰符] class 类名 [extends 父类名] [implements 接口名] {
    // 成员域
    // 构造方法
    // 成员方法
}
```

**类修饰符：**

| 修饰符 | 说明 |
|--------|------|
| `public` | 可被所有Java软件包使用 |
| `abstract` | 抽象类，不能被实例化 |
| `final` | 最终类，不能被继承 |
| `default` | 只能在当前包内使用 |

### 2.3 成员域（Field）

```java
[修饰符] 类型 变量名 [= 初始值];
```

### 2.4 构造方法

```java
[修饰符] 类名(参数列表) {
    方法体
}
```

- 用于创建类的实例对象并完成初始化
- 默认构造方法：不含任何参数
- 定义顺序：成员域 → 构造方法 → 成员方法

### 2.5 方法修饰符

`public`、`protected`、`private`、`abstract`、`static`、`final`、`synchronized`

### 2.6 多态性

- **重载（Overload）**：同一个类中的同名方法，参数列表不同
- **覆盖（Override）**：子类和父类中声明相同的非静态方法

```java
// 重载
public int add(int a, int b) { ... }
public double add(double a, double b) { ... }

// 覆盖
class Parent { void speak() { } }
class Child extends Parent { @Override void speak() { } }
```

### 2.7 关键字

- `super`：调用父类被覆盖的成员方法
- `this`：当前类的对象
- `instanceof`：判断对象是否是某个类的实例
- `package` / `import`：创建/导入包

### 2.8 继承

- Java不支持多重继承（只能有一个父类）
- 隐式转换：子类型 → 父类型
- 显式转换：父类型 → 子类型（需强制转换符）

---

## 三、常用类

### 3.1 String

```java
String.valueOf(123);  // 转换为字符串 "123"
```

### 3.2 迭代器

```java
import java.util.Iterator;
Iterator it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}
```

### 3.3 枚举

- 修饰符只能是`public`或默认
- 不能通过`new`运算符创建
- 常用于`switch`语句

```java
enum Color { RED, GREEN, BLUE }
Color c = Color.RED;
```
