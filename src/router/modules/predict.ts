import { ChartRadialIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/predict',
    component: Layout,
    redirect: '/predict/predict_page',
    name: 'Predict',
    meta: {
      title: {
        zh_CN: '预测',
        en_US: 'Predict',
      },
      icon: shallowRef(ChartRadialIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'predict_page',
        name: 'PredictPage',
        component: () => import('@/pages/predict/predict_page/index.vue'),
        meta: {
          title: {
            zh_CN: '预测页面',
            en_US: 'Forecast Page',
          },
        },
      },
    ],
  },
];
