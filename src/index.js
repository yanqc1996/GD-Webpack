import './main.css'
import './less.less'
import logo from './img.jpg'
const a = 'Hello ITEM'
console.log(a)

const img = new Image()
img.src = logo

document.getElementById('imgBox').appendChild(img)

class Author {
    name = 'ITEM'
    age = 18
    email = 'lxp_work@163.com'

    info = () => {
        return {
            name: this.name,
            age: this.age,
            email: this.email
        }
    }
}

module.exports = Author

// 新增装饰器的使用
@log('hi')
class MyTestClass {}

function log(text) {
    return function (target) {
        target.prototype.logger = () => `${text}，${target.name}`
    }
}

const test = new MyTestClass()
test.logger()