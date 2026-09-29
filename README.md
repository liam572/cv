# Liam · 林联敏 — Personal Site

纯静态个人主页（HTML + CSS + 原生 JS），无需构建，可直接部署到 Vercel。

```
.
├── index.html            # 页面结构与全部文案
├── assets/
│   ├── css/style.css     # 设计 tokens + 样式
│   ├── js/main.js        # 交互（导航、中英切换、照片轮播、终端、GMP 动画等）
│   ├── js/i18n.js        # 英文文案
│   └── img/              # favicon、照片、微信二维码
├── resume.pdf            # （可选）放一份脱敏简历，按钮会自动生效
└── design/               # 设计稿，不参与部署
```

## 本地预览

```bash
python3 -m http.server 5788
# 打开 http://localhost:5788
```

## 中英文切换

右上角 / 侧栏的 `中 | EN` 按钮切换语言，选择会记住在浏览器里。
首次访问按浏览器语言自动选择；也可以用链接直接指定：`/?lang=en`、`/?lang=zh`。

## 常见修改

| 想改什么 | 在哪里 |
|---|---|
| 文案、经历、作品 | `index.html` |
| 首页照片 | `assets/js/main.js` 顶部 `PHOTOS` 数组，换成 `assets/img/xxx.jpg` |
| 微信二维码 | 放一张 `assets/img/wechat-qr.png`，自动显示 |
| 简历下载 | 在根目录放 `resume.pdf`；不存在时按钮会跳转到「经历」模块 |
| 作品 star 数 | 给 `.metric` 加 `data-repo="mingolm/仓库名"`，自动拉取 GitHub star |
| 配色 / 字体 | `assets/css/style.css` 顶部 `:root` |
| 英文文案 | `assets/js/i18n.js`，按 `data-i18n` 的 key 对应 `index.html` 中的中文 |

> 建议公开的简历 PDF 去掉手机号、出生日期等个人敏感信息。

## 部署到 Vercel

1. 推到 GitHub：
   ```bash
   git init && git add . && git commit -m "init: personal site"
   git branch -M main
   git remote add origin git@github.com:mingolm/<repo>.git
   git push -u origin main
   ```
2. 登录 [vercel.com](https://vercel.com) → **Add New… → Project** → 导入该仓库。
3. Framework Preset 选 **Other**，Build Command / Output Directory 留空 → **Deploy**。

之后每次 `git push` 都会自动重新部署。

## 国内访问提示

字体来自 Google Fonts，国内网络可能加载缓慢，此时会回退到系统字体（苹方 / 宋体），页面仍可正常使用。
如需加速，可把 `index.html` 中的 `fonts.googleapis.com` 替换为可用的国内镜像，
或自行下载字体子集放入 `assets/fonts/` 并改为 `@font-face` 引入。
临时占位照片来自 picsum.photos，替换为本地照片后即不再依赖外部服务。
