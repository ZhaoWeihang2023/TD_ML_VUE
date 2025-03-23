<template>
  <t-space direction="vertical">
    <t-card :bordered="false" :hover-shadow="true">
      <t-space align="baseline">
        <t-typography-title level="h1" strong>动物预测</t-typography-title>
        <t-typography-text theme="primary"
          >本预测是由赵卫航团队领导的重点实验室开发的动物识别系统，采用深度学习的方法进行动物识别，综合准确率可达100%。</t-typography-text
        >
      </t-space>
    </t-card>
    <t-card title="预测" :bordered="false" :hover-shadow="true">
      <t-upload
        v-model="files"
        :auto-upload="autoUpload"
        :theme="display"
        :data="{ extra_data: 123, file_name: 'certificate' }"
        :abridge-name="[10, 8]"
        :format-response="formatResponse"
        draggable
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      />
    </t-card>
    <t-card title="标题" actions="操作" :bordered="false" :hover-shadow="true">
      仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。
    </t-card>
  </t-space>
</template>
<script lang="ts" setup>
import { UploadProps } from 'tdesign-vue-next';
import { ref } from 'vue';

function getCurrentDate(needTime = false) {
  const d = new Date();
  let month = d.getMonth() + 1;
  month = month < 10 ? Number(`0${month}`) : month;
  const date = `${d.getFullYear()}-${month}-${d.getDate()}`;
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  if (needTime) return [date, time].join(' ');
  return date;
}
const autoUpload = ref(true);
const files = ref([]);

const display = ref<UploadProps['theme']>('image');
console.log(files.value);

// res.url 图片地址；res.uploadTime 文件上传时间；res.error 上传失败的原因
function formatResponse(res: any) {
  // 响应结果添加上传时间字段，用于 UI 显示
  res.uploadTime = getCurrentDate();
  return res;
}
</script>
