$(function(){

    // 绑定注册点击事件
     $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show();
     })

     $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide();
     })

})


//  从layui中获取form对象
var form=layui.form;
var layer=layui.layer
form.verify({
   // 自定义规则, lay-verify添加
   pwd:[ /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格' ],
   //  .val()获取第一个元素的值

    repwd:function(value){
    var pwd=  $('.reg-box [name=password]').val()
    if(pwd!==value){
     return '两次密码值不一致X'
    }
    
    }   
})





// 监听表单的注册提交事件
$('#form_reg').on('submit',function(e){
e.preventDefault()
$.post("/api/reguser",
{username:$('.reg-box[name=username]').val(),
password:$('.reg-box[name=password]').val()},
   function (res) {
      
      if(res.status !==0){
         return layer.msg(res.message)
      }
      layer.msg('success')
      // 自动点击跳转
       $('#link-login').click();
   }
);
})
// 监听表单的登录提交事件
$('#form_login').submit(function (e) { 
   e.preventDefault();
   $.ajax({
      type: "post",
      url: "/apil/login",
      data: $('this').serialize(),
      
      success: function (response) {
         if(response.status!==0){
            return layer.msg("false")
         }
         layer.msg('success')
         // 将登录成功得到的字符串保存到localstorage中
         localStorage.setItem('token',response.token)
         location.href='/index.html'
      }
   });
   
});