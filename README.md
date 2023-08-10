## Python Sanic

这个项目是使用Python的Sanic框架创建的。Sanic是一个Python 3.6+ web服务器和web框架，它允许快速写代码，同时能处理请求速度非常快。它允许使用异步请求处理，这意味着你可以使用Python的`async`/`await`语法处理请求，这使得它非常适合实时web应用。

### 项目结构

> 代码注释由Codeium生成，如有错误请指正

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
```

```bash
pip install -r requirements.txt
```


4. postgresql(wsl的ubuntu虚拟机)
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

如果你有任何问题或者建议，请通过email联系我们：zhengdevin10@gmail.com

感谢你对我们项目的关注！
