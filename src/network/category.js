import {
    request
} from "./request";


// 获取分类页面   左侧导航数据
export function getCategoryLeftNav() {
    return request({
        url: '/category'
    })
}

// 获取分类页面  右侧上部图片
export function getCategoryRightTopImg(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

// 获取分类页面  右侧下半部商品列表
export function getCategoryRightBottomShopList(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}