<script setup>
import {ref, onMounted} from 'vue';
const dif = ref("初級")
const col = ref(8);
const row = ref(8);
const input_col = ref(20);
const input_row = ref(20);
const mine_Num = ref(10);
const flagNum = ref(0);
const rest_mines = ref(mine_Num.value);
const real_rest_mines = ref(mine_Num.value);
const arr = ref(new Array);
const stateArr = ref(new Array);
const ok_string =ref();
const size_arr = ref({small: true, mid: false, big: false})

onMounted( () => init() );


function change_size(s){
    var t = true;
    var f = false;
    if(s==1){
        size_arr.value.small = t;
        size_arr.value.mid = f;
        size_arr.value.big = f;
    }
    if(s==2){
        size_arr.value.small =f ;
        size_arr.value.mid = t;
        size_arr.value.big = f;
    }
    if(s==3){
        size_arr.value.small = f;
        size_arr.value.mid= f;
        size_arr.value.big = t;
    }

}

function init(){

    /*mines*/
    rest_mines.value = mine_Num.value;
    flagNum.value = 0;
    real_rest_mines.value = mine_Num.value;

    var originalArray = new Array;

    for(var i = 0; i<col.value * row.value; i++){
        originalArray[i] = i;
        arr.value[i] = 0;
        stateArr.value[i] = {Open: false, Flag: false, Boom: false}
    };

    originalArray.sort(function(){return 0.5 - Math.random()});
    var bombArray = new Array;

    for(var i = 0; i<mine_Num.value;i++){
        bombArray[i] = originalArray[i];
        arr.value[bombArray[i]] = -1;
    }

    /*方塊周圍炸彈數量 */
    console.log("init");
    for(var i = 0 ; i<col.value * row.value; i++ ){

        var tmp = new Array;
        var count;
        if(arr.value[i] != -1){
            count = 0;
            tmp = get_NearInfo(i);
            for(var j = 0; j< tmp.length; j++){
                if(tmp[j].val == -1){
                    count++;
                }
            }
            arr.value[i] = count;
        }

    }
}

function get_NearInfo(index){
    /** 改物件內容*/
    var info = new Array;
    /*row = index/row col = index%col*/
    /*左上*/

    if(arr.value[index]!=-1){
        if(index/col.value != 0 && index%col.value != 0){
            info.push({val: arr.value[index-col.value-1], pos: index-col.value-1 });
        }else{
            info.push(-2);
        };
    /*上*/
        if(index/col.value != 0){
            info.push({val: arr.value[index-col.value], pos: index-col.value});
        }else{
            info.push(-2);
        };
    /*右上*/
        if(index/col.value != 0 && index%col.value != col.value -1){
            info.push({val: arr.value[index-col.value+1], pos: index-col.value+1});
        }else{
            info.push(-2);
        };   
    /*左*/
        if(index%col.value != 0){
            info.push({val: arr.value[index-1], pos: index-1});
        }else{
            info.push(-2);
        }; 
    /*右*/
        if(index%col.value != col.value -1){
            info.push({val: arr.value[index+1], pos: index+1});
        }else{
            info.push(-2);
        };
    /*左下*/
        if(index/col.value != row.value -1 && index%col.value !=0){
            info.push({val: arr.value[index+col.value-1], pos: index+col.value-1});
        }else{
            info.push(-2);
        };    
    /*下*/
        if(index/col.value != col.value -1){
            info.push({val: arr.value[index+col.value], pos: index+col.value});
        }else{
            info.push(-2);
        }
    /*右下*/
        if(index/col.value != col.value -1 && index%col.value != col.value -1){
            info.push({val: arr.value[index+col.value+1], pos: index+col.value+1});
        }else{
            info.push(-2);
        };  
    return info;
    }
    return 0;
}

function Add_Flag(e, row_, col_){
    var curIndex =  row_*col.value + col_;

    if(!stateArr.value[curIndex].Open){
    stateArr.value[curIndex].Open = false;
    }

    if(stateArr.value[curIndex].Flag == true){

        if(arr.value[curIndex] == -1){
            real_rest_mines.value+=1;
        }
        flagNum.value -=1;
        rest_mines.value +=1;

    }else{
        if(arr.value [curIndex] == -1){
            real_rest_mines.value-=1;
        }
        flagNum.value +=1;
        rest_mines.value -=1;
    }
    stateArr.value[curIndex].Flag = !stateArr.value[curIndex].Flag;

    if(real_rest_mines.value == 0){
        ok_string.value = "You Win!";
        document.getElementById('btn').click();
    }


}

function left_click(e, row_, col_){

    var curIndex = row_*col.value + col_;


    if(arr.value[curIndex] == -1){
        stateArr.value[curIndex].Boom = true;
        stateArr.value[curIndex].Open = true;
        ok_string.value = "You Lose!";
        document.getElementById('btn').click();
        //all_Open();
        return;
    }

    if(arr.value[curIndex] > 0){
        stateArr.value[curIndex].Open = true;
        return;
    }

    
    if(arr.value[curIndex] == 0 && stateArr.value[curIndex].Open == false){
        var tmp = get_NearInfo(curIndex);

        stateArr.value[curIndex].Open = true;

        for(var i=0; i<tmp.length; i++){
            if(tmp[i].val >= 0){

               left_click(e ,Math.floor(tmp[i].pos/col.value) ,tmp[i].pos % col.value);

               console.log("clicked"+ Math.floor(tmp[i].pos/row.value) +"," + tmp[i].pos % row.value);
            }
        }
    }


}

function all_Open(){
    for(var i=0; i<row.value*col.value;i++){
        stateArr.value[i].Open =true;
    }
}

function all_Close(){
    for(var i=0; i<row.value*col.value;i++){
        stateArr.value[i].Open = false;
    }
}


</script> 

<script>
    export default{
        mounted() {
            this.emitter.on("test", info=>{
                var r = info.row;
                var c = info.col;
                var m = info.mines;
                var d = info.dif
                this.row = r;
                this.col = c;
                this.mine_Num = m;
                this.dif = d;
                this.init();
            })
        },
    }

</script>

<template>
   <div class="wrapper">
		<div class="content">
            <div class=" row">
                <strong>當前難度:{{dif}}</strong>
            </div>
            <div class="row">
                <strong>剩餘地雷數:{{rest_mines}}</strong>
            </div>

			<div class="line" v-for="(r,r_Index) in row" :key="r_Index">

				<div class="item" :class=" size_arr.small ? 'small' : (size_arr.mid ? 'mid' : (size_arr.big ? 'big' : 'small' ))"  v-for="(c,c_Index) in col" :key="c_Index" 
                    @contextmenu.prevent="Add_Flag(e, r_Index, c_Index)"
                    @click="left_click(e, r_Index, c_Index)">

			    	<div class="block" v-if="arr[ (r-1)*col + c -1] == -1">

                        <span v-if="stateArr[(r-1)*col + c -1].Flag "><img class="img-fluid" src="../assets/flag.jpg"></span>
                        <div class="unOpen w-100 h-100" v-if="!stateArr[(r-1)*col + c -1].Open"></div>
                        <div class="Open Boom w-100 h-100" v-if="stateArr[(r-1)*col + c -1].Boom"><img class="img-fluid" src="../assets/bomb.png"></div>
                        <span class="Open" v-if="stateArr[(r-1)*col + c -1].Open && !stateArr[(r-1)*col + c -1].Boom"><img class="img-fluid" src="../assets/bomb.png"></span>

					</div>

                    <div class="block" v-if="arr[ (r-1)*col + c -1] >= 0"  style="color: rgb(70, 0, 128);">

                        <span v-if="stateArr[(r-1)*col + c -1].Flag"><img class="img-fluid" src="../assets/flag.jpg"></span>
                        <div class="unOpen w-100 h-100" v-if="!stateArr[(r-1)*col + c -1].Open"></div>
                        <div class="Open w-100 h-100" :class="{Boom : stateArr[(r-1)*col + c -1].Boom}" v-if="stateArr[(r-1)*col + c -1].Open && arr[ (r-1)*col + c - 1 ]!=0">{{arr[ (r-1)*col + c - 1 ]}}</div>
                        
					</div>
                
				</div>
			</div>
		</div>
	</div>

    <div class="ms-5">
        <div class="row mt-3 ms-3 ">
            
            <div class="col-3 ms-2">
                <button class="mt-2 btn btn-outline-secondary" @click = "all_Open()">全開</button>
            </div>
            
            <div class="col-3">
                <button class="mt-2 btn btn-outline-secondary" @click = "all_Close()">全關</button>
            </div>
            <div class="col-4">
                <button class="mt-2 btn btn-outline-secondary" @click = "init()">重新開始</button>
            </div>
        </div>
        <div class="row mt-5">
        <div class="row mb-5">
            <div class ="col-6" style="font-size: 18px;">
                <strong>請方格選擇大小:</strong>
            </div>
             <div class="col-2">
                <button type="button" class="btn btn-outline-primary" @click="change_size(1)">小</button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-outline-primary" @click="change_size(2)">中</button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-outline-primary" @click="change_size(3)">大</button>
            </div>
        </div>
        <div class="row ">
           
        </div>
    </div>
    </div>
    

    <!-- Button trigger modal -->
    <div v-show="false" id ="btn" type="button" class=" disabled" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> 
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Result</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <strong>{{ok_string}}</strong>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="init()">UnderStood</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
	.wrapper{
        display: flex;
		justify-content: center;
	}
	.content{
		margin-top:10px;
		padding:4px;
		background: rgb(171, 234, 255);
	}
	.content .line{
		margin:4px ;
		display: flex;
		justify-content: center;
	}
	.content .line .item{
		margin:0 2px;
		border-radius:2px;
		background: rgb(7, 231, 145);
		cursor:pointer;
		text-align: center;
		color:#fff;
		line-height: 20px;
		transition: all 0.5s;
		position:relative;
		overflow: hidden;
	}
    .content .line .small{
        width:30px;
		height:30px;
        font-size:16px;
    }

    .content .line .mid{
        width:40px;
		height:40px;
        font-size:20px;
    }

    .content .line .big{
        width:50px;
		height:50px;
        font-size:24px;
    }




	.content .line .item .block{
		width:100%;
		height:100%;
		display: block;
		position:absolute;
		top:0;
		left:0;
		text-align: center;
	}

    .content .line .item .block .unOpen{
        background-color: rgb(8, 68, 78);
	}

    .content .line .item .block .Open{
        cursor: default;
	}
    .content .line .item .block .Boom{
        background-color: darkred;
	}

</style>