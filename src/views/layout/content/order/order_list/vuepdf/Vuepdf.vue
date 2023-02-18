<template>
  <div>
    <!-- <pdf  src="/sxt.pdf"></pdf> -->
    <iframe
      src="/sxt.pdf"
      width="100%"
      height="500px"
      ref="im"
      id="aaa"
    ></iframe>
  </div>
</template>

<script>
import printJS from "print-js";
import html2Canvas from "html2canvas";
import PdfLoader from "@/utils/html2pdf";
// import pdf from "vue-pdf"
export default {
  mounted() {
    let img = document.getElementById("aaa"); // 需要导出部分页面的id名
    this.pdfDownLoader = new PdfLoader(img, "fileName", "question-table"); // fileName -->导出文件名,  question-table -->防止被截断的class名
    console.log(img);
  },
  methods: {
    // 导出pdf
    handleExport() {
      // this.pdfDownLoader.outPutPdfFn("问卷分析");
      this.isPrint = true;
      html2Canvas(this.$refs.im, {
        allowTaint: true,
        taintTest: false,
        useCORS: true,
        dpi: window.devicePixelRatio * 4,
        scale: 4,
      }).then((canvas) => {
        const url = canvas.toDataURL("/sxt.pdf");
        printJS({
          printable: url, // 要打印的id
          type: "image",
          style: "@page{size:auto;margin: 0cm 1cm 0cm 1cm;}", //去除页眉页脚
        });
        this.isPrint = false;
      });
    },
  },
};
</script>

<style>
</style>