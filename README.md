# 接口文档

## 登录

> `POST` /api/users/login

参数

```js
email:String,//邮箱
password:String,//密码
```

返回

```json
{
  "code": 200,
  "data": {
    "token": "xxxxxxxxxx",
    "user": {
      "name": "cargo",
      "type": 1,
      "phone": "",
      "img_url": "",
      "introduce": "",
      "avatar": "admin",
      "_id": "5f98df3e1fb99d0d28912db1",
      "email": "test2@qq.com",
      "create_time": "2020-10-28T03:02:22.561Z",
      "update_time": "2020-10-28T03:02:22.561Z",
      "__v": 0
    }
  },
  "msg": "登陆成功"
}
```

## 注册

> `POST` /api/users/register

参数

```js
name:String,//邮箱
password:String,//密码
avatar:String,//头像
email:String,//邮箱
```

返回

```json
{
  "code": 200,
  "data": {
    "user": {
      "name": "cargo",
      "type": 1,
      "phone": "",
      "img_url": "",
      "introduce": "",
      "avatar": "admin",
      "_id": "5f98df3e1fb99d0d28912db1",
      "email": "test2@qq.com",
      "create_time": "2020-10-28T03:02:22.561Z",
      "update_time": "2020-10-28T03:02:22.561Z",
      "__v": 0
    }
  },
  "msg": "注册成功"
}
```

## 头像上传

> `POST` /api/users/head

参数

```js
avatar:file,//头像
```

返回

```json
{
  "code": 200,
  "data": "xxxx",
  "msg": "上传成功"
}
```

## 获取当前用户信息

> `GET` /api/users/current

参数

```js
无;
```

返回

```json
{
  "code": 200,
  "data": {
    "name": "cargo",
    "type": 1,
    "phone": "",
    "img_url": "",
    "introduce": "",
    "avatar": "admin",
    "_id": "5f98df3e1fb99d0d28912db1",
    "email": "test2@qq.com",
    "create_time": "2020-10-28T03:02:22.561Z",
    "update_time": "2020-10-28T03:02:22.561Z",
    "__v": 0
  },
  "msg": "获取成功"
}
```

## 更新用户信息

> `GET` /api/users/current

参数

```js
name:String,
password:String,
avatar:String,
email:String,
phone:String,
img_url:String,
introduce:String,
```

返回

```json
{
  "code": 200,
  "data": {
    "name": "cargo",
    "type": 1,
    "phone": "",
    "img_url": "",
    "introduce": "",
    "avatar": "admin",
    "_id": "5f98df3e1fb99d0d28912db1",
    "email": "test2@qq.com",
    "create_time": "2020-10-28T03:02:22.561Z",
    "update_time": "2020-10-28T03:02:22.561Z",
    "__v": 0
  },
  "msg": "修改成功"
}
```

---

---

## 获取所有标签

> `GET` /api/tags/all

参数

```js
无;
```

返回

```json
{
  "code": 200,
  "data": [
    {
      "_id": "5f9e1a27db163f5618cbc512",
      "name": "vue",
      "create_time": "2020-11-01T02:15:03.365Z",
      "update_time": "2020-11-01T02:15:03.365Z",
      "id": 1,
      "__v": 0
    }
  ]
}
```

## 添加标签

> `POST` /api/tags/add

参数

```js
name: String; //标签名
```

返回

```json
{
  "code": 200,
  "data": {
    "_id": "5f9e1a27db163f5618cbc512",
    "name": "vue",
    "create_time": "2020-11-01T02:15:03.365Z",
    "update_time": "2020-11-01T02:15:03.365Z",
    "id": 1,
    "__v": 0
  },
  "msg": "创建成功"
}
```

## 修改标签

> `POST` /api/tags/update

参数

```js
id: String; //标签id
name: String; //标签名字
```

返回

```json
{
  "code": 200,
  "data": {
    "_id": "5f9e1a27db163f5618cbc512",
    "name": "vue",
    "create_time": "2020-11-01T02:15:03.365Z",
    "update_time": "2020-11-01T02:15:03.365Z",
    "id": 1,
    "__v": 0
  },
  "msg": "修改成功"
}
```

## 删除标签

> `POST` /api/tags/del

参数

```js
id: String; //标签id
```

返回

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

---

---

## 文章列表

> `POST` /api/articles/find

参数

```js
state: String; //已发表or未发表
tag: String; //标签id
keyword: String; //关键字模糊匹配
pageNum: String; //页码
pageSize: String; //页数
```

返回

```json
{
    "code": 200,
    "data": {
        "count": 8,
        "list": [
            {
                "meta": {
                    "views": 0,
                    "likes": 6,
                    "comments": 0
                },
                "desc": "这是一篇测试文章6666",
                "tags": [
                    "5f9e1a27db163f5618cbc512",
                    "5f9e1adbdb163f5618cbc513"
                ],
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "_id": "5f9fc5274d3ffe48ec230b58",
                "title": "测试文章1010",
                "create_time": "2020-11-02T08:36:55.287Z"
            }
            "..."
        ]
    }
}
```

## 文章详情

> `GET` /api/articles/findOne

参数

```js
id: String; //文章id
```

返回

```json
{
  "code": 200,
  "data": {
    "meta": {
      "views": 5,
      "likes": 0,
      "comments": 0
    },
    "desc": "这是一篇测试文章",
    "tags": [
      {
        "_id": "5f9e1a27db163f5618cbc512",
        "name": "vue",
        "create_time": "2020-11-01T02:15:03.365Z",
        "update_time": "2020-11-01T02:15:03.365Z",
        "id": 1,
        "__v": 0
      },
      {
        "_id": "5f9e1adbdb163f5618cbc513",
        "name": "react",
        "create_time": "2020-11-01T02:18:03.362Z",
        "update_time": "2020-11-01T02:18:03.362Z",
        "id": 2,
        "__v": 0
      }
    ],
    "state": 1,
    "img_url": "https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    "comments": [],
    "user_avatar": "admin",
    "user_name": "admin",
    "_id": "5f9e2612f81f9d4ec4116d94",
    "title": "测试文章33",
    "content": "测试文章测试文章测试文章测试文章",
    "user_id": "5f98df3e1fb99d0d28912db1",
    "like_users": [],
    "create_time": "2020-11-01T03:05:54.893Z",
    "update_time": "2020-11-01T03:05:54.893Z",
    "id": 2,
    "__v": 0
  }
}
```

## 文章添加

> `POST` /api/articles/add

参数

```js
state:String,
title:String, 
desc:String,
content:String,
tags:[id:String],
```

返回

```json
{
  "code": 200,
  "data": {
    "meta": {
      "views": 5,
      "likes": 0,
      "comments": 0
    },
    "desc": "这是一篇测试文章",
    "tags": [
      {
        "_id": "5f9e1a27db163f5618cbc512",
        "name": "vue",
        "create_time": "2020-11-01T02:15:03.365Z",
        "update_time": "2020-11-01T02:15:03.365Z",
        "id": 1,
        "__v": 0
      },
      {
        "_id": "5f9e1adbdb163f5618cbc513",
        "name": "react",
        "create_time": "2020-11-01T02:18:03.362Z",
        "update_time": "2020-11-01T02:18:03.362Z",
        "id": 2,
        "__v": 0
      }
    ],
    "state": 1,
    "img_url": "https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    "comments": [],
    "user_avatar": "admin",
    "user_name": "admin",
    "_id": "5f9e2612f81f9d4ec4116d94",
    "title": "测试文章33",
    "content": "测试文章测试文章测试文章测试文章",
    "user_id": "5f98df3e1fb99d0d28912db1",
    "like_users": [],
    "create_time": "2020-11-01T03:05:54.893Z",
    "update_time": "2020-11-01T03:05:54.893Z",
    "id": 2,
    "__v": 0
  }
}
```


## 文章图片上传

> `POST` /api/articles/img

参数

```js
img:File
```

返回

```json
{
  "code": 200,
  "data": "xxxxx"//图片路径
}
```



## 文章删除

> `POST` /api/articles/del

参数

```js
id: String; //文章id
```

返回

```json
{
  "code": 200,
  "msg":"删除成功",
}
```


## 文章点赞

> `POST` /api/articles/like

参数

```js
id: String; //文章id
```

返回

```json
{
  "code": 200,
  "msg":"点赞成功",
}
```