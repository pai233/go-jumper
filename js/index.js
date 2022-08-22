$(document).ready(()=>{
    $.ajax({
        url: "/config.json",
        success: (data)=>{
            try {
                if(!data instanceof Object)data = JSON.parse(data);
                if(window.location.hash===""){
                    document.getElementsByClassName("loading-text")[0].innerHTML = "链接参数错误，将跳转至"+data.backTo.sitename+"<dot>...</dot>"
                    setTimeout(()=>{
                        window.location.href = data.backTo.url;
                    },5000)
                    return;
                }
                let reg = new RegExp(/#(.*)/g);
                let base64 = reg.exec(window.location.hash)[1]
                let link = window.atob(base64)
                let referrer = document.referrer.split('/')[2];
                referrer = referrer===undefined?"":referrer;
                console.log(link,referrer)
                if(data.allowlist.length!=0){
                    let allowed = false
                    for(i in data.allowlist){
                        if(referrer.endsWith(data.allowlist[i])){
                            allowed = true;
                            break;
                        }
                    }
                    console.log("allowlist checked")
                    if(!allowed){
                        console.log("Blocked")
                        popUpWarning(data,link)
                        return
                    }
                    setTimeout(function(){
                        window.location.href = link
                    },3000)
                }
            } catch (error) {
                console.log(error)
                dump()
            }
        },
        error: ()=>{
            console.log("Config LOST")
            dump()
        }
    })
})
function popUpWarning(config,link){
    console.log("popUp")
    swal.fire({
        title: "确定访问？",
        text: "该网址不属于"+config.sitename+"，\n你确定要打开"+link+"吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(function(isConfirm){
        console.log(isConfirm)
        if (isConfirm.value) {
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
}
function dump(){
    document.getElementsByClassName("loading-text")[0].innerHTML = "解析错误！5秒后返回上一页……"
    setTimeout(()=>{
        window.location.href = document.referrer
    },5000)
    return;
}
