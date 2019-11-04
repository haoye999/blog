---
title: 迟来的秋招---浏览器
description: 秋招被坑了，新投递了几家，好好准备一下，加油！-----浏览器篇
avatar: /static/img/猿辅导.jpg
tags:
- 秋招
- 浏览器
---

# 浏览器

## 1. Load 和 DOMContentLoaded 区别

DOMContentLoaded 代表初始的 DOM 加载渲染完毕，不需要等待 js、css等文件加载。

onLoad 则是图片资源等全部加载。

DOMContentLoaded 早于 onLoad

## 2. Service Worker

拦截 `fetch`，判断使用缓存或重新 `fetch`，PWA 的基础。

register -> install -> fetch -> uninstall

register: 同步脚本中 `navigator.serviceWorker.register`

install: sw.js 中事件，可以使用 `event.waitUntil` 等待处理缓存初始化。

fetch: sw.js 中事件，拦截请求。