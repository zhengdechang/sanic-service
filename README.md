## Python Sanic with React Frontend

在线体验：[https://sanic-service-zhengdevin11-gmailcom.vercel.app/](https://sanic-service-zhengdevin11-gmailcom.vercel.app/#/login?redirect=/)

这个项目是一个全栈应用程序，由Python的Sanic框架创建的后端和React, Antd, Zustand创建的前端组成。

后端使用Sanic框架，这是一个Python 3.6+ web服务器和web框架，它允许快速写代码，同时能处理请求速度非常快。它允许使用异步请求处理，这意味着你可以使用Python的async/await语法处理请求，这使得它非常适合实时web应用。后端还使用了PostgreSQL作为数据库，为应用程序提供了强大的数据存储和检索功能。

前端使用了React框架，这是一个用于构建用户界面的JavaScript库，它使得开发复杂的用户界面变得更简单。此外，前端还使用了Ant Design（简称Antd），这是一套在React环境下使用的高质量UI组件库，它提供了一套完整的设计语言和丰富的组件，可以帮助你快速创建漂亮的用户界面。前端也使用了Zustand，这是一个轻量级的状态管理库，它提供了一种简单的方式来在React组件之间共享和管理状态。

这个项目的目标是提供一个高性能、易于开发和维护的全栈应用程序示例。无论你是在学习全栈开发，还是在寻找一个可以快速启动你的新项目的模板，这个项目都可以为你提供参考。

### 项目结构

```
├── main.py
├── models
│   ├── models.py
│   └── engine.py
├── apis
│   ├──sanic_service_apis.py
│   └──views
│      └── user
│          ├── __init__.py
│          ├── auth.py
│          └── info.py
├── models
│   ├── models.py
│   └── engine.py
├── utils
│   ├── utils.py
│   └── language_json.py
├── react-frontend
│   ├── config
│   ├── public
│   ├── src
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── tests
│   ├── __init__.py
│   └── test_example.py
├── config.py
├── requirements.txt
├── requirements.in
├── .gitignore
├── LICENSE
└── README.md

```

### 安装和运行

#### 后端

1. 克隆这个仓库到你的本地机器上：

```bash
git clone https://github.com/zhengdechang/sanic-service.git
```

2. 进入到项目目录：

```bash
cd sanic-service
```

3. 解析并安装项目依赖：

```bash
pip-compile requirements.in
pip install -r requirements.txt
```

4. 安装并配置postgresql（在WSL的Ubuntu虚拟机中）：

```bash
#安装数据库
sudo apt install postgresql postgresql-contrib
#进入数据库
sudo -u  postgres  psql
#创建用户
CREATE USER sanic_service WITH PASSWORD 'password';
#创建数据库
CREATE DATABASE sanic_service;
#将数据库授权给用户
ALTER USER sanic_service WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE sanic_service TO sanic_service;

# 注意：这里的数据库信息需要与engine.py中的信息对应
```

5. 运行项目：

```bash
python3 main.py
```

#### 前端

1. 进入到前端项目目录：

```bash
cd react-frontend
```

2. 安装项目依赖：

```bash
npm install
```

3. 运行项目：

```bash
npm run start
```

现在，你的前端项目应该在`http://localhost:3000`上运行，而你的后端项目应该在`http://localhost:8000`上运行。

### 测试(TODO)

为了运行测试，请执行以下命令：

```bash
python3 -m unittest
```

### 贡献

如果你想为这个项目做出贡献，你可以：

- 提交bug和功能请求，或者帮助我们改善我们的文档。
- 提交代码。如果你想贡献代码，请创建一个分支，然后提交一个pull请求。

### 许可证

这个项目是在MIT许可证下发布的。详情请参阅[LICENSE](LICENSE)。

### 联系信息

如果你有任何问题或者建议，请通过email联系我：zhengdevin10@gmail.com

感谢你对项目的关注！
