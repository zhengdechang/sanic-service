## Python Sanic with React Frontend

这个项目是使用Python的Sanic框架创建的后端，以及使用React, Antd, Zustand创建的前端。

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
├── tests
│   ├── __init__.py
│   └── test_example.py
├── config.py
├── requirements.txt
├── requirements.in
├── .gitignore
├── LICENSE
├── README.md
└── react-frontend
    ├── node_modules
    ├── public
    ├── src
    ├── package.json
    ├── package-lock.json
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
