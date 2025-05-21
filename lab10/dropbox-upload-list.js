var fetch = require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var fs = require('fs');

// Замените на ваш токен
var dbx = new Dropbox({
    accessToken: 'sl.u.AFsa0bpH-c1Mk_XZ_3lY6-TCGpT1om34qseoVTpJoU5cosFB9s2VoYSHfW0E1IalpJ4WEb6a1CL0hB3mOmZZu5APdpHCilSqdy_M9LpWIXFGG9xljI5NGa7JPYdE_O7Isduqcyt0NA2ZF9OQAGqt3bngC6CZpCaqpVJ5AaNkR1iwalwlZRonLWEQQ4sSSvy9Q7FoAsyG5spTIokKgjaAqrIGWM6B2grM3M64hiKqAKFaMMR2sjwZ3DL8NI6d7QV2m-d-rdUAVQ0NpRHPPaTSiDHK0ZqQ8qgp0Lwyr0e6h9Cvz-PpJOayH8K-s0uciKg3Dp6jgSswZ-0p8hj_wmiY2zTofGUrlgXrPhBNfVbcg1Jp13ygokkCjKeTU3GDDa0I-esY0cPU0QewUrTk_MmJgDyExw858jhovWHSghf4EtPLbdHkkAgMl69_gcA6oVb_TSAuxGpKwDfhcCa6C-jh6_79uVp9WXimd4RYEeTiyY1jQwxzo6pWHI5t-EPBd_eCs3pYm4rE0CsHi_cgcHiTR1Bk9ZWFetHdxlmP00LdEdy3jeYG1CwiWWD7ziXl4FgE4cnDC0BJpJ6Qjdd84NJlqFKikReZg8b9cOUc6ZvOSB-GkRyJDRxS3OUEgaKRx8FXN1yhYQzkX0-BaUqwws36reKvqovXgtvWj6Ip6sJGwhfwXgS42HXv2T3YIs5CbrvQ_jXppSVsG9hIndVvqjo-i6H13XOfiltgv1GUKO0bwox1R98vUEABopyzVTrKyQTpf2194duxZ2UpPh7U2dt6OjESgvZU83wv5tyEGgiYxvgZ-YP_XqQA8v1sZ3HJAc7F_fwPfn3AE16emWlyKGiLzcLc1rGIyHtRQIjRMB-dmQAJbl11-XTATS23vpe77AE7eADmgj_KB7L9KDclideYy00TI9pPqGyTSscb36qnF-hxsGjp5RZv8ZlM7hvVXB7_Qk6w4rY02ZWo2zyFxUFTMbgQflyYg1mgzs4D59-Dp3jNyaP1i63FWo2Ou8miXnX-9Cd9iCD9o_CBMP11kMgu_7yyX6Lvo4iZgQvvEu7lpC_q2olW3kxsXr7xLXxkRAPFB9QFWDhfaWxVDfGqPqrETGrimPmGqMrNWIAAuGwG1WZWr4HYV067gv8XLwTXXWEYHUN42etlAzB_e60AUvBNf7kt1RPCHgia6tcOE_K0HTBDtR5ZCQj45PCf654Zbwk5TYGiskYAd6wZcOvMMbaXEU_oeBVNaAdbsoywfSeTDN3MFkGSK6AIpgb7fI6PHPSIJFB-AFRBgMXBIbETcoD1TW2c4XDGDs-kxW12So4jtoa1AHv9RMEV3o-KmHautLi0E_1lTovLuvKPzBHxliKC0NylJcP8aBD0sYIaqpFpmFuCvI-QEsi0ZWu6vaTCkVEut5EFWho7gZOfFuISlkHKT3b3',
    fetch: fetch
});

var filename = 'lab1.jpg';
var content = fs.readFileSync(filename);

// Загрузка файла
// dbx.filesUpload({ path: '/' + filename, contents: content })
//     .then(function(response) {
//         console.log('Файл загружен:', response);
//     })
//     .catch(function(error) {
//         console.error('Ошибка загрузки:', error);
//     });

// Получение списка файлов
dbx.filesListFolder({ path: '' })
    .then(function(response) {
        console.log('Полный ответ от Dropbox:', response.result); // полный ответ

        if (response && response.entries && response.entries.length > 0) {
            console.log('✅ Список файлов в Dropbox:');
            response.entries.forEach(function(item) {
                console.log(`- ${item.name} (${item['.tag']})`);
            });
        }
    })
    .catch(function(error) {
        console.error('Ошибка получения списка:', error);
    });