import {
    request
} from "./request";

// 请求详情数据
export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}

// 请求推荐数据
export function getRecommend(){
    return request({
        url: '/recommend'
    })
}

/*constructor()是类的构造函数（默认的），用于传递参数返回实例对象，
通过new生成对象实例时自动调用该方法，如果没有，内部会自动创建一个constructor()*/


// 这JS写法只是ES6里面加的语法糖,本质还是ES5原型链不用看到class就说像JAVA

// 对数据进行整合  整合成一个对象
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.realPrice = itemInfo.lowNowPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // images可能没有值(某些商品有值，有些没有)
        this.image = info.image ? info.images[0] : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}