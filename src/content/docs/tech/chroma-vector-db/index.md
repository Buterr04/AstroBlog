---
title: Chroma 向量数据库
description: >-
  Chroma 向量数据库
authors:
  - Buterr
lastUpdated: 2025-12-09
tags:
  - 技术笔记
  - AI Agent
  - 向量数据库
copyright: Buterr
footer: BUPT毕业设计附属文档
---

# Chroma 向量数据库
 > Chroma是一个开源的向量数据库，专为存储和检索高维向量数据而设计。它在处理大规模机器学习和人工智能应用中的向量数据时表现出色，提供了高效的存储和快速的查询能力。

在本项目中，Chroma被用作主要的向量存储解决方案

配置：
 
```bash
pip install chromadb
```

使用示例：
    
```python
    from langchain.vectorstores import Chroma
    from langchain.embeddings import OpenAIEmbeddings
    from langchain.text_splitter import CharacterTextSplitter
    from langchain.document_loaders import TextLoader
    # 加载文本数据
    loader = TextLoader('example.txt')
    documents = loader.load()
    # 分割文本数据
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(documents)
    # 创建嵌入模型
    embeddings = OpenAIEmbeddings()
    # 创建Chroma向量存储
    vectorstore = Chroma.from_documents(texts, embeddings)
    # 查询向量存储
    query = "示例查询"
    docs = vectorstore.similarity_search(query)
    for doc in docs:
        print(doc.page_content)
 ```

 
## 数据持久化

Chroma支持数据持久化，允许用户将向量数据存储在磁盘上，以便在应用程序重启后继续使用。可以通过指定`persist_directory`参数来启用持久化功能。