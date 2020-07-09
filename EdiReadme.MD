参考地址
https://admin.stag.easilydo.cc:8091
admin/admin

发现的问题：
1、auth会影响下一个数组内容。
2、formitem为数字的时候，怎么处理。
3、componentload的时候做了两次请求，很奇怪。两次调用componentDidMount的问题可能是Form.create导致的，
也很可能是个观察错误。

# To Dev
## 功能说明
1. 配置文件的生成和编辑，引导用户编辑配置文件。
2. 根据配置文件进行训练。
3. 导入zendesk文件或其他数据源语料库，生成配置文件，训练。
4. 远程标注，重新训练。
5. 记录查询日志，并且分析。
6. 建立IM界面进行在线测试，在线测试界面可以直接进行语料修改和重新训练。

## Todo list
1. 权限部分暂时不集成。
2. 部分需求需要调用RASA，自行阅读RASA文档。
3. 先进入数据库，配置文件解析，由Dalio做。
4. 请求类型，还是看看代码吧，实在太多了。

## setting
### 行为描述
rasa->components->setting.
设置间隔多长时间探测服务器是否存活，服务器端建立定时器监听服务器状况，web端可以获取rasa服务器运行状态。
### 获取服务器状态
get : {method: get}
返回值  {}, 包括status的json数据。//Todo list
### 设置定时时间
post: {method: update, delayValue: 3}
返回值 {delayValue: 3}

## configure
### 行为描述
rasa->backend->configuration
获取rasa的基本配置，并且显示在页面上。
#### 获取
get: {method: get}
返回值：{},json串，直接有显示控件。

##  robot
### 行为描述
在服务器上建立rasa docker，应该会建立两个，一个用来训练，一个用来运行。
先new，然后在configure中激活，在show中可以查看主机信息。
数据类型定义在pages/rasa/rasarobot/data.d.ts中。
#### 新建机器人 post
#### 删除机器人 post
#### 修改 post
通过调用configure选项修改，修改数据库后，修改docker配置。
#### 查询 get
#### 查看 get

## entity
### 行为描述
建立实体与text bool categorical float list unfeturized的对应关系
数据类型定义在pages/rasa/rasarobot/robotitem/entities/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/entities/service.ts中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get


## Intents
### 说明:管理intents
### 行为描述
管理intent，建立intent对语料的对应关系，对语料进行管理和标注，标注出来的语料信息，作为明明实体识别的一部分。
数据类型定义在pages/rasa/rasarobot/robotitem/intents/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/intents/service.ts中。
语料管理部分在pages/rasa/rasarobot/robotitem/intents/expression中
语料的标注部分在pages/rasa/rasarobot/robotitem/intents/marks中。
数据定义跟正常套路一样。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Synonyms
### 说明:管理近义词
### 行为描述
管理近义词列表。
数据类型定义在pages/rasa/rasarobot/robotitem/synonyms/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/synonyms/service.ts中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Regex
### 说明:管理其中的正则表达式，用来进行实体识别。
### 行为描述
管理正则表达式列表
数据类型定义在pages/rasa/rasarobot/robotitem/regex/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/regex/service.ts中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Responses
### 说明:管理各种回答。
### 行为描述
管理回答内容。
数据类型定义在pages/rasa/rasarobot/robotitem/responses/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/responses/service.ts中。
对某个问句的答案管理在/rasa/rasarobot/robotitem/responses/actions中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Stories
### 说明:管理Story流程
### 行为描述
数据类型定义在pages/rasa/rasarobot/robotitem/stories/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/stories/service.ts中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Training
### 说明:训练开始，显示所有的配置文件。
### 行为描述
数据类型定义在pages/rasa/rasarobot/robotitem/training/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/training/service.ts中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Model
### 说明:管理Model，显示model的基本配置信息，并能选择模型的启动与停止，更换不同模型。
### 行为描述
数据类型定义在pages/rasa/rasarobot/robotitem/chatmodels/data.d.ts中。
请求定义在pages/rasa/rasarobot/robotitem/chatmodels/service.ts中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Chat
### 说明:进行chat训练
### 行为描述
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get

## Logs
### 说明:管理Logs，用于模型提升
### 行为描述
数据类型定义在pages/rasa/rasarobot/backend/logs/data.d.ts中。
请求定义在pages/rasa/rasarobot/backend/logs/service.ts中。
#### 新建 post
#### 删除 post
#### 修改 post
#### 查询 get
#### 查看 get
