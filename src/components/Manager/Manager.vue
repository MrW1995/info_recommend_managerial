<template>
    <div class="settingManager">
      <el-table :data="managerList" style="width: 80%">
        <el-table-column prop="establishDate" label="日期" sortable width="150"></el-table-column>
        <el-table-column prop="userAccount" label="姓名" sortable width="150"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="addManagerAccount">添加账号</el-button>
            <el-button size="mini" @click="ManagerAccountPwdUpadte(scope.$index, scope.row)">修改密码</el-button>
            <el-button size="mini" type="danger" @click="ManagerAccountDelete(scope.$index, scope.row)">移除账号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加管理员账号" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
        <div class="inputVal">
            <span class="inputUserName" v-if="showAlert">{{inputAlert}}</span>
          <div class="input1">
            用户名称：<input @blur="focus" class="inputText1" v-model="userName" type="text" placeholder="请输入用户名"></input>
          </div>
          <div class="input2">
            用户密码：<input class="inputText1" v-model="userPwd"type="password" placeholder="请输入用户密码"></input>
          </div>
          <div class="input3">
            确认密码：<input @blur="focus" v-model="userPwd1" class="inputText1" type="password" placeholder="请再次输入用户密码"></input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">注 册</el-button>
        </span>
      </el-dialog>

      <el-dialog title="请输入旧密码" :visible.sync="dialogVisible1" width="45%" :before-close="handleClose">
        <div class="inputVal">
          <span class="inputUserName" v-if="showAlert">{{inputAlert}}</span>
          <span v-if="oldPwdAlert" class="oldPwdAlert">{{alertOldPwd}}</span>
          <div v-if="!oldPwd">
            <div class="input1">
             密码：<input class="inputText1" v-model="oldPwdVal" type="password" placeholder="请输入旧密码"></input>
            </div>
          </div>
          <div v-else>
            <div class="input2">
              用户密码：<input class="inputText1" v-model="inputOldPwd"type="password" placeholder="请输入用户密码"></input>
            </div>
            <div class="input3">
              确认密码：<input @blur="focus1" v-model="inputOldPwd1" class="inputText1" type="password" placeholder="请再次输入用户密码"></input>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="send" v-if="!oldPwd">下一步</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        userName:'',
        userPwd:'',
        userPwd1:'',
        showAlert:false,
        dialogVisible: false,
        dialogVisible1: false,
        inputAlert:'',
        userAccount:'',
        oldPwdVal:'',
        inputOldPwd:'',
        inputOldPwd1:'',
        alertOldPwd:'你输入的密码有误,请从新输入'
      }
    },
    computed:{
      ...mapState(['managerList','checkName','managerAdd','delBool','oldPwd','oldPwdAlert','successPwd'])
    },
    mounted(){
      this.$store.dispatch("queryManagerList")
    },
    watch:{
      checkName(value){
        if(value){
          this.inputAlert = '你输入的用户名称,已存在请重新输入!!!'
          this.showAlert = true
          this.userName = ''
          this.$store.commit('check_name_bool',false)
        }
      },
      managerAdd(value){
        if(value){
          this.dialogVisible = false
          this.open()
          this.$store.dispatch("queryManagerList")
        }
      },
      delBool(value){
        if(value){
          this.$store.dispatch("queryManagerList")
        }
      },
      oldPwdAlert(value){
        if(value){
          setTimeout(()=>{
            this.$store.commit('change_old_bool',false)
            this.alertOldPwd = '你输入的密码有误,请从新输入'
          },2000)
        }
      },
      successPwd(value){
        if(value){
          this.dialogVisible1 = false
          this.open()
        }
      }
    },
    methods:{
      focus1(){
        let inputOldPwd = this.inputOldPwd
        let inputOldPwd1 = this.inputOldPwd1
        if(inputOldPwd !== inputOldPwd1){
          this.alertOldPwd = '第二次输入的密码与第一次不符合，请重新输入'
          this.$store.commit('change_old_bool',true)
          this.inputOldPwd1 = ''
        }
      },
      update(){
        console.log("123445")
        let inputOldPwd = this.inputOldPwd
        let inputOldPwd1 = this.inputOldPwd1
        if(inputOldPwd === '' || inputOldPwd1 === ''){
          this.alertOldPwd = '新密码或确认密码不可为空，输入后在提交'
          this.$store.commit('change_old_bool',true)
          return
        }
        let managerOldPwd = {"userAccount":this.userAccount,"userPassword":inputOldPwd}
        this.$store.dispatch('updateManagerPwd',managerOldPwd)
      },
      send(){
        let userAccount = this.userAccount
        let userPwd = this.oldPwdVal
        if(this.oldPwdVal === ''){
          this.alertOldPwd = '密码不可为空，输入后在提交'
          this.$store.commit('change_old_bool',true)
          return
        }
        this.inputOldPwd = ''
        this.inputOldPwd1 = ''
        this.$store.dispatch('checkOldPwd',{userAccount,userPwd})
      },
      focus(){
        if(this.userName !== ''){
          let managerName = this.userName
          this.$store.dispatch('checkManagerName',{managerName})
        }else if(this.userPwd1 != ''){
          if(!(this.userPwd == this.userPwd1)){
            this.showAlert = true
            this.inputAlert = '第二次输入的密码与第一次不一致'
          }
        }
        setTimeout(()=>{
          this.showAlert = false
          this.inputAlert = ''
        },2000)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      addManagerAccount(){
        this.userName = ''
        this.userPwd = ''
        this.userPwd1 = ''
        this.dialogVisible = true
      },
      ManagerAccountPwdUpadte(index, row) {
        this.$store.commit('change_old_pwd',false)
        this.$store.commit('change_success_pwd',false)
        this.oldPwdVal = ''
        this.userAccount = row.userAccount
        this.dialogVisible1 = true
      },
      ManagerAccountDelete(index, row) {
        this.$store.commit('check_del_bool',false)
        this.deleteAlert(row)
      },
      deleteAlert(row){
          this.$confirm('你确定要移除该管理员吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let managerName = row.userAccount
            this.$store.dispatch('delManagerByName',{managerName})
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      open() {
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });
      },
      submit(){
        if(this.userName === ''){
          this.showAlert = true
          this.inputAlert = '用户名不可为空，请输入后在提交'
          setTimeout(()=>{
            this.showAlert = false
            this.inputAlert = ''
          },2000)
          return
        }else if(this.userPwd === ''){
          this.showAlert = true
          this.inputAlert = '用户密码不可为空，请输入后在提交'
          setTimeout(()=>{
            this.showAlert = false
            this.inputAlert = ''
          },2000)
          return
        }else if(this.userPwd1 === '') {
          this.showAlert = true
          this.inputAlert = '用户第二次密码不可为空，请输入后在提交'
          setTimeout(()=>{
            this.showAlert = false
            this.inputAlert = ''
          },2000)
          return
        }
        let date = this.util.dateFormat(new Date())
        let managerVal = {"userAccount":this.userName,"userPassword":this.userPwd,"establishDate":date}
        this.$store.commit('change_addbool',false)
        this.$store.dispatch('managerUserRegister',managerVal)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.settingManager
  width 55%
  margin 1% 0 0 22.5%
  box-shadow 1px 1px 3px black
  border-radius 5px
  .inputVal
    display flex
    flex-flow column
    .oldPwdAlert
      color red
    .input1
      font-size 21px
      margin  0 0 0 0
      .inputText1
        border-radius 5px
        font-size 19px
        width 40%
        height 21px
    .input2
      font-size 21px
      margin 5% 0 0 0
      .inputText1
        border-radius 5px
        font-size 19px
        width 40%
        height 21px
    .input3
      font-size 21px
      margin 5% 0 0 0
      .inputText1
        border-radius 5px
        font-size 19px
        width 40%
        height 21px
    .inputUserName
        width 53%
        font-size 16px
        margin 0 0 1% 24%
        background-color pink
</style>
