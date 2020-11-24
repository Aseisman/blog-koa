// // function booble(fun, time) {
// //     let timer = null;
// //     return function() {
// //         let context = this;
// //         let args = arguments;
// //         if (timer) clearTimeout(timer);
// //         timer = setTimeout(() => {
// //             fun.apply(context, args);
// //         }, time)
// //     }
// // }

// // function a() {
// //     console.log("sss");
// //     console.log(arguments);
// // }
// // let b = booble(a, 2000)
// // b(11);
// // b(22);