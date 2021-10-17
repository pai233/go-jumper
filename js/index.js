$(document).ready(()=>{
    console.log("Running...")
    if(window.location.hash===""){
        document.getElementsByClassName("loading-text")[0].innerHTML = "参数错误，将跳转至pai233の小窝<dot>...</dot>"
        setTimeout(()=>{
            window.location.href = "https://blog.pai233.top/"
        },5000)
        return;
    }
    let reg = new RegExp(/#(.*)/g);
    let base64 = reg.exec(window.location.hash)
    let link = window.atob(base64[1])
    let referrer = document.referrer.split('/')[2];
    referrer = referrer===undefined?"":referrer.split('.')
    if(referrer[referrer.length-2]+'.'+referrer[referrer.length-1]!="pai233.top" || document.referrer===""){
        swal.fire({
            title: "确定访问？",
            text: "该网址不属于咕咕小站，你确定要打开"+link+"吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }).then(function(isConfirm){
            console.log(isConfirm)
            if (isConfirm) {
                console.log('setTimeout')
                setTimeout(function(){
                    window.location.href = link
                },3000)
            }    
            else {
                window.opener=null;
                window.open('','_self');
                window.close();
                /* 微信浏览器关闭 */ 
                WeixinJSBridge.call('closeWindow');
            }
        })
    }else{
        setTimeout(function(){
            window.location.href = link
        },3000)
    }
})