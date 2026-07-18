---
title: Gemini API 使用笔记
sidebar:
  label: Gemini API 使用笔记
description: >-
  Gemini API 使用笔记
authors:
  - Buterr
lastUpdated: 2025-09-10
tags:
  - 技术笔记
  - AI
  - API
  - 程序设计
copyright: Buterr
footer: BUPT毕业设计附属文档
---

# Gemini API 使用笔记
>  Gemini API 是 Google 提供的一个强大接口，用于与 Gemini 系列大语言模型（LLM）进行交互。

## 1.获取 API 密钥
要使用 Gemini API，首先需要获取 API 密钥。访问 [Google AI Studio](https://aistudio.google.com/)，创建一个项目并启用 Gemini API。然后，导航到“API 和服务”部分，生成一个新的 API 密钥。

## 2.调用API密钥
在这个项目中，我们直接使用LangChain提供的接口来调用Gemini API。以下是一个简单的示例代码，展示了如何使用LangChain与Gemini API进行交互：

```python
from langchain.llms import Gemini
gemini = Gemini(model_name="gemini-2.5-flash", api_key="YOUR_API_KEY")
response = gemini("Hello, how can I use Gemini API?")
print(response)
```
