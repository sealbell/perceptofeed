# perceptofeed

perceptofeed 是一个基于 LLM 的 AI 用户智能反馈平台项目，暂时支持 ChatGPt API ，但是也可以很容易扩展其他的 api，可以对用户的反馈进行分析总结分类打分等。perceptofeed 的作用是把通过 Web 界面问答式 通过文件或者文字 传递进来的数据或者表格然后通过自定义的 Prompt 生成表格，生成的表格可以存储到后端的 mysql 数据库中。

数据如下：

例如我通过网页，向你询问下面的一条或者多条数据，我希望你能依次给下面的每一条数据打分以及给出分类，以及给出一句话的摘要，然后连带该问题的唯一 Dubbing UID 生成一个新的数据库表格。
然后后面继续提问的话，也会继续插入到表格中。

```
| Dubbing UID | Voice Description                          | Age Range | Gender | Subscribed to Dubbing AI | Biggest Holdback                                         | Willing to Purchase for Services | Willing to Chat for Improvement | Comments and Suggestions                                                                                        | Missing Features   | Chat Again for Improvement | Current Location | Subscription Clarity | Subscribed to Other Services | Recommend Subscription | Most Viewed Content Creator | Common Payment Methods | Additional Comments |
|-------------|--------------------------------------------|-----------|--------|--------------------------|---------------------------------------------------------|---------------------------------|-------------------------------|----------------------------------------------------------------------------------------------------------------|-------------------|---------------------------|------------------|---------------------|----------------------------|------------------------|-------------------------------|------------------------|---------------------|
| V5EQKX4V    | Sakura                                     | 14-18     | Male   | Not yet :(               | I don't really have anything that's my biggest holdback | No                              | No thanks                     | It's pretty decent, I use it for many purposes as trolling my friends or talking with people who I don't feel comfortable with sharing my actual voice | Nothing            | No thanks                |                  | Yes                   |                            | Yes                     |                             |                        |                     |
| V5EPGEXV    | Madeline (A cute girl with a charming voice) | 14-18     | Male   | Yes! XD                  |                                                         |                                 |                               | it's cool, just real time voice would be amazing, that's all                                                   | real time          | No thanks                |                  |                       |                            |                        |                             |                        |                     |
| 6X3X93RV    | Madeline (A cute girl with a charming voice) | 19-23     | Male   | Not yet :(               | Não ter mais vozes, é bem dificil ter só uma semana      | Não tenha nada a mais          | Sure!                         | Gostei de tudo, muito bom e ajuda muito nas minhas personagens de rpg                                            | Acredito que já tenha tudo | Sure!                |                  |                       |                            |                        |                             |                        |                     |
| 6DJ5MY96    | Sakura                                     | 14-18     | Male   | Yes! XD                  |                                                         |                                 | No thanks                     | A voice is so good. A girl voice is so real. I like a game voice.                                               | No                  | No thanks                |                  |                       |                            |                        |                             |                        |                     |
| VM3R45QV    | Patrick                                    | 19-23     | Male   | Yes! XD                  |                                                         |                                 | No thanks                     | algunas voces se escuchan raras al hablar rapido pero estan bastante bien                                       | Que sea todo gratis | No thanks                |                  |                       |                            |                        |                             |                        |                     |
```

## 目录结构

```bash
perceptofeed/
│
├── frontend/                    # 前端文件夹
│   ├── public/                  # 公共资源如HTML入口文件
│   │   └── index.html
│   ├── src/                     # React源代码
│   │   ├── components/          # React组件
│   │   │   ├── ChatBox.js       # 聊天框组件
│   │   │   ├── PromptBox.js     # 提示词设置框组件
│   │   │   ├── ModelDropdown.js # 模型选择下拉菜单组件
│   │   │   └── SubmitButton.js  # 提交按钮组件
│   │   ├── App.js               # 主应用组件
│   │   └── index.js             # 应用入口文件
│   └── package.json             # npm依赖和脚本
│
├── backend/                     # 后端文件夹
│   ├── api/                     # API处理模块
│   │   └── feedbackHandler.js   # 反馈处理API
│   ├── db/                      # 数据库相关模块
│   │   └── index.js             # 数据库连接和操作
│   ├── server.js                # Express服务器主文件
│   └── package.json             # npm依赖和脚本
│
└── README.md                    # 项目说明文件
```

### 1. 界面设计

**主界面**：
- **聊天框**：位于页面中心，用于输入数据和显示交互结果。支持文本输入和文件上传。
- **提示词设置框**：位于页面右侧，用户可以在此输入或修改用于AI处理的提示词。
- **模型选择下拉菜单**：用户可以从中选择不同的AI模型（如ChatGPT 3.5、4.0、4.0o等）。
- **提交按钮**：用户设置完毕数据和提示词后，点击此按钮提交信息给后端处理。
- **结果显示区**：提交数据处理后，结果以Markdown格式的表格显示在此区域。

---

**下面所有的设计第一版本 MVP 不考虑**

**导航栏**：
- 包含网站Logo、首页链接、帮助/支持页面链接等。

**响应设计**：
- 界面将支持不同设备（如台式机、平板电脑和手机）的响应式设计。

### 2. 功能设计

- **数据输入处理**：
  - 支持粘贴文本数据或上传文件（如Excel、CSV、Markdown文件）。
  - 自动识别上传文件类型并进行格式化处理。
  - 对乱码数据进行编码识别和转换。
- **数据预处理**：
  - 清洗数据，包括去除特殊字符和空格。
  - 数据验证，确保所有字段符合预期格式。
  - 利用AI进行数据初步分类和整理。
- **数据分析**：
  - 根据用户设置的Prompt，通过选定的模型对数据进行处理。
  - 结果分析后，以Markdown表格形式展示。

### 3. 技术架构

- **前端**：
  - 使用React或Vue.js构建单页应用（SPA）。
  - Axios或Fetch API用于与后端API通信。
- **后端**：
  - Flask是一个轻量级的Python web框架，非常适合快速开发小型应用。
  - 动态连接不同的AI模型API。
  - **Pandas**和**NumPy**：用于数据处理和清洗。
  - **Requests**：用于与AI模型API（如OpenAI的ChatGPT API）进行通信。
  - 使用Pandas处理和分析从前端接收的各种数据格式（CSV, Excel, Markdown）。
  - 使用Python的`chardet`库来检测和修正文件编码问题，避免乱码。
- **API管理**：
  - 使用API网关来管理和路由到不同的AI模型服务。
  - 实现缓存机制以提高响应速度和减少API调用次数。

### 4. 安全措施

- **数据传输**：所有数据传输通过HTTPS进行加密。
- **服务器安全**：定期更新软件，部署防火墙和入侵检测系统。
- **访问控制**：基本的用户身份验证系统，确保数据的访问控制。

### 5. 数据库设计

- **MongoDB**：
  - 存储用户上传的原始数据和处理后的结果。
  - 数据模型将根据输入数据的多样性设计，确保灵活性和查询效率。


#### 前端：简化选项

- **Bootstrap**与**JQuery**：
  - 使用Bootstrap快速构建响应式设计。
  - JQuery简化DOM操作和AJAX请求，与后端Flask API交互。