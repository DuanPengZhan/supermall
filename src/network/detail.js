import {
    request
} from "./request";

export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}

/*constructor()是类的构造函数（默认的），用于传递参数返回实例对象，
通过new生成对象实例时自动调用该方法，如果没有，内部会自动创建一个constructor()*/

/*作为一个后端同时学过JS高级的表示,那些没学过JS高级加上JAVA半吊子的不要在这里乱带节奏,
这JS写法只是ES6里面加的语法糖,本质还是ES5原型链不用看到class就说像JAVA*/

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