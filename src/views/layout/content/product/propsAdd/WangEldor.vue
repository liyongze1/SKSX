<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { mapState } from "vuex";
export default {
  components: { Editor, Toolbar},
  computed:{
    //读取vuex的数据
    ...mapState("rowData",["rowState"])
  },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        //上边工具栏的配置
        toolbarKeys:  [
                    'headerSelect', 'bold', 'underline', 'italic', 'color', 'bgColor', 'fontSize', 'fontFamily', 'lineHeight', 'bulletedList', 'numberedList', 'todo', '|', 'emotion', 'uploadImage', 'insertLink', 'insertTable', 'codeBlock', 'divider',
                ],
        //隐藏菜单栏
        //excludeKeys:[]
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  created(){
    //判断仓库有没有数据
    if(Object.keys(this.rowState).length>0){
      this.html=this.rowState.descs
    }else{
      this.html=""
    }
  },
  methods: {
    onChange() {
      //发送给父组件
      this.$emit("sendWangEldor", this.html);
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css">
</style>