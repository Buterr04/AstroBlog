---
title: Python for Data Analysis 📒
sidebar:
  label: Python for Data Analysis
description: >-
    Python for Data Analysis 笔记📒
authors:
  - Buterr
lastUpdated: 2026-11-04
tags:
  - 课程笔记
  - Python
  - 程序设计
copyright: Buterr
footer: ESIGELEC 2026秋季课程
---

# Python for Data Analysis

> 根据课堂转写、Session 1–4 幻灯片及课程练习重新整理。案例和代码已融入对应知识点，不再单独设置 TP 章节。文末是一套全新的 **20 道单项选择 MCQ**，附中文翻译、答案与解析。

## 课程主线与考核

学习路径：**Python 基础 → NumPy 数组 → pandas 表格 → 数据清洗 → 数据可视化与解释**。

按课堂说明，成绩由 MCQ 15%、实践作业 15%、项目与展示 70% 构成。项目不仅看代码，还看能否解释：为什么这样清洗、为什么选这张图、结果说明了什么。

---

# 第一章 Python：表达数据、编写逻辑、完成基础统计

## 1. 类型、变量与表达式

| 类型 | 含义 | 示例 |
|---|---|---|
| `int` | 整数 | `42` |
| `float` | 浮点数 | `3.14` |
| `complex` | 复数 | `2 + 1j` |
| `bool` | 布尔值 | `True`、`False` |
| `str` | 字符串 | `"Paris"` |

变量是值的名称，名称区分大小写，不能以数字开头。常量通常用全大写表示，如 `VERSION`，但这只是约定。

```python
value = 17
print(type(value))       # <class 'int'>
print(value / 5)         # 3.4，/ 总是得到 float
print(value // 5, value % 5, value ** 2)  # 3 2 289
```

- 运算优先级：括号 → `**` → `* / // %` → `+ -`。
- `==` 判断相等，`!=` 判断不等，`=` 是赋值。
- `int(3.9)` 截去小数得到 `3`，`round(3.9)` 四舍五入得到 `4`。
- 字符串乘整数表示重复；不兼容的运算应通过阅读报错定位类型问题。

## 2. 输入、转换与格式化输出

`input()` 和文件中读出的文本通常是字符串，计算前必须转换：

```python
hours, minutes, seconds = "2", "35", "20"
total_seconds = int(hours) * 3600 + int(minutes) * 60 + int(seconds)
```

```python
a, b = input("Two values: ").split()  # 输入值数量需匹配变量数量
x = int(input("Integer: "))
```

常用输出方式：

```python
print(f"{5 / 3:.2f}")       # 1.67
print(f"{1234567:,}")       # 1,234,567
print(f"{30.22:+.1f}%")     # +30.2%
print("A", "B", sep="--") # A--B
print("A", end=" ")       # 控制结尾，默认是换行
```

f-string 中还可控制宽度、补零、填充和左右对齐，用于整齐的结果表。

## 3. 条件、循环与函数

```python
if passengers >= 100_000_000:
    size = "very large"
elif passengers >= 30_000_000:
    size = "large"
else:
    size = "medium"
```

缩进决定代码块。复杂条件可使用 `and`、`or`、`not`，也可写 `10 < x < 20`。

```python
total = 0
count = 0
for value in values:
    total += value
    if value > 100_000_000:
        count += 1
```

- `range(start, stop, step)` 不包含 `stop`。
- `break` 退出循环，`continue` 跳过本轮。
- `zip(a, b)` 并行遍历，`enumerate(a, start=1)` 同时提供编号和值。

函数用于复用明确的一段逻辑：

```python
def percent_change(old, new):
    return 100 * (new - old) / old

print(f"{percent_change(100, 120):+.1f}%")  # +20.0%
```

没有 `return` 的函数返回 `None`。`lambda x: x * 2` 是简短匿名函数，后续常见于排序和 pandas `apply()`。

## 4. 四种核心数据结构

| 结构 | 特点 | 典型用途 |
|---|---|---|
| `list` | 有序、可变、允许重复 | 保存序列、逐项统计 |
| `tuple` | 有序、不可变 | 固定记录、解包 |
| `set` | 无序、元素唯一 | 去重、比较两个群体 |
| `dict` | 键值对、保持插入顺序 | 按 ID 查找、计数、分组 |

### 列表与元组

```python
values = [10, 20, 30]
print(values[0], values[-1], values[1:3])
values.append(40)

squares = [x ** 2 for x in values]
ordered = sorted(values)       # 新列表；values.sort() 则原地排序
```

`[1, 2] * 3` 是 `[1, 2, 1, 2, 1, 2]`，不是逐元素乘 3。元组支持索引、拼接和解包，但不能赋值修改元素。

### 集合：比较群体

```python
entered = set(top2024) - set(top2019)  # 新进入
left = set(top2019) - set(top2024)     # 已离开
both = set(top2019) & set(top2024)     # 两者共有
```

| 运算 | 写法 | 含义 |
|---|---|---|
| 并集 | `a \| b` | 在 a 或 b 中 |
| 交集 | `a & b` | 同时在 a、b 中 |
| 差集 | `a - b` | 在 a 但不在 b |
| 对称差集 | `a ^ b` | 只属于其中一个 |

空集合写 `set()`，`{}` 是空字典。`remove()` 删除不存在的元素会报 `KeyError`，`discard()` 不会。

### 字典：计数与按键查找

```python
counts = {}
for region in regions:
    counts[region] = counts.get(region, 0) + 1
```

- `d[key]` 在键不存在时报错；`d.get(key, default)` 返回默认值。
- `key in d` 检查键，不是值。
- `keys()`、`values()`、`items()` 分别遍历键、值和键值对。
- 嵌套字典用连续索引：`d["outer"]["inner"]`。
- 浅拷贝仍可能共享嵌套对象；需要完全独立时使用 `copy.deepcopy()`。

## 5. 字符串：不可变序列与文本处理

```python
text = " Hello World "
print(text.strip().lower())       # hello world
print(text.strip().split())      # ['Hello', 'World']
print("-".join(["a", "b"]))  # a-b
```

| 方法 | 作用 |
|---|---|
| `find(sub)` | 首次出现的位置；找不到返回 `-1` |
| `replace(old, new)` | 返回替换后的新字符串 |
| `count(sub)` | 子串出现次数 |
| `startswith()` / `endswith()` | 首尾判断，区分大小写 |
| `upper()` / `lower()` / `title()` | 大小写转换 |
| `strip()` / `lstrip()` / `rstrip()` | 清理空白 |
| `isalpha()` / `isdigit()` / `isalnum()` | 内容检查 |

**字符串不可变。** `s.replace(...)` 不会改变 `s`，要保留结果必须写 `s = s.replace(...)`。

## 6. 基础统计与异常意识

```python
n = len(values)
mean = sum(values) / n
median = sorted(values)[n // 2]  # 此简写适用于奇数个值
busiest = names[values.index(max(values))]
```

- 均值容易受极端大值影响，中位数更能描述“典型个体”。
- `index(max(values))` 先找最大值的位置，再从对齐的名称列表取名称。
- 变化率为 `100 * (new - old) / old`，旧值为 0 时需单独处理。
- Z-score 和 IQR 可用于发现异常候选，但**异常候选不等于应删除的数据**。

---

# 第二章 NumPy：数组、向量化与数值特征

## 1. 数组与列表的根本区别

```python
import numpy as np

a = np.array([10, 20, 30, 40])
print(a * 2, a.sum(), a.mean())  # 逐元素计算和整数组汇总
```

NumPy 数组适合同类型数值的向量、矩阵和高维网格。`a * 2` 是逐元素乘 2，列表乘 2 是重复。向量化无需显式循环，通常更简洁、更快。

```python
m = np.array([[1, 2, 3], [4, 5, 6]])
np.arange(0, 1, 0.25)  # [0, 0.25, 0.5, 0.75]，不含终点
```

属性不加括号：

- `shape`：每维长度，如 `(2, 3)`。
- `ndim`：维数。
- `size`：元素总数。
- `dtype`：元素类型。

## 2. 索引、切片与视图

```python
P[0, 9]      # 第 1 行、第 10 列
P[0]         # 第 1 行
P[:, -1]     # 最后一列
P[:5, -3:]   # 前 5 行、最后 3 列
```

索引从 0 开始，`-1` 是最后位置，切片终点不包含。二维数组先行后列。

基本切片通常是**视图**，修改它可能改变原数组；需要独立副本时使用 `.copy()`。`flatten()` 总是副本，`reshape()` 在可能时返回视图。

## 3. `axis`：沿哪个方向汇总

若每行是一个车站、每列是一个年份：

```python
P.sum(axis=0)  # 每年一个总和：每列一个结果
P.sum(axis=1)  # 每站一个总和：每行一个结果
P.sum()        # 全数组一个结果
```

记忆：指定的轴被压缩。`axis=0` 压缩行，留下列；`axis=1` 压缩列，留下行。

常用统计：`sum()`、`mean()`、`min()`、`max()`、`std()`、`np.median()`。`argmax()` 和 `argmin()` 返回位置：

```python
busiest = names[P[:, -1].argmax()]
```

## 4. 布尔掩码与完整记录筛选

```python
p2024 = P[:, -1]
big = p2024 > 1_000_000
print(big.sum())        # 满足条件的数量
print(big.mean())       # 满足条件的比例
print(p2024[big])       # 筛选值

active = np.all(P > 0, axis=1)  # 每年乘客数都大于 0 的车站
A = P[active]
```

- 多条件使用 `&`、`|`、`~`，每个条件分别加括号，不使用 `and` / `or`。
- `any()` 至少一个为真，`all()` 全部为真。
- 每行生成一个布尔值的掩码可用于筛选整行。

## 5. 向量化计算与广播

```python
growth = 100 * (A[:, 9] - A[:, 4]) / A[:, 4]
median_growth = np.median(growth)
share_above = 100 * (growth > 0).mean()
```

广播让不同但兼容的形状逐元素运算。从最右侧比较维度：对应长度相等，或其中一个为 1。`(3,4)` 可与 `(1,4)`、`(3,1)` 广播，但不能与 `(2,4)` 广播。

## 6. 标准化、归一化与尺度

二维表通常一列是一个特征，所以按列计算：

```python
def standardize(X):
    return (X - X.mean(axis=0)) / X.std(axis=0)

def minmax_scale(X):
    return (X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))
```

- 标准化：均值约为 0、标准差约为 1。
- Min-Max：缩放到 `[0,1]`。
- 目的：避免大尺度特征在 K-Means、神经网络等方法中不合理地主导结果。
- NumPy 的 `std()` 默认除以 `n`，pandas 默认除以 `n-1`。
- 在机器学习流程中，填补和缩放统计量只能从训练集估计，再应用于其他数据。

---

# 第三章 pandas：读取、选择、汇总与组合表格

## 1. Series、DataFrame 与文件读取

- Series：带索引的一维数据。
- DataFrame：行 × 命名列的二维表，每列是 Series。
- pandas 建立在 NumPy 上，支持混合类型、列名和缺失值。

```python
import pandas as pd

df = pd.read_csv(
    "data.csv", sep=";",
    dtype={"code_postal": str},
    encoding="utf-8"
)
```

- 法国 CSV 常用 `;`，其他参数包括 `usecols`、`index_col`、`header`。
- 邮编和 ID 是标识而非数量，应按文本读取，否则 `01053` 会变成 `1053`。
- Excel 使用 `read_excel()` / `to_excel()`，通常需要 `openpyxl`；读回时仍要保护 ID 类型。

## 2. 审查表格与快速统计

| 代码 | 结果 |
|---|---|
| `df.shape` | `(行数, 列数)`，属性 |
| `len(df)` | 行数 |
| `df.head()` / `df.tail(3)` | 前 5 行 / 后 3 行 |
| `df.columns` / `df.index` | 列名 / 行索引 |
| `df.dtypes` / `df.info()` | 类型 / 类型、非空数量等 |
| `df.describe()` | 数值列描述统计 |

```python
s.nunique()        # 不同值数量
s.unique()         # 不同值本身
s.value_counts()   # 每种类别的行数
s.count()          # 非缺失值数量
```

`describe()` 中的 50% 是中位数；`count` 统计非缺失值。

## 3. 选择列、筛选行、`loc` 与 `iloc`

```python
df["total"]                    # Series
df[["ville", "total"]]       # DataFrame，内层是列名列表

df[df["annee"] == 2024]
df[(df["annee"] == 2024) & (df["region"] == "Aura")]
df[df["city"].isin(["Lille", "Bordeaux"])]
```

### `loc`：标签、列名或条件

```python
df.loc[df["total"] > 100, ["ville", "total"]]
df.loc[df["change"] < 0, "note"] = "decrease"
```

### `iloc`：整数位置

```python
df.iloc[0]       # 第一行
df.iloc[:2, :2]  # 前 2 行、前 2 列，不含位置 2
df.iloc[0, 0]    # 一个值
```

**核心考点：`loc` 看标签，`iloc` 看位置；`loc` 标签切片通常包含终点，`iloc` 不包含。**

## 4. 新列、条件赋值、排序与 `apply()`

简单公式优先向量化：

```python
df["total_thousands"] = df["total"] / 1000
df["change"] = 100 * (df["new"] - df["old"]) / df["old"]
```

复杂规则写成函数：

```python
def size_class(visits):
    if visits >= 100_000:
        return "large"
    elif visits >= 10_000:
        return "medium"
    return "small"

df["size"] = df["total"].apply(size_class)  # 传函数本身，不是 size_class()
```

- `df.apply(func)` 默认 `axis=0`，逐列。
- `df.apply(func, axis=1)` 每次传入一行，可用 `row["col"]` 取值。
- `np.where(condition, x, y)` 可按条件逐元素生成新列。

排序：

```python
df.sort_values("total", ascending=False)
df.sort_values(["city", "total"], ascending=[True, False])
df.sort_index(ascending=False)
```

## 5. 分组、多个汇总与长宽表转换

```python
visits_by_region = df.groupby("region")["total"].sum()
rows_by_region = df["region"].value_counts()
```

前者对数值列求和，后者只计算类别行数。

```python
summary = df.groupby("region").agg(
    n_museums=("ID", "nunique"),
    visits=("total", "sum"),
    median_visits=("total", "median")
)
```

命名聚合格式：`新列名=("原列", "汇总方法")`。

```python
wide = df.pivot_table(index="region", columns="year",
                      values="total", aggfunc="sum")
long = wide.reset_index().melt(id_vars="region",
                               var_name="year", value_name="total")
```

`pivot_table()` 将长表变宽，`melt()` 将宽表转回长表，便于分组、建模和绘图。

## 6. 合并、拼接与安全计算

### `merge()`：按共同键连接

```python
compare = v2019.merge(
    v2024, on="ID", how="inner", suffixes=("_2019", "_2024")
)
```

- `inner`：只保留双方匹配。
- `left`：保留左表全部行，无匹配为缺失。
- `right`：保留右表全部行。
- `outer`：保留双方全部键。

应使用唯一 ID 合并，因为名称可能重复。`suffixes` 区分合并后的同名列。

### `concat()`：堆叠

```python
rows = pd.concat([y2023, y2024], ignore_index=True)
features = pd.concat([numeric, dummies], axis=1)
```

默认上下增加行，`axis=1` 左右增加列；横向拼接时要注意索引对齐。

### 安全比例

```python
share = (df["free"] / df["total"]).where(df["total"] > 0)
```

`.where()` 将不满足条件的位置设为缺失，避免除以 0 产生无意义结果。

---

# 第四章 数据清洗：从审查到可复用流程

## 1. 原则与顺序

三条黄金法则：

1. 不修改原始文件：`df = raw.copy()`。
2. 记录并解释每个决定。
3. 每一步验证行数、形状和关键约束；不理解的数据先标记。

推荐顺序：**审查 → 重复 → 类型 → 不可能/可疑值 → 文本 → 缺失策略 → 特征构造**。一次解决一个问题。

统一质量报告：

```python
def quality_report(df):
    return pd.DataFrame({
        "dtype": df.dtypes.astype(str),
        "missing_pct": (100 * df.isna().mean()).round(1),
        "n_unique": df.nunique(),
        "example": [df[c].dropna().iloc[0] if df[c].notna().any() else None
                    for c in df.columns],
    })
```

## 2. 缺失值

```python
s.isna().sum()    # 缺失数量
s.isna().mean()   # 缺失比例
len(s)            # 总长度
s.count()         # 非缺失数量
```

许多统计函数会静默跳过缺失值，所以先统计再解释结果。

```python
df.dropna(subset=["temp"])
df["city"] = df["city"].fillna("unknown")
df["temp"] = df["temp"].fillna(df["temp"].median())
df["operator"] = df["operator"].fillna(df["installer"])
df["free_missing"] = df["free"].isna()
```

策略取决于列与问题：保留、删除少量关键缺失行、合理默认值、从其他列填补、统计量填补或增加缺失指示列。`fillna()` 会引入人为值，必须说明理由。

## 3. 重复记录与最新版本

```python
df.duplicated().sum()
df.duplicated(keep=False)  # 重复组中所有行都为 True
```

保留每个实体最新版本：

```python
latest = (df.sort_values("updated")
            .drop_duplicates(subset="id", keep="last")
            .reset_index(drop=True))
```

`subset` 决定如何识别同一实体；`keep="last"` 的结果依赖先前排序。清洗后检查 `df["id"].is_unique`。

## 4. 类型转换与错误暴露

```python
pd.to_numeric(s, errors="coerce")
pd.to_numeric(s.str.replace(",", "."), errors="coerce")
pd.to_datetime(d, errors="coerce")
```

- `errors="coerce"` 将无法转换的值变为 `NaN`，无效日期变为 `NaT`。
- 转换后必须统计新增缺失，不能让格式错误悄悄消失。
- 小数逗号先替换为小数点。
- 可空布尔转换：

```python
BOOL_MAP = {"true": True, "1": True, "false": False, "0": False}

def to_bool(series):
    text = series.astype("string").str.strip().str.lower()
    return text.map(BOOL_MAP).astype("boolean")
```

`map()` 遇到字典中不存在的值会返回缺失，因此之后要检查遗漏类别。

## 5. 文本、类别与编码

先统一文本，再比较：

```python
clean = s.str.strip().str.lower()
```

`.str` 将字符串方法应用于整列，还支持 `contains()`、`replace()`、`len()`、切片和 `zfill()`。

复杂规则可封装函数：

```python
def clean_access(value):
    if pd.isna(value):
        return pd.NA
    text = str(value).lower()
    if "libre" in text:
        return "free access"
    if "serv" in text:
        return "restricted access"
    return pd.NA  # 不猜测未知类别
```

乱码通常来自错误编码。优先用正确的 `encoding` 重读文件；常见选择有 `utf-8`、`utf-8-sig`、`latin-1`、`cp1252`。若无法重读，可匹配不受乱码影响的稳定片段。

## 6. 不可能值与可疑值

```python
df.loc[df["power"] == 0, "power"] = np.nan
df["power_suspect"] = df["power"] > 400
```

- 不可能值：依据明确业务规则转为 `NaN`/`NaT`。
- 可疑但可能值：先添加布尔标记，调查后再决定，不直接删除。
- 处理后重新查看 `describe()`、最小值和最大值，检查结果是否合理。

## 7. 机器学习特征与完整清洗函数

```python
df["power_class"] = pd.cut(
    df["power"], bins=[0, 7.4, 22.08, 50, np.inf],
    labels=["slow", "normal", "fast", "ultra-fast"]
)

dummies = pd.get_dummies(df["access"], prefix="access", dtype=int)
features = pd.concat([df[["power"]], dummies], axis=1)
```

- `pd.cut()` 将连续变量分箱。
- `get_dummies()` 每个类别生成一个 0/1 列。
- 特征表最终应全为数值，缺失有明确处理，尺度按需要标准化。

把经过验证的步骤封装为 `clean_data(raw)`：复制输入、依次处理、返回新表，并用 `assert` 验证 ID 唯一、原始表未变和关键约束。项目展示时应能解释每一行关键逻辑。

---

# 第五章 数据可视化：选择合适的图并解释结果

## 1. 为什么必须画图

不同数据可能有近似相同的均值和方差，却呈现完全不同的关系、聚集和异常。图表不仅用于“美化”，也用于审查数据和形成结论。

原则：**一张图回答一个问题；标题表达结论；图下用一句话解释发现。**

## 2. Matplotlib 的基本结构

- Figure：整张画布。
- Axes：其中一个坐标系或子图。

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 3.5))
ax.plot(hours, weekday, label="Weekday")
ax.plot(hours, weekend, label="Weekend")
ax.set(title="Two commuting peaks on weekdays",
       xlabel="Hour", ylabel="Bicycles per hour")
ax.legend()
plt.show()
```

## 3. 图表选择

| 问题 | 图表 | 注意点 |
|---|---|---|
| 类别数值比较 | `bar` / `barh` | 类别排序，通常从 0 开始，长名称用横条 |
| 时间趋势 | 折线图 | 时间顺序正确，可加滚动均值 |
| 两个数值变量关系 | 散点图 | 可按组着色、加趋势线或对数轴 |
| 单变量分布 | 直方图 | 显示各区间频数或频率 |
| 组间分布比较 | 箱线图 | 中位数、四分位数、离散和极端值 |
| 行 × 列矩阵 | 热力图 | 色条标明意义和单位 |
| 多个同类小图 | `relplot` 等 | 小图之间保持可比性 |

饼图仅适合 2–3 个整体组成部分，否则使用条形图。截断条形图纵轴会夸大小差异。

## 4. 时区、日期特征与完整时间序列

UTC 时间必须先转为当地时间，再分析小时：

```python
bikes["time"] = pd.to_datetime(bikes["date"], utc=True).dt.tz_convert("Europe/Paris")
bikes["day"] = bikes["time"].dt.normalize()
bikes["hour"] = bikes["time"].dt.hour
bikes["weekday"] = bikes["time"].dt.dayofweek  # Monday=0, Sunday=6
bikes["is_weekend"] = bikes["weekday"] >= 5
```

若有 10 个计数器、每小时一行，则完整一天应有 240 行：

```python
per_day = bikes.groupby("day")["count"].agg(["sum", "size"])
daily = per_day.loc[per_day["size"] == 240, "sum"]
ax.plot(daily.index, daily, lw=0.8)
ax.plot(daily.index, daily.rolling(7).mean(), lw=2.5)
```

不完整日期会人为压低总量。`rolling(7).mean()` 是 7 日移动平均，用于观察平滑趋势。

## 5. Seaborn 与统计图解读

```python
import seaborn as sns

sns.lineplot(data=bikes, x="hour", y="count", hue="is_weekend", ax=ax)
```

`hue` 用颜色分组。默认 95% 置信带通常表示**均值估计的不确定性**，不是包含 95% 原始观测的范围；不需要时可写 `errorbar=None`。

```python
grid = bikes.pivot_table(index="weekday", columns="hour",
                         values="count", aggfunc="mean")
sns.heatmap(grid, cmap="viridis", ax=ax)

sns.boxplot(data=daily_table, x="is_weekend", y="total", ax=ax)
sns.histplot(data=daily_table, x="total", ax=ax)
sns.scatterplot(data=df, x="old", y="new", hue="group", ax=ax)
```

## 6. 图表交付检查清单

- [ ] 图表确实回答了一个明确问题。
- [ ] 标题说明结论，坐标轴有变量名和单位。
- [ ] 日期、刻度和大数字清晰，图例与色条含义明确。
- [ ] 条形图从 0 开始，类别有合理排序。
- [ ] 时间数据已处理时区、缺失时段和不完整日期。
- [ ] 图下有一句话解释结果，不只复述代码。

---

# 考前核心清单

1. `input()` 返回字符串；`int()` 截断，`round()` 四舍五入。
2. 列表乘整数是重复，NumPy 数组乘数值是逐元素运算。
3. 集合运算、字典 `get()`、字符串不可变是高频易错点。
4. 索引从 0 开始，切片终点通常不包含。
5. `axis=0` 每列一个结果，`axis=1` 每行一个结果。
6. 布尔掩码可筛选，`sum()` 计数，`mean()` 算比例。
7. 标准化与归一化按特征列计算，统计量只用训练集拟合。
8. `loc` 按标签，`iloc` 按位置。
9. `apply(func)` 传函数对象；`groupby()` 汇总数值，`value_counts()` 计类别行数。
10. `merge()` 用唯一 ID，`concat()` 负责堆叠。
11. 清洗不修改原始表，每一步记录理由并检查结果。
12. `errors="coerce"` 后必须统计新增 `NaN`/`NaT`。
13. 不可能值可转缺失，可疑值先标记，未知文本不猜测。
14. Figure 是画布，Axes 是子图；图表类型必须匹配问题。
15. 时间分析先处理时区与不完整性，图表最终必须有明确结论。

---

# 全新 MCQ 模拟卷：20 道单项选择题

> 建议用时 20 分钟。每题只有一个正确答案。先独立完成，再核对文末答案与解析。

## Questions｜题目

### 1. Numeric conversion｜数值转换

**What are the values of `int(3.9)` and `round(3.9)`, respectively?**  
`int(3.9)` 和 `round(3.9)` 的值分别是什么？

A. `4` and `4`  
B. `3` and `4`  
C. `3` and `3`  
D. `3.0` and `4.0`

### 2. `range()`｜整数序列

**What is `list(range(1, 10, 2))`?**  
`list(range(1, 10, 2))` 的结果是什么？

A. `[1, 3, 5, 7]`  
B. `[2, 4, 6, 8, 10]`  
C. `[1, 3, 5, 7, 9, 10]`  
D. `[1, 3, 5, 7, 9]`

### 3. Counting with a dictionary｜用字典计数

**Which line correctly increments the count for `region`, including when the key is new?**  
哪一行能正确增加 `region` 的计数，并兼容该键第一次出现的情况？

A. `counts[region] = counts.get(region, 0) + 1`  
B. `counts[region] = counts[region] + 1`  
C. `counts.get(region) += 1`  
D. `counts[region] = 1` in every iteration｜每次循环都赋值为 1

### 4. Splitting and joining strings｜拆分与连接字符串

**What is the result of `"-".join("a,b".split(","))`?**  
`"-".join("a,b".split(","))` 的结果是什么？

A. `"a,b"`  
B. `["a", "b"]`  
C. `"a-b"`  
D. `"a-b-"`

### 5. Mean and median｜均值与中位数

**A dataset contains a few extremely large values. Which summary is usually more resistant to them?**  
数据包含少量极大值时，哪个统计量通常更不易受其影响？

A. The mean.｜均值。  
B. The median.｜中位数。  
C. The sum.｜总和。  
D. The maximum.｜最大值。

### 6. Two-dimensional slicing｜二维切片

**If `P` has one station per row and one year per column, what does `P[:5, -3:]` select?**  
若 `P` 每行是车站、每列是年份，`P[:5, -3:]` 选择什么？

A. The last 5 stations and first 3 years.｜最后 5 个车站和前 3 年。  
B. All stations and the last 3 years.｜全部车站和最后 3 年。  
C. The first 5 stations and all years.｜前 5 个车站和全部年份。  
D. The first 5 stations and the last 3 years.｜前 5 个车站和最后 3 年。

### 7. Filtering complete station records｜筛选完整车站记录

**What does `active = np.all(P > 0, axis=1)` identify?**  
`active = np.all(P > 0, axis=1)` 识别哪些车站？

A. Stations with values above 0 in every year.｜所有年份数值都大于 0 的车站。  
B. Stations with a positive total across all years.｜所有年份总和大于 0 的车站。  
C. Stations with at least one positive year.｜至少一年大于 0 的车站。  
D. Years in which every station is positive.｜所有车站都大于 0 的年份。

### 8. Standardisation｜标准化

**After standardising a non-constant column with `(X - X.mean(axis=0)) / X.std(axis=0)`, what should its mean and standard deviation be?**  
对非常数列进行上述标准化后，其均值和标准差应接近什么？

A. Mean 1 and standard deviation 0.｜均值 1、标准差 0。  
B. Mean 0 and range `[0, 1]`.｜均值 0、范围 `[0,1]`。  
C. Mean 0 and standard deviation 1.｜均值 0、标准差 1。  
D. Mean 100 and standard deviation 1.｜均值 100、标准差 1。

### 9. Views and copies｜视图与副本

**You want to modify a NumPy slice without changing the original array. What should you use?**  
若要修改 NumPy 切片而不改变原数组，应使用什么？

A. `part = arr[...]` only｜只使用普通切片  
B. `part = arr[...].copy()`  
C. `part = arr.view()` without a slice｜只创建另一个视图  
D. `part = arr.reshape(-1)` in every case｜任何情况下都使用 `reshape(-1)`

### 10. Reading identifiers｜读取标识符

**Why should a postal-code column often be read with `dtype={"code_postal": str}`?**  
为什么邮编列通常应使用 `dtype={"code_postal": str}` 读取？

A. To calculate its mean more quickly.｜为了更快计算均值。  
B. To convert it automatically to a date.｜为了自动转换为日期。  
C. To remove all duplicate postal codes.｜为了删除所有重复邮编。  
D. To preserve leading zeros such as those in `01053`.｜为了保留 `01053` 等编码的前导零。

### 11. Grouped totals｜分组求和

**Which expression gives total visits for each region?**  
哪个表达式能得到每个地区的总访问量？

A. `df.groupby("region")["visits"].sum()`  
B. `df["region"].value_counts()`  
C. `df.groupby("visits")["region"].sum()`  
D. `df["visits"].unique()`

### 12. Conditional assignment｜条件赋值

**Which line writes `"decrease"` into `note` only for rows where `change < 0`?**  
哪一行只在 `change < 0` 的行中将 `note` 设为 `"decrease"`？

A. `df["note"] = "decrease"`  
B. `df.iloc[:, "note"] = "decrease"`  
C. `df.loc[df["change"] < 0, "note"] = "decrease"`  
D. `df.loc["note", df["change"] < 0] = "decrease"`

### 13. Applying a function by row｜按行应用函数

**In `df.apply(func, axis=1)`, what does `func` receive on each call?**  
在 `df.apply(func, axis=1)` 中，每次调用 `func` 会接收到什么？

A. One column at a time.｜每次一列。  
B. One row at a time.｜每次一行。  
C. Only the first cell.｜只有第一个单元格。  
D. The entire DataFrame every time.｜每次都是整个 DataFrame。

### 14. Merge suffixes｜合并后缀

**Why might you use `suffixes=("_2019", "_2024")` in a merge?**  
为什么合并时可能使用 `suffixes=("_2019", "_2024")`？

A. To sort the result by year.｜为了按年份排序。  
B. To remove rows from other years.｜为了删除其他年份的行。  
C. To convert all values to strings.｜为了把所有值转为字符串。  
D. To distinguish same-named columns coming from the two tables.｜为了区分来自两表的同名列。

### 15. Missing-value percentages｜缺失值百分比

**Which expression returns each column's missing-value percentage?**  
哪个表达式返回每列的缺失值百分比？

A. `100 * df.isna().mean()`  
B. `100 * df.count()`  
C. `df.notna().sum() / 100`  
D. `100 * df.isna().count()`

### 16. Inspecting duplicate groups｜检查重复组

**What does `df.duplicated(keep=False)` do?**  
`df.duplicated(keep=False)` 的作用是什么？

A. It deletes every duplicate immediately.｜立即删除所有重复项。  
B. It marks only the first row of each duplicate group.｜只标记每组第一行。  
C. It marks every row belonging to a duplicate group as `True`.｜将重复组中的所有行标记为 `True`。  
D. It returns only the unique column names.｜只返回唯一列名。

### 17. Mapping categories｜映射类别

**What happens when `s.map(mapping)` encounters a value absent from the dictionary?**  
当 `s.map(mapping)` 遇到字典中不存在的值时会发生什么？

A. It keeps the original value unchanged.｜保留原值不变。  
B. It produces a missing value.｜产生缺失值。  
C. It automatically converts the value to `True`.｜自动转换为 `True`。  
D. It always raises a `KeyError`.｜总是抛出 `KeyError`。

### 18. One-hot encoding｜独热编码

**What does `pd.get_dummies(df["weather"], dtype=int)` create?**  
`pd.get_dummies(df["weather"], dtype=int)` 会创建什么？

A. One datetime column per row.｜每行一个日期时间列。  
B. A single column containing category means.｜一个包含类别均值的列。  
C. One rolling average per category.｜每个类别一个滚动均值。  
D. Normally one 0/1 column for each category.｜通常为每个类别生成一个 0/1 列。

### 19. Date components｜日期组成

**In pandas `.dt.dayofweek`, which day is represented by `6`?**  
在 pandas 的 `.dt.dayofweek` 中，`6` 代表星期几？

A. Sunday.｜星期日。  
B. Saturday.｜星期六。  
C. Monday.｜星期一。  
D. Friday.｜星期五。

### 20. Confidence bands｜置信带

**What does the usual 95% confidence band around a Seaborn line representing a mean indicate?**  
Seaborn 均值折线周围常见的 95% 置信带表示什么？

A. Exactly 95% of rows are above the line.｜恰好 95% 的行位于线上方。  
B. It contains 95% of all raw observations.｜包含 95% 的原始观测。  
C. It expresses uncertainty in the estimated mean.｜表示均值估计的不确定性。  
D. It proves that the trend is caused by time.｜证明趋势由时间引起。

---

## Answer Key｜答案速查

| 题号 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 答案 | B | D | A | C | B | D | A | C | B | D |

| 题号 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
|---|---|---|---|---|---|---|---|---|---|---|
| 答案 | A | C | B | D | A | C | B | D | A | C |

## Explanations｜解析

1. **B**：`int()` truncates the decimal part; `round()` rounds to the nearest integer.  
   `int()` 截去小数部分，`round()` 四舍五入。
2. **D**：The sequence starts at 1, uses step 2, and excludes stop 10.  
   从 1 开始、步长为 2，且不包含终点 10。
3. **A**：`get(region, 0)` supplies zero when the key does not yet exist.  
   键不存在时，`get(region, 0)` 提供初始值 0。
4. **C**：`split()` creates `["a", "b"]`; `join()` combines the items with `-`.  
   先拆成列表，再用 `-` 连接。
5. **B**：The median depends on order and central position, so it is more robust to extreme values.  
   中位数取决于排序后的中间位置，对极端值更稳健。
6. **D**：`:5` means rows 0–4; `-3:` means the final three columns.  
   `:5` 是前 5 行，`-3:` 是最后 3 列。
7. **A**：`all(..., axis=1)` requires every column in a row to satisfy the condition.  
   沿每行检查所有列，因此要求每一年都满足条件。
8. **C**：Z-score standardisation centres the data and scales it by its standard deviation.  
   Z-score 将数据中心化，再除以标准差。
9. **B**：A basic slice is usually a view; `.copy()` creates independent data.  
   基本切片通常是视图，`.copy()` 创建独立数据。
10. **D**：Identifiers are labels, not quantities; numeric conversion can discard leading zeros.  
    标识符不是数量，按数值读取可能丢失前导零。
11. **A**：Group rows by region, then sum the visits column.  
    先按地区分组，再对访问量求和。
12. **C**：`loc` accepts a Boolean row selector and a column name for targeted assignment.  
    `loc` 可同时使用布尔行条件和列名进行定向赋值。
13. **B**：With `axis=1`, the function receives one row, so `row["col"]` accesses its values.  
    `axis=1` 每次传入一行，可用 `row["col"]` 取值。
14. **D**：Suffixes prevent ambiguity between columns with identical original names.  
    后缀用于区分原始名称相同的列。
15. **A**：`isna().mean()` gives the missing fraction per column; multiplying by 100 gives a percentage.  
    先求每列缺失比例，再乘 100 转为百分比。
16. **C**：`keep=False` does not favour a first or last copy; every member is marked.  
    不偏向第一条或最后一条，而是标记重复组的全部成员。
17. **B**：Unmapped categories become missing and should be inspected after mapping.  
    未映射类别会变成缺失值，映射后应检查。
18. **D**：One-hot encoding represents category membership with numeric indicator columns.  
    独热编码用数值指示列表示类别归属。
19. **A**：The numbering starts with Monday 0 and ends with Sunday 6.  
    从星期一 0 到星期日 6。
20. **C**：The band concerns uncertainty of the mean estimate, not coverage of raw observations.  
    置信带描述均值估计的不确定性，不是原始数据覆盖率。
