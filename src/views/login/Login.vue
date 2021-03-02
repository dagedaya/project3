<template>
  <form id="frlogin" action>
    <div class="loginbox-title">云教务系统</div>
    <div class="loginbox">
      <div class="loginbox-t">
        <div @click="show(1)" class="login-type" :class="{c:loginType==1}">账号登录</div>
        <div @click="show(2)" class="login-type" :class="{c:loginType==2}">短信登录</div>
      </div>
      <!--账号登录-->
      <div v-if="loginType==1">
        <div class="loginbox-c">
          <ul>
            <li>
              <input v-model="username" type="text" id="username" class="txt" placeholder="账号" />
            </li>
            <li>
              <input v-model="password" type="password" id="pass" class="txt" placeholder="密码" autocomplete />
            </li>
          </ul>
        </div>
        <div class="loginbox-b">
          <button type="button" id="btnlogin" class="btn" @click="mess">登录</button>
        </div>
      </div>
      <!--短信登录-->
      <div v-else>
        <div class="loginbox-c">
          <ul>
            <li>
              <input v-model="username1" type="text" id="username1" class="txt" placeholder="手机号" />
            </li>
            <li>
              <input v-model="password1" type="password" id="pass1" class="txt" placeholder="验证码" autocomplete />
              <button class="btncode">获取验证码</button>
            </li>
          </ul>
        </div>

        <div class="loginbox-b">
          <button type="button" id="btnlogin1" class="btn" @click="messChange">登录</button>
        </div>
      </div>
      <div class="message">{{messtitle}}</div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      messtitle:'',
      loginType:1,
      username:'',
      password:'',
      username1:'',
      password1:"",
    };
  },
  methods: {
    show(val){
      this.loginType=val
    },
    mess(){
      if(this.username==""){
        this.messtitle="请输入账号"
      }else if(this.password==""){
        this.messtitle="请输入密码"
      }else{
        this.messtitle=""
      }
    },
    messChange(){
    if(this.username1==""){
      this.messtitle="请输入手机号"
    }else if(this.password1==""){
      this.messtitle="请输入验证码"
    }else{
      this.messtitle=""
    }
  }
  }
};
</script>

<style>
ul,li {
  list-style: none;
}
.message {
  line-height: 30px;
  color: red;
}
/* 行内元素 */
.login-type {
  margin-left: 20px;
  display: inline-block;
  color: #000;
  font-weight: normal;
  cursor: pointer;
}
/* 字体加粗 */
.login-type.c {
  color: #2198f8;
  font-weight: bold;
}
.btncode {
  position: absolute;
  right: 88px;
  top: 10px;
  display: block;
  height: 40px;
  border: none;
}
.loginbox-c ul {
  padding-left: 0px;
}

/* 标题设置 */
.loginbox-title {
  width: 620px;
  height: 80px;
  line-height: 50px;
  color: #4d4d4d;
  margin: 50px auto 0px auto;
  text-align: center;
  font-size: 36px;
}

.loginbox {
  width: 450px;
  height: 400px;
  background: #fff;
  margin: 10px auto;
  border-radius: 6px;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  box-shadow: 0 2px 10px #999999;
  -moz-box-shadow: #999999 0 2px 10px;
  -webkit-box-shadow: #999999 0 2px 10px;
}

.loginbox-t {
  width: 100%;
  height: 70px;
  line-height: 50px;
  color: #2198f8;
  text-align: center;
  font-size: 28px;
  margin-top: 0px;
  padding-top: 40px;
}

.loginbox-c {
  width: 100%;
  height: auto;
  line-height: 50px;
  color: #2198f8;
  text-align: center;
  font-size: 28px;
}

.loginbox-c li {
  height: auto;
  margin-bottom: 15px;
  position: relative;
}

.loginbox-c .txt {
  width: 280px;
  height: 44px;
  line-height: 44px;
  border: solid 1px #d8d8d8;
  border-radius: 3px;
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 5px;
}

.loginbox-b {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #2198f8;
  text-align: center;
  font-size: 28px;
}

/* 登录按钮 */
.loginbox-b .btn {
  width: 280px;
  height: 44px;
  line-height: 30px;
  background: #4285f4;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
  border: solid 0px #fff;
}
</style>