window.dom = {
    create(string) {//用于创建节点
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2) {//用于新增弟弟
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {//用于新增哥哥
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {//用于新增儿子
        parent.appendChild(node)
    },
    wrap(node, parent) {//用于新增爸爸
        dom.before(node, parent)
        dom.append(parent, node)
    },
    remove(node) {//用于删除节点
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {//用于删除后代，就是全部删除
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) { // 重载 ，用于读写属性
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) { // 适配，用于读写文本内容
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {//用于读写HTML内容
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {//用于修改style
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {//用于添加class
            node.classList.add(className)
        },
        remove(node, className) {//用于删除class
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {//用于添加事件监听
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {//用于删除事件监听
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {//用于获取标签或标签们
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {//用于获取父元素
        return node.parentNode
    },
    children(node) {//用于获取子元素
        return node.children
    },
    siblings(node) {//用于获取兄弟姐妹元素
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    next(node) {//用于获取弟弟
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {//用于获取哥哥
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {//用于遍历所有节点
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {//用于获取排行老几
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};
