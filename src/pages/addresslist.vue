<template>
      <div class="allinfo">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select='clickitem'
      />
            <div class="no df" v-if='list.length == 0'>
                  <img src="@/assets/image/kong.png" alt="">
                  <span>{{$t('morecatlist.nodata')}}</span>
            </div>
      </div>

</template>

<script>
export default {
    name: "allinfo",
  data() {
    return {
      chosenAddressId: '2',
        list: [
        ],
        add: '新增地址',
        edit: '编辑地址',
    };
  },

  methods: {
    onAdd() {
      //this.$toast(this.$t('add'));
        this.$router.push({ path: "/editaddress" });
    },

    onEdit(item, index) {
        this.$router.push({ path: "/editaddress",name:'editaddress',params:{addid:item.id}});
    },
    getlist(){
        this.$api.getaddresslist().then(res => {
            if (res.status == 1) {
                  this.list=res.result;
                  this.chosenAddressId=res.result[0]['defaultid']
            } else {
            }
        });
    },
      clickitem(item,index){
          //this.$toast(item.id,'点击');
          let getobjid=localStorage.getItem('objid')
          if (getobjid>0){
              this.$router.push({ path: "/shenqing",name:'shenqing',params:{aid:item.id}});
          }else{
              this.$router.push({ path: "/editaddress",name:'editaddress',params:{addid:item.id}});
          }

      }
  },
    mounted() {
        this.getlist();
        document.title = this.$t('alltitle.addresslist');
    }
};
</script>
<style lang="scss" scoped>
      .no {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            img {
                  margin-top: 1.52rem;
                  width: 1rem;
            }
            span {
                  display: block;
                  margin-top: .18rem;
                  font-size: 0.14rem;
                  font-family: SourceHanSansSC-Regular;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
            }

      }
</style>
