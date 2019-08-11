<template>
      <van-address-edit
        :area-list="AreaList"
        :address-info="addressinfo"
        show-postal
        :show-delete="isedit"
        show-set-default
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"

      />
</template>

<script>
import AreaList from "../assets/js/area.js";
export default {
  data() {
    return {
        AreaList,
        addressinfo:{},
        searchResult: [],
        isedit:false,
        addressInfo:[],
        addid:0
    };
  },
  methods: {
    onSave(val) {
        let t=this;
      //this.$toast(this.$t('save'));
        console.log(val.isDefault,'是否默认')
        this.$api.doaddress({id: this.addid,areaCode:val.areaCode,
            name: val.name,tel:val.tel,province:val.province,city:val.city,county:val.county,
        addressDetail:val.addressDetail,postalCode:val.postalCode,isDefault:val.isDefault}).then(res => {
            if (res.status == 1) {
                this.$toast(res.message);
                setTimeout(function () {
                    t.$router.go(-1)
                },1200)
            } else {
                this.$toast(res.message);
            }
        });
    },
    onDelete(item,index) {
      this.$toast(item.id);
        let t=this;
        this.$api.deladdress({id: item.id}).then(res => {
            if (res.status == 1) {
                this.$toast(res.message);
                setTimeout(function () {
                    t.$router.go(-1)
                },1200)
            } else {
                this.$toast(res.message);
            }
        });
    },
    onChangeDetail(val) {
        if (val) {
            this.searchResult = [{
                name: '黄龙万科中心',
                address: '杭州市西湖区'
            }];
        } else {
            this.searchResult = [];
        }
      //this.searchResult = val ? this.$t('searchResult') : [];

    },
      getinfo(id){
          this.$api.getdetailaddress({id:id}).then(res => {
              if (res.status == 1) {
                  this.addressinfo=res.result;
                  console.log(res.result,'返回');
              }
          });
      }
  },
mounted() {
    this.addid=this.$route.params.addid;
    if (this.addid){
        this.isedit=true;
        console.log(this.isedit+'kk','ddd')
        this.getinfo(this.addid)
    }
}
};
</script>
