let $encryptForm = document.getElementById('encrypt-form');
let $encryptFileLink = document.getElementById('encrypt-file-link');
$encryptForm.onsubmit = function (event) {
    event.preventDefault();

    let file = $encryptForm.upload.files[0];
    let key = $encryptForm.key.value.trim();
    if (file && key) {

        let fileReader = new FileReader();
        fileReader.onload = function () {
            // bắt đầu tính
            let startTime = Date.now()
            let ciphertext = CryptoJS.AES.encrypt(fileReader.result, key).toString();
            $encryptForm.result.value = ciphertext;
            let endTime = Date.now()
            console.log(endTime-startTime);
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

    let file = $decryptForm.upload.files[0];
    let key = $decryptForm.key.value.trim();
    if (file && key) {

        let fileReader = new FileReader();
        fileReader.onload = function () {
            let bytes = CryptoJS.AES.decrypt(fileReader.result, key);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);

            $decryptForm.result.value = originalText;
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

