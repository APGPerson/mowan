---
title: 高级功能文档
date: 2000-01-01 00:00:00
tags: [教程]
categories: [教程]
copyright: BY
author: Mowan Official
archive: true
---

# Hexo + Fluid 配置

[Fluid Docs](https://hexo.fluid-dev.com/docs/guide/)

[Hexo Docs](https://hexo.io/zh-cn/docs/)

[本项目Github Repo](https://github.com/APGPerson/mowan)

---

# 如何为本项目做贡献?

1. fork本项目
2. 安装环境
```bash
git clone https://github.com/{your_user_name}/mowan.git

cd mowan

npm install -g hexo

hexo server
```
3. 使用诸如`[Add]` `[Docs]`的前缀提交
4. 发起PR

---

# 项目Docs

1. 使用`hexo new post --path categorie\name "Name“`
2. 修改`Front-matter`
3. 对于能使用Tag Func实现的内容，请不要注入全局JS
4. 不接受Vibe Coding产物

---

# 项目当前Tag Funcs

## 便签
在 markdown 中加入如下的代码来使用便签：

```markdown
{% note success %}
文字 或者 `markdown` 均可
{% endnote %}
```
可选便签：

{% note primary %}
primary
{% endnote %}

{% note secondary %}
secondary
{% endnote %}


{% note success %}
success
{% endnote %}


{% note danger %}
danger
{% endnote %}


{% note warning %}
warning
{% endnote %}


{% note info %}
info
{% endnote %}


{% note light %}
light
{% endnote %}


使用时 `{% note primary %}` 和 `{% endnote %}` 需单独一行，否则会出现问题

## 行内标签
在 markdown 中加入如下的代码来使用 Label：

```markdown
{% label primary @text %}
```

可选 Label：

{% label primary @text %}
{% label default @text %}
{% label info @text %}
{% label success @text %}
{% label warning @text %}
{% label danger @text %}


## 折叠块
使用折叠块，可以折叠代码、图片、文字等任何内容，你可以在 markdown 中按如下格式：

```markdown
{% fold info @title %}
需要折叠的一段内容，支持 markdown
{% endfold %}
```

info: 和行内标签类似的可选参数

title: 折叠块上的标题

## 勾选框
在 markdown 中加入如下的代码来使用 Checkbox：

`{% cb text, checked?, incline?, disabled? %}`

text：显示的文字

checked：默认是否已勾选，默认 false

incline: 是否内联（可以理解为后面的文字是否换行），默认 false disabled: 勾选框是否为不可点击的样式，默认 false

示例：

{% cb 普通示例 %}
{% cb 默认选中, true %}
{% cb 内联示例, false, true %} 后面文字不换行
{% cb false %} 也可以只传入一个参数，文字写在后边（这样不支持外联）
{% cb 不可点击的样式, true, false, true %}

## 按钮
你可以在 markdown 中加入如下的代码来使用 Button：

`{% btn url, text, title? %}`
或者使用 HTML 形式：

url：跳转链接
text：显示的文字
title：鼠标悬停时显示的文字（可选）

text

## 组图
如果想把多张图片按一定布局组合显示，你可以在 markdown 中按如下格式：

```
{% gi total n1-n2-... %}
{% endgi %}
```

total：图片总数量，对应中间包含的图片 url 数量
n1-n2-...：每行的图片数量，可以省略，默认单行最多 3 张图，求和必须相等于 total，否则按默认样式

如下图为 `{% gi 5 3-2 %}` 示例，代表共 5 张图，第一行 3 张图，第二行 2 张图。

## 计时器

```markdown
{% day_counter name time %}

{% day_counter_loader %}
```

name: 任意字符串

time: 形如2026-03-01[ 18:32:11]的形式

单页只能有一个`{% day_counter_loader %}`

{% day_counter 计时器1 2026-03-01 %}
{% day_counter 计时器2 2026-02-01 %}
{% day_counter 计时器3 2026-01-01 %}

{% day_counter_loader %}