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

      <b-row v-if="qrcode">请求协议： </b-row>

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

      <b-row v-if="returncode">返回内容： </b-row>
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
         stext1:'{"AppID":"23091883A390CCBFFFED4928F996936AFCEBB1B57192532D15271158F3A277FD1BB3309DA2719334CBE1DE7BA2408047E2786A94F370CE66C208159B3A8D1162","AppName": "dopsvote.h5.app","DID": "iZW9ozTSXk4ukRXx7vCTTFYebZHFwMUtz7","PublicKey": "03128A35842DD061BD016B9B2913BE07028063E5A80365D713DB77508406E85815","ReturnUrl": "https://elaphant.net/#/return_url","RequestInfo":"elaaddress"}',
         stext:'{"AppID":"552453550a0ad3ad6cedd21a7bd47d2a3049ebb17099e892d92b93f9bd72bdeed9a439806118358422f3cb957a1ddebdc768ff667c2bd7359063d79d1618bf9c","AppName": "dposvote.h5.app","DID": "iiJRtAn6wyHaMSDQPS9Kkft3iiNjH5tTmi","PublicKey": "02752F9483DF73C57EDEA1F84F2431DC1036B2643F9519E78CB660D8C332793EDC","CallbackUrl": "http://dbs.westus2.cloudapp.azure.com:8080/api/v1/didcallback","RequestInfo":"elaaddress,Email"}',
         qrcode:"",
         randomNumber:"",
         returncode:"",
     }
  },
   sockets: {
        connect: function () {
            console.log('socket connected')
        },
        did: function (msg) {
        console.log("=============="+JSON.stringify(msg));
        let jsonData = JSON.parse(msg.data.Data);
        if (jsonData.RandomNumber === this.randomNumber) {
            let verified = this.$elastos.verify(msg.data.Data, msg.data.Sign, jsonData.PublicKey);
            this.returncode = JSON.stringify(msg) + `\n\nVerified: ${verified}`
        }
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
         this.returncode = '';
         const d  = appConfig;
         let url = "elaphant://identity?";
         this.$lodsh.forIn(d, (v,k) => {
           if(k==='CallbackUrl' || k==='ReturnUrl' || k==='RequestInfo'){
                v = encodeURIComponent(v);
            }
            url += k+'='+v+'&';
        });
    this.randomNumber = this.$uuid();
    this.randomNumber = this.randomNumber.replace(/-/g,'');
    url += 'RandomNumber'+'='+this.randomNumber;
    console.log("==this.randomNumber==="+this.randomNumber);
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
