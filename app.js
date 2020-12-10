let $encryptForm = document.getElementById('encrypt-form');
let $encryptFileLink = document.getElementById('encrypt-file-link');

$encryptForm.onsubmit = function (event) {
    event.preventDefault();
    let getTime = document.getElementById('timeEnCrypt')
    let file = $encryptForm.upload.files[0];
    let key = $encryptForm.key.value.trim();
    if (file && key) {

        let fileReader = new FileReader();
        fileReader.onload = function () {
            // bắt đầu tính
            var start = new Date();
            let startTime = start.getMilliseconds()
            // console.log("start"+startTime);
            let ciphertext = CryptoJS.AES.encrypt(fileReader.result, key).toString();
            $encryptForm.result.value = ciphertext;
            var end = new Date();
            let endTime = end.getMilliseconds()
            // console.log("end"+endTime);
            getTime.innerHTML =(endTime-startTime)/1000 + "ms"
            // console.log((endTime-startTime));
            download($encryptFileLink, 'result', ciphertext);
        }
        fileReader.readAsText(file);
    } else {
        alert('Nhập đầy đủ thông tin để mã hóa');
    }

}

let $decryptForm = document.getElementById('decrypt-form');
let $decryptFileLink = document.getElementById('decrypt-file-link');
$decryptForm.onsubmit = function (event) {
    event.preventDefault();
    let getTime = document.getElementById('timeDeCrypt')
    let file = $decryptForm.upload.files[0];
    let key = $decryptForm.key.value.trim();
    if (file && key) {

        let fileReader = new FileReader();
        fileReader.onload = function () {
            var start = new Date();
            let startTime = start.getMilliseconds()
            let bytes = CryptoJS.AES.decrypt(fileReader.result, key);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);

            $decryptForm.result.value = originalText;
            var end = new Date();
            let endTime = end.getMilliseconds()
            getTime.innerHTML =(endTime-startTime)/1000 + "ms"
            download($decryptFileLink, 'result', originalText)
        }
        fileReader.readAsText(file);
    } else {
        alert('Nhập đầy đủ thông tin để giải mã');
    }

}

function download($link, name, text, type = 'text/plain') {
    var file = new Blob([text], { type: type });
    $link.href = URL.createObjectURL(file);
    $link.download = name;
}

