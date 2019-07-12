<template>
  <div class="login">
    <ul>
      <li v-for="(item , index ) in ingList" :key=index>
        <div class="yugao" @click="toDetail(item.bespokeId)">
          <div class="yugao_content">
            <img :src="item.cover" alt="">
            <div class="info">
              <p class="ellipsis2">
                {{item.title}}
              </p>
              <div>
                <span class="ellipsis2">
                  讲师：{{item.name}}
                </span>
                <span>
                  {{item.bespokeTimeStyle}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1,
      ingList: []
    };
  },
  created() {},
  methods: {
    toDetail(id) {
      this.$router.push({ path: "/detail",query:{id:id} });
    },
    init() {
      this.$api
        .room({
          pageNumber: 1,
          pageSize: 50,
          state: 4,
          categoryId: "",
          sessionId: localStorage.getItem("sessionIds")
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            for (let item of res.data.list) {
              item.cover = this.http + item.cover;
            }
            this.ingList = res.data.list;
          }
        });
    },
    btn() {
      console.log(this.phone);
      this.$router.push({ path: "/index" });
    },
    // 切换身份
    toStudent() {
      console.log(2);

      this.student = !this.student;
      if (this.student == true) {
        this.state = 1;
      } else {
        this.state = 2;
      }
    },
    // 删除号码
    delPhone() {
      this.phone = "";
    },
    // 显示密码
    showPwd() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    }
  },
  mounted() {
    document.title = "直播预告";
    this.http = localStorage.getItem("http");
    this.init();
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;

  .yugao {
    padding: 0.1rem 0 0.1rem 0;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 0.01rem solid #dddddd;
    .yugao_title {
      display: flex;
      justify-content: space-between;
      .sp1 {
        font-size: 0.16rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(36, 36, 36, 1);
      }
    }
    .yugao_content {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      display: flex;
      // justify-content: space-between;
      overflow: hidden;

      img {
        min-width: 1.5rem;
        max-width: 1.5rem;
        height: 0.85rem;
        border-radius: 0.05rem;
      }
      .info {
        margin-left: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 0.14rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(85, 85, 85, 1);
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          span {
            font-size: 0.12rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
  }
}
</style>


