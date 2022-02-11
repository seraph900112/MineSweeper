<script setup>
import {ref} from 'vue'
const cos_row = ref(8);
const cos_col = ref(8);
const cos_mines = ref(10)


</script>
<script>
  export default{
    methods: {
      emit_row_col(row, col, mines, dif){
        if(row*col<=mines){
          alert("炸彈數量過大 請重新輸入");
          returnl;
        }
        if(row>16){
          alert('行數請小於16');
          return;
        }
        if(col>30){
          alert('列數請小於30');
          return;
        }
        var r = row;
        var c = col;
        var m = mines;
        var d = dif;
        var info = {row: r, col: c, mines: m, dif: d};
        this.emitter.emit("test", info);
      },
    },
  }
</script>

<template>
<div class="accordion me-5" id="accordionExample" style="width: 250px; overflow: hidden;">

  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        選擇難度
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body" @click="emit_row_col(8, 8, 10, '初級')">
        <strong>初級</strong>
      </div>
      <div class="accordion-body" @click="emit_row_col(16, 16, 40, '中級')">
        <strong>中級</strong>
      </div>
      <div class="accordion-body" @click="emit_row_col(16, 30, 99, '高級')">
        <strong>高級</strong>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        自訂難度
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div  style="overflow: hidden;">

        <div class="row mt-3">
          <strong class="col-3 ms-0">行:</strong>
          <input class="col-8 me-1" type="number" v-model="cos_row" min="0" max="16">
        </div>

        <div class="row mt-3">
          <strong class="col-3 ms-0">列:</strong>
          <input class="col-8 me-1" type="number" v-model="cos_col" min="0" max="30" >
        </div>

        <div class="row mt-3">
          <strong class="col-4 ms-0">地雷數:</strong>
          <input class="col-7 me-1" type="number" v-model="cos_mines" min="1" max="668">
        </div>
        <button class="mt-2" @click="emit_row_col(cos_row, cos_col, cos_mines, '自訂')">確定</button>
   
      </div>
    </div>
  </div>

</div>

</template>

<style>
</style>