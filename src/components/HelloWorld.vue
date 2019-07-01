<template>

  <div class="hello">
    <h2>协议测试</h2>
    <b-container class="bv-example-row">

      <b-row>
        <b-col cols="2">
            <b-button variant="primary" @click="developer()">developer</b-button>
        </b-col>
        <b-col cols="1">
            <b-button variant="primary" @click="voting()">voting</b-button>
        </b-col>
        <b-col cols="2">
            <b-button variant="primary" @click="redpacket()">redpacket</b-button>
        </b-col>
        <b-col cols="1">
            <b-button variant="primary" @click="swft()">swft</b-button>
        </b-col>
        <b-col cols="2">
            <b-button variant="primary" @click="dposvote()">dposvote</b-button>
        </b-col>
      </b-row>

      <b-row>编辑：</b-row>
      <b-row>
        <b-col cols="11" class="text-left" style="margin-top:15px">
          <textarea class="ta" v-model="stext">
          </textarea>
        </b-col>

        <b-col cols="1" class="text-right" style="margin-top:20px">
          <b-row style="margin-top:10px">
            <b-button variant="primary"
              v-clipboard:copy="stext"
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
              v-clipboard:copy="qrcode"
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
         stext1:'{"AppID":"23091883A390CCBFFFED4928F996936AFCEBB1B57192532D15271158F3A277FD1BB3309DA2719334CBE1DE7BA2408047E2786A94F370CE66C208159B3A8D1162","AppName": "dopsvote.h5.app","DID": "iZW9ozTSXk4ukRXx7vCTTFYebZHFwMUtz7","PublicKey": "03128A35842DD061BD016B9B2913BE07028063E5A80365D713DB77508406E85815","ReturnUrl": "https://elaphant.net/#/return_url","RequestInfo":"Nickname,ELAAddress,BTCAddress,BCHAddress,ETHAddress,IOEXAddress,Email,PhoneNumber,ChineseIDCard"}',
         stext:'{"AppID":"552453550a0ad3ad6cedd21a7bd47d2a3049ebb17099e892d92b93f9bd72bdeed9a439806118358422f3cb957a1ddebdc768ff667c2bd7359063d79d1618bf9c","AppName": "dposvote.h5.app","DID": "iiJRtAn6wyHaMSDQPS9Kkft3iiNjH5tTmi","PublicKey": "02752F9483DF73C57EDEA1F84F2431DC1036B2643F9519E78CB660D8C332793EDC","CallbackUrl": "http://dbs.westus2.cloudapp.azure.com:8080/api/v1/didcallback","RequestInfo":"Nickname,ELAAddress,BTCAddress,BCHAddress,ETHAddress,IOEXAddress,Email,PhoneNumber,ChineseIDCard"}',
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
      developer(){
        this.stext = '{"AppID":"c7457fabbb88243ce2d632a7fe31ff7f659320e835ddc4c2763c433c4d21d84e9f6d831eced288d687f684cf56d16cfd6e43e6fda61ee4912d52cce0d65fa892","AppName": "developer.elastos.org","DID": "iZNzP5nAihsnEkEzxo4RqoixWHdiRJ5b3i","PublicKey": "036c16294f5737c8242a85410060d29a24989bddb31ac730a456abe7f03a1e98bc","CallbackUrl": "http://dbs.westus2.cloudapp.azure.com:8080/api/v1/didcallback","RequestInfo":"Nickname,ELAAddress,BTCAddress,BCHAddress,ETHAddress,IOEXAddress,Email,PhoneNumber,ChineseIDCard"}';
      },
      voting(){
        this.stext = '{"AppID":"4de01b0013bd4e5611e93107c72c09cb813680fd6c3c7fddb0dca5a739327d76d30dfd5768c8da47b29dc6c1c928b4c1f08fdb23a926e713abcbee9c2f13c16c","AppName": "ELA Bank vote","DID": "iqtsbtKiVUoAXGY9G8YxTdU6h6Vt1LxHsa","PublicKey": "027a15e6d22d9b080224f1a58c516d6fb838c5891350b5f311928c37f18a43c81a","CallbackUrl": "http://dbs.westus2.cloudapp.azure.com:8080/api/v1/didcallback","RequestInfo":"Nickname,ELAAddress,BTCAddress,BCHAddress,ETHAddress,IOEXAddress,Email,PhoneNumber,ChineseIDCard"}';
      },
      redpacket(){
        this.stext = '{"AppID":"8FD01FF48C37DC11B53DF6E4BDB07924A3BF7034AEC2E0CC0CCDAC253F1AD006492F0E809E1274C1F20A819E438C8A4FDA99CD34A9E4B210337D6F26203A7B9D","AppName": "Red Packet","DID": "inS5F9nZ8nV2v5w2tGL8PbNbgwXU1Ry9uG","PublicKey": "03DD46B1E064A0BD0BA9A0FEFE58E4703EB44189D137462F4FA5181EE42A8F61AE","CallbackUrl": "http://dbs.westus2.cloudapp.azure.com:8080/api/v1/didcallback","RequestInfo":"Nickname,ELAAddress,BTCAddress,BCHAddress,ETHAddress,IOEXAddress,Email,PhoneNumber,ChineseIDCard"}';
      },
      swft(){
        this.stext = '{"AppID":"bbe5d8975b210e3832461bf0ef913d455434402ef74caa3c95b97d7ff86cfb0c0c7dab271bbb071c81630c6088da317a6afe7d1c691c844e7719fb9a72108f57","AppName": "SWFT","DID": "ioSDDMnxoPWxZqDiRCLAjhCqKgZUQwm44R","PublicKey": "03a1c183e9274dca97c8eae0ffbabf269f580fbc707504a9133fefce69c993ed5e","CallbackUrl": "http://dbs.westus2.cloudapp.azure.com:8080/api/v1/didcallback","RequestInfo":"Nickname,ELAAddress,BTCAddress,BCHAddress,ETHAddress,IOEXAddress,Email,PhoneNumber,ChineseIDCard"}';
      },
      dposvote(){
        this.stext = '{"AppID":"552453550a0ad3ad6cedd21a7bd47d2a3049ebb17099e892d92b93f9bd72bdeed9a439806118358422f3cb957a1ddebdc768ff667c2bd7359063d79d1618bf9c","AppName": "dposvote.h5.app","DID": "iiJRtAn6wyHaMSDQPS9Kkft3iiNjH5tTmi","PublicKey": "02752F9483DF73C57EDEA1F84F2431DC1036B2643F9519E78CB660D8C332793EDC","CallbackUrl": "http://dbs.westus2.cloudapp.azure.com:8080/api/v1/didcallback","RequestInfo":"Nickname,ELAAddress,BTCAddress,BCHAddress,ETHAddress,IOEXAddress,Email,PhoneNumber,ChineseIDCard"}';
      },

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
