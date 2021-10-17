$(document).ready(()=>{
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
    setTimeout(function(){
        window.location.href = link
    },5000)
})