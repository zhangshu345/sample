

// 番茄小说 



let n_invite=packageName('com.dragon.read').text('填邀请码').findOne(300)
if(n_invite){
    n_invite.click()
    packageName('com.dragon.read').className('android.widget.EditText').editable().waitFor()
    let n_input=packageName('com.dragon.read').className('android.widget.EditText').editable().findOne(300)
    if(n_input){
        n_input.setText("7326544811")
        textclick("马上提交")
    }
}