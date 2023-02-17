<template>
  <div class="add_page">
    <div class="add_left">
        <AddGoods></AddGoods>
    </div>
    <div class="add_goods_right">
        <div class="add_title">
            <h3>商品添加</h3></div>
        <Product></Product>
    </div>
  </div>
</template>

<script>
import Product from './Product.vue'
import AddGoods from "./AddGoodsmy.vue"
export default {
  components: { AddGoods, Product },

}
</script>

<style lang="less" scoped>
.add_page{
    padding: 10px;
    .add_left{
        float: left;
    }
    .add_goods_right{
    margin-left: 210px;
    overflow: hidden;
    background-color: #ffffff;
    .add_title{
            height: 40px;
            line-height: 40px;
            color: #111;
            background-color: #999;
            padding-left: 15px;
            margin-bottom: 15px;
        }
  }
}

</style>