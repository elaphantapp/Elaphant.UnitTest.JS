<template>

  <div class="hello">
    <h2>协议测试</h2>
    <b-container class="bv-example-row">

      <b-row>编辑： </b-row>

      <b-row>
        <b-col cols="11" class="text-left" style="margin-top:15px">
          <textarea class="ta" v-model="stext">
          </textarea>
        </b-col>

        <b-col  cols="1" class="text-right" style="margin-top:20px">
          <b-row style="margin-top:10px">
            <b-button variant="primary"
              v-clipboard="stext"
              v-clipboard:success="clipboardSuccessHandler"
              v-clipboard:error="clipboardErrorHandler">复制
            </b-button>
          </b-row>

          <b-row style="margin-top:20px">
            <b-button variant="primary" @click="generate()">生成
            </b-button>
          </b-row>

          <b-row style="margin-top:20px">
            <b-button variant="primary" @click="clear()">清空
            </b-button>
          </b-row>

        </b-col>

      </b-row>

      <b-row>请求协议： </b-row>

      <b-row  class="text-center" v-if="qrcode" style="margin-top:15px">
        <b-col cols="8">
          <textarea class="ta" v-model="qrcode" style="height:300px"></textarea>
        </b-col>
        <b-col cols="1">
          <b-button variant="primary"
              v-clipboard="qrcode"
              v-clipboard:success="clipboardSuccessHandler"
              v-clipboard:error="clipboardErrorHandler">复制
          </b-button>
        </b-col>
        <b-col cols="3">
          <qrcode :value="qrcode" :options="{ width: 250 }" style="display:block"></qrcode>
        </b-col>
      </b-row>

      <b-row>返回内容： </b-row>
      <b-row class="text-center" v-if="returncode" style="margin-top:15px">
          <textarea class="ta" v-model="returncode" style="height:300px"></textarea>
      </b-row>

    </b-container>

  </div>
</template>


<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data(){
      return{
        stext:'{"appId":"23091883A390CCBFFFED4928F996936AFCEBB1B57192532D15271158F3A277FD1BB3309DA2719334CBE1DE7BA2408047E2786A94F370CE66C208159B3A8D1162","appName": "dopsvote.h5.app","appDid": "iZW9ozTSXk4ukRXx7vCTTFYebZHFwMUtz7","appDidPublicKey": "03128A35842DD061BD016B9B2913BE07028063E5A80365D713DB77508406E85815","callbackUrl": "https://elaphant.net/#/return_url","random": "998877"}',
        qrcode:""
      }
    },
    methods: {
      clipboardSuccessHandler ({ value, event }) {
        alert("复制成功");
      },
      clipboardErrorHandler ({ value, event }) {
        console.log('error', value)
          alert("复制失败");
      },

      buildRequestUserDataUrl(appConfig) {
        const d = appConfig;

        const rt = encodeURIComponent(d.callbackUrl);
        const url = `elaphant://identity?ReturnUrl=${rt}&AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&DID=${d.appDid}&RandomNumber=${d.random}&AppName=${d.appName}&RequestInfo=elaaddress`;
        console.log('login schema1 => ' + url);
        return url;
      },
      clear(){
        this.stext = "";
      },
      generate(){
        let qrcode =  JSON.parse(this.stext);
        this.qrcode = this.buildRequestUserDataUrl(qrcode);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.ta{
    border:0;
    border-radius:5px;
    background-color:rgba(221, 219, 219, 0.98);
    width:100%;height: 180px;
    padding:10px;
    resize: none;
}

</style>
