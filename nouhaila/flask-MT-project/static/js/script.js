//variables
const clearBtn = document.querySelector('.clear') ;
const ar_textarea = document.querySelector('#inputtextarea');
const en_textarea = document.querySelector('#outputtextarea');
const en_speakerBtn = document.querySelector('.en-speaker') ;
const ar_speakerBtn = document.querySelector('.ar-speaker') ;
const copyBtn = document.querySelector('.copy') ;
const limitChars = document.querySelector('.limit') ;
const alertCopy = document.querySelector('.alert-copy') ;
const footerBtn = document.querySelector('.footerBtn');
const footer = document.querySelector('.footer-text') ;
const startBtn = document.querySelector('.start') ;
const container = document.querySelector('.container') ;
const presentation = document.querySelector('.presentation') ;
//events

ar_textarea.addEventListener('input',function(){
    limitChars.textContent = `${this.value.length}/480`;
    if(this.value.length == 0){
        en_textarea.value = '' ;
    }
})
clearBtn.addEventListener('click',()=>{
    ar_textarea.value = '' ;
    en_textarea.value = '' ;
    limitChars.textContent = '0/480';
})

//speakers
en_speakerBtn.addEventListener('click',()=>{
    text = en_textarea.value ;
    responsiveVoice.speak(text , "UK English Male");
})
ar_speakerBtn.addEventListener('click',()=>{
    text = ar_textarea.value ;
    responsiveVoice.speak(text , "Arabic Male");
})
//copy text
copyBtn.addEventListener('click',()=>{
    if(en_textarea.value != ''){
        alertCopy.textContent = '. تم نسخ الترجمة' ;
        copyText(en_textarea) ;
        raise_alert(alertCopy)
    }
    else{
        alertCopy.textContent = "ادخل النص"
        raise_alert(alertCopy)
    }
})
function copyText(field){
      //select text
      field.select() ;
      //copy text
      document.execCommand('copy') ;
}
function raise_alert(alert){
            //raise alert
            window.setTimeout(()=>{alert.style.bottom = '2px'; },100)
            window.setTimeout(()=>{alert.style.bottom = '-50px'; },2000)
}
// show footer
let a = 1 ;
footerBtn.addEventListener('click',()=>{
    if(a == 1){
        footer.style.cssText = 'margin-bottom: 0 ;margin-top: 5px' ;
        a = 0 ;
    }
    else if(a == 0){
        footer.style.cssText = 'margin-bottom: -20px ;margin-top:0' ;
        a = 1 ;
    }
})
//jquery and ajax
$(document).ready(function(){
    $('.start').click(function(){
        $('.container').fadeIn('slow');
        $(this).hide();
    });
    $('.loader-container').fadeOut() ;
    //keyboard
    $('.fa-keyboard').on('click',function(){
        $('.simple-keyboard').slideToggle('fast');
    }) ;
//    $ ('#form').on('submit',function(event){

//         $.ajax({
//             data :{inputText : $('#ar_textarea').val()} ,
//             type: 'POST' ,
//             url: '/process'
//         }).done(function(data){
//             if(data.error){
//                 // alert('ERROR') ;
//                 alertCopy.textContent = 'المرجو إدخال نص'
//                 raise_alert(alertCopy)
//             }
//             else {
//                 // ar_textarea.value = data.inputText ;
//                 en_textarea.value = data.outputText ;
//                 console.log(data) ;
//              }
//         }) ;

//         event.preventDefault()
//     }) ;
}) ; 

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const en_textarea = document.getElementById("outputtextarea");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const ar_textarea = document.getElementById("inputtextarea").value;
        const sourceLanguage = document.getElementById("source_Language").value;
        const targetLanguage = document.getElementById("target_Language").value;

        const formData = new FormData();
        formData.append("source_language", sourceLanguage);
        formData.append("target_language", targetLanguage);
        formData.append("inputtextarea", ar_textarea);

        en_textarea.value = "Translation in progress....."

        fetch("/translate", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                en_textarea.value = data.outputText;
            })
            .catch(error => console.log(error));
    });
});
// $.ajax({
//     data :{inputText : $('#ar_textarea').val()} ,
//     type: 'POST' ,
//     url: '/process'
// }).done(function(data){
//     if(data.error){
//         // alert('ERROR') ;
//         alertCopy.textContent = 'المرجو إدخال نص'
//         raise_alert(alertCopy)
//     }
//     else {
//         // ar_textarea.value = data.inputText ;
//         en_textarea.value = data.outputText ;
//         console.log(data) ;
//      }
// }); 