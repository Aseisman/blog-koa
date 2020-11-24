// //定义允许直接访问的url
// const allowpage = ['/api/user/login', '/api/user/register']

// //拦截
// function localFilter(ctx) {
//     let url = ctx.originalUrl
//     if (allowpage.indexOf(url) > -1) {
//         console.log('当前地址可直接访问');
//     }else {

//     }
// }