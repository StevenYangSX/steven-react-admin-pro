// /**
//  * 调用组件的时候  基于属性传递路由表进来
//  * 根据路由表 动态设定路由的规则匹配
//  */
// import React, { Suspense } from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
// const RouterView = function RouterView(props) {
//   // 获取路由表
//   let { routes } = props;
//   return (
//     <Switch>
//       {routes.map((item, index) => {
//         let { redirect, exact, from, to, path, component: Component, name, meta } = item;
//         let config = {};

//         if (redirect) {
//           // 重定向的规则
//           config = { to };
//           if (from) config.from = from;
//           if (exact) config.exact = true;

//           return <Redirect key={index} {...config} />;
//         }
//         config = { path };
//         if (exact) config.exact = true;
//         return (
//           <Route
//             key={index}
//             {...config}
//             render={(props) => {
//               return (
//                 <Suspense fallback={<>正在处理中.......</>}>
//                   <Component {...props} />
//                 </Suspense>
//               );
//             }}
//           />
//         );
//       })}
//     </Switch>
//   );
// };

// export default RouterView;
