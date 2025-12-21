// whyDidYouRender 配置文件
// 必须在所有组件导入之前加载
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  // 关键：需要在 React 上设置 whyDidYouRender
  whyDidYouRender(React, {
    trackAllPureComponents: false,
    logOnDifferentValues: true,
    trackHooks: true,
    onlyLogs: false,
    collapseGroups: false,
    logOwnerReasons: true,
  });
}
