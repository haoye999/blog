---
title: 网页中的文件---打开与上传
subTitle: balabala
avatar: /static/img/预览1.png
tags:
- JavaScript
- 浏览器
---

# 文件打开

打开文件用的是`FileReader` API。

使用方法：

1. new 一个对象 `let reader = new FileReader()`
2. 设置监听事件 `reader.onload = function () {
      console.log(reader.result)
   }`
3. 使用指定方式打开文件 reader.readerAsDataURL(file);

> **读取方法**

> Method | Description
>  ---   |  ---
> readAsArrayBuffer() |	The result is a JavaScript ArrayBuffer containing binary data.
> readAsBinaryString() |	The result contains the raw binary data from the file in a string.
> readAsDataURL()	| The result is a string with a data: URL representing the file's data.
> readAsText() |	The result is text in a string.

一个例子[预览](./fileReader.html)

![预览图](./img/预览1.png)

## HTML 骨架
```html
<ul class="img-list"></ul>

<label for="read-files">读图片</label><input type="file" multiple id="read-files">
```

只有一个图片的列表和一个读取文件的按钮

## CSS 样式
```css
* {
  margin: 0;
  padding: 0;
}

.img-list {
  list-style: none;
  background: beige;
  width: 800px;
  display: flow-root;
  margin: 10px 20%;
}

.img-list .img-item {
  box-sizing: border-box;
  height: 200px;
  width: 200px;
  padding: 50px 0;

  float: left;
  background: gray;

  position: relative;
}

.img-list .img-item>img {
  width: 100%;
}

.img-list .img-item>button {
  position: absolute;
  right: 0;
  bottom: 0;
}
```

## JS 部分

```js
const imgList = document.querySelector('.img-list');
const readFiles = document.querySelector('#read-files');

// 选择文件后
readFiles.addEventListener('change', function (ev) {
  for (const file of readFiles.files) {
    const reader = new FileReader();
    reader.onload = function () {
      let imgItem = document.createElement('li');
      imgItem.classList.add('img-item');
      imgItem.innerHTML = `<img src=""><button>删除</button>`;

      // 更改文件
      imgItem.children[0].src = reader.result;

      // 绑定删除事件
      imgItem.children[1].addEventListener('click', function (event) {
        imgList.removeChild(imgItem);
      })

      imgList.appendChild(imgItem);
    }

    reader.readAsDataURL(file);
  }
})
```

代码很简单。

# 文件上传

![预览图](./img/预览2.png)

文件上传步骤：

1. 通过拖拽/`<input type="file">`选择文件
2. `new` 一个 `FormData`
3. 将文件对象放到 `formdata` 键值对中
4. 通过 `AJAX` 发起 `POST` 请求，`send` `formdata`
5. 监听`XHR`状态，返回结果

以下例子中增加了一个进度条的功能，对`XMLHttpRequest` 对象的 'onload' 属性添加`progress`事件， `event.loaded` 和 `event.total` 分别为以上传值和总值。

> 注意当对`XMLHttpRequest` 对象的 'onload' 属性添加`progress`事件后，现代浏览器将使用`OPTIONS`方法发起`HTTP`，而不是指定的方法，这可能会引起跨域问题，可将后端的`Access-Control-Allow-Methods` 加上`OPTIONS`来解决

```js
upload.addEventListener('click', function (event) {
  // 新建formdata
  let data = new FormData();

  // file绑进formdata
  [...imgList.children].forEach((imgItem, index) => {
    data.append(`file${index}`, imgItem.file);
  });

  let xhr = new XMLHttpRequest();
  xhr.open('post', 'http://localhost:3000/api', true);

  xhr.upload.onprogress = function (event) {
    meter.style.width = 100 * event.loaded / event.total + '%';
  }

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      console.log('成功');
    } else {
      console.log('失败');
    }
  }
  
  xhr.send(data);
})
```

