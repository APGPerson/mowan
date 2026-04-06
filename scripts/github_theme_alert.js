// GitHub Alerts 解析脚本
// From https://tingdonghu.github.io/posts/%E5%8D%9A%E5%AE%A2%E9%AD%94%E6%94%B9hexo%E6%B7%BB%E5%8A%A0-github-alerts-%E6%94%AF%E6%8C%81/
hexo.extend.filter.register('markdown-it:renderer', function (md) {
    md.core.ruler.after('block', 'github-alert', function (state) {
        const tokens = state.tokens
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'blockquote_open') {
                // 找到 blockquote 的内容
                let j = i + 1
                // 只处理第一个段落
                if (
                    tokens[j] &&
                    tokens[j].type === 'paragraph_open' &&
                    tokens[j + 1] &&
                    tokens[j + 1].type === 'inline'
                ) {
                    let content = tokens[j + 1].content.trim()
                    // 兼容 [!NOTE]、[!NOTE]<br>、[!NOTE]\n
                    const match = content.match(
                        /^\[!(NOTE|WARNING|TIP|IMPORTANT|CAUTION|INFO|SUCCESS|ERROR)\][\s:：-]*(.*)$/i,
                    )
                    if (match) {
                        const alertType = match[1].toLowerCase()
                        let restContent = match[2].trim()

                        // 给 blockquote_open 加 class
                        let className = tokens[i].attrGet('class') || ''
                        className += (className ? ' ' : '') + `alert alert-${alertType}`
                        tokens[i].attrSet('class', className)

                        if (restContent) {
                            // [!NOTE] 和内容在同一行
                            tokens[j + 1].content = restContent
                        } else {
                            // [!NOTE] 单独一行，移除该段
                            tokens.splice(j, 3)
                        }
                    }
                }
            }
        }
    })
})

hexo.extend.injector.register("head_end",'<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.7.2/css/all.min.css"><link rel="stylesheet" href="/css/github_theme_alert.css">','post')