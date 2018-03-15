# halo-cli
halo-cli 用于初始化vue项目模板。

## 安装
``` bash
npm install -g halo-cli
yarn global add halo-cli
```

## 初始化项目
``` bash
# 利用模板名称初始化项目
halo init 模板名称 项目名称
# 添加模板（注意git地址可以携带分支名称，用#标识，默认master分支，如：git@github.com:MichaelGong/vue-template.git#vue）
halo add  模板名称 模板git地址
# 列出当前支持的所有模板以及模板地址
halo ls
# 删除模板
halo del 模板名称
```
> git地址请填写完整的git地址，如需指明分支，请使用`#`分隔，如：git@github.com:MichaelGong/vue-template.git#vue，会直接获取vue分支

### 本地测试命令
``` bash
node ../halo-cli/bin/halo.js // 相对路径即可
```
