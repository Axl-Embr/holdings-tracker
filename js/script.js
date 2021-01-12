var obj_crypt;

//these should come from db (ids) (read the ids and put them into this array)
let currency2API = ['bitcoin','ethereum','cardano','nano','coti', 'chainlink', 'vechain', 'waves', 'wanchain', 'tomochain', 'republic-protocol', 'thorchain', 'swipe', 'kava', 'balancer', 'decred', 'icon', 'kyber-network', 'enjincoin', 'matic-network', 'fetch-ai', 'quant-network', 'ocean-protocol', 'reserve-rights-token', 'polkadot'];

//this should come from db (id, name, symbol, quantity, logo, exlogo) (read and put into this array)
let tickets = [
    ['bitcoin', 'BTC', 2, "<img src='img/icons/btc.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['ethereum', 'ETH', 4, "<img src='img/icons/eth.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['cardano', 'ADA', 10000, "<img src='img/icons/ada.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['nano', 'NANO', 1000, "<img src='img/icons/nano.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['coti', 'COTI', 600, "<img src='img/icons/coti.png'>", "<img src='img/logo/kucoin-logo.png'>"],
    ['chainlink', 'LINK', 100, "<img src='img/icons/link.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['vechain', 'VET', 600, "<img src='img/icons/vet.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['waves', 'WAVES', 40, "<img src='img/icons/waves.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['wanchain', 'WAN', 500, "<img src='img/icons/wan.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['tomochain', 'TOMO', 100, "<img src='img/icons/tomo.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['republic-protocol', 'REN', 99.9, "<img src='img/icons/ren.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['thorchain', 'RUNE', 00, "<img src='img/icons/rune.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['swipe', 'SXP', 600, "<img src='img/icons/sxp.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['kava', 'KAVA', 400, "<img src='img/icons/kava.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['balancer', 'BAL', 4, "<img src='img/icons/bal.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['decred', 'DCR', 40, "<img src='img/icons/dcr.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['icon', 'ICX', 100, "<img src='img/icons/icx.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['kyber-network', 'KNC', 100, "<img src='img/icons/knc.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['enjincoin', 'ENJ', 600, "<img src='img/icons/enj.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['matic-network', 'MATIC', 4000, "<img src='img/icons/matic.png'>", "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"],
    ['fetch-ai', 'FET', 725, "<img src='img/icons/fet.png'>", "<img src='img/logo/kucoin-logo.png'>"],
    ['quant-network', 'QNT', 100
    , "<img src='img/icons/qnt.png'>", "<img src='img/logo/bittrex-logo.png'>"],
    ['ocean-protocol', 'OCEAN', 100, "<img src='img/icons/ocean.png'>", "<img src='img/logo/bittrex-logo.png'>"],
    ['polkadot', 'DOT', 100, "<img src='img/icons/dot.png'>", "<img src='img/logo/binance-logo.png'>"],
    ['reserve-rights-token', 'RSR', 5000, "<img src='img/icons/rsr.png'>", "<img src='img/logo/binance-logo.png'>"]
];
let prices = [];
let tickets_ar = [];
let market_cap_ar = [];
let usd_total = 0;
let btc_total = 0;
let rub_total = 0;

//creating a request string
let request_str = "https://api.coingecko.com/api/v3/simple/price?ids=" + currency2API.toString() + '&vs_currencies=usd,btc,rub&include_market_cap=true&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false';
let history_price_request = 'https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2017';

//calling request function (method, url)
request('GET', request_str)
.then((resp) => {
    //parsing response string into object (obj_crypt) with JSON.parse
    obj_crypt = JSON.parse(resp.target.responseText);
    console.log(obj_crypt);

    //JSON parsed object convert into an array (Object.keys)
    var arr = Object.keys(obj_crypt).map((key) => [key, obj_crypt[key]]);

    //count total usd and btc i have
    for (var i=0; i<arr.length; i++){
        for (var j=0; j<arr.length; j++){
            if (arr[i][0]==tickets[j][0]){
                usd_total = usd_total + arr[i][1].usd * tickets[j][2];
                btc_total = btc_total + arr[i][1].btc * tickets[j][2];
                rub_total = rub_total + arr[i][1].rub * tickets[j][2];
            }
        }
    }
    usd_total = Math.floor(usd_total * 100) / 100;
    btc_total = Math.floor(btc_total * 1000000) / 1000000;
    rub_total = Math.floor(rub_total * 100) / 100;

    //market cap float to int
    for (var i=0; i<arr.length; i++){
        arr[i][1].usd_market_cap = Math.floor(arr[i][1].usd_market_cap);
    }

    //usd_24h_change float to int
    for (var i=0; i<arr.length; i++){
        arr[i][1].usd_24h_change = Math.floor((arr[i][1].usd_24h_change) * 10) / 10;
    }

    //crypto full name to ticket
    for (var i=0; i<arr.length; i++){
        for (var j=0; j<arr.length; j++){
            if (arr[i][0]==tickets[j][0]){
                arr[i][0]=tickets[j][1];
            }
        }
    }

    //price after decimal limit
     for (var i=0; i<arr.length; i++){
        arr[i][1].usd = Math.floor((arr[i][1].usd) * 1000) / 1000;
    }

    //holdings after decimal limit
    for (var i=0; i<tickets.length; i++){
        tickets[i][2] = Math.floor((tickets[i][2]) * 100) / 100;
    }

    //sort object arr by property(market cap). TODO: user choice
    arr.sort((a, b) => (a[1].usd_market_cap < b[1].usd_market_cap) ? 1 : -1)

    //commarize market cap
    for (var i=0; i<arr.length; i++){
        arr[i][1].usd_market_cap = arr[i][1].usd_market_cap.commarize()
    }

    // Array into table
    // Draw HTML table
    var perrow = 1, // 2 cells per row
        html = "<table id='crypt_table'><tr>";
        html += '<th>ID</th>';
        html += '<th>Ex</th>';
        html += '<th>Icon</th>';
        html += '<th>Name</th>';
        html += '<th>Price</th>';
        html += '<th>M.Cap</th>';
        html += '<th>Holdings</th>';
        html += '<th>Value</th>';
        html += '<th>24h, %</th>';
        html += "</tr>";
        
        console.log(arr[0][0]); //BTC
        console.log(tickets[0][1]); //BTC
        console.log(arr[0][0]); //BTC
        console.log(tickets[1][1]); //ETH
        

    // Loop through array and add table cells
    for (var i=0; i<arr.length; i++){

        //rows class for color depending on exchange
        for (var s=0; s<tickets.length; s++){
            if (arr[i][0] == tickets[s][1]){
                if (tickets[s][4] == "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"){
                    html += "<tr class='atomic'>";
                }
                if (tickets[s][4] == "<img src='img/logo/kucoin-logo.png'>"){
                    html += "<tr class='kucoin'>";
                }
                if (tickets[s][4] == "<img src='img/logo/binance-logo.png'>"){
                    html += "<tr class='binance'>";
                }
                if (tickets[s][4] == "<img src='img/logo/bittrex-logo.png'>"){
                    html += "<tr class='bittrex'>";
                }
        }
        }

    //crypto full name to ticket
    // for (var i=0; i<arr.length; i++){
    //     for (var j=0; j<arr.length; j++){
    //         if (arr[i][0]==tickets[j][0]){
    //             arr[i][0]=tickets[j][1];
    //         }
    //     }
    // }







        var rank = i + 1;
        html += '<td>' + rank + '</td>';

        // Find exchange   
        for (var j=0; j<tickets.length; j++){
            if (arr[i][0]==tickets[j][1]){
                html += '<td class="">' + tickets[j][4] + '</td>'
            }
        }

        // Find icons   
        for (var j=0; j<tickets.length; j++){
            if (arr[i][0]==tickets[j][1]){
                html += '<td class="icons">' + tickets[j][3] + '</td>'
            }
        }
        html += "<td>" + arr[i][0] + "</td>";
        html += "<td>" + "$" + arr[i][1].usd + "</td>";
        html += "<td>" + "$" + arr[i][1].usd_market_cap + '</td>';
        // Find holdings
        for (var j=0; j<tickets.length; j++){
            if (arr[i][0]==tickets[j][1]){
                //hide BTC
                if(arr[i][0]=='BTC'){
                    html += '<td class="holdings">' + '~' + '</td>'
                    html += '<td class="holdings">' + '~' + '</td>'
                } else{
                    html += '<td class="holdings">' + tickets[j][2] + '</td>'
                    //count value = holdings*price
                    let holdings_value = arr[i][1].usd*tickets[j][2];
                    //after decimal limit
                    holdings_value = Math.floor((holdings_value) * 100) / 100;
                    html += "<td class='value'>" + "$" + holdings_value + "</td>";
                }
            }
        }
               
        if (arr[i][1].usd_24h_change > 0){
            html += "<td style='background-color:rgb(142, 255, 176);'>" + "+" + arr[i][1].usd_24h_change + "%" + '</td>';
        } else{
            html += "<td style='background-color:rgb(255, 95, 95);'>" + "" + arr[i][1].usd_24h_change + "%" + '</td>';
        }

        // Break into next row
        var next = i+1;
        if (next%perrow==0 && next!=tickets_ar.length){
            html += "</tr>";
        }
    }
    html += '</table>';
    // Attach HTML to container
    document.getElementById('table_container').innerHTML = html;

    // coins on exchanges statistics:
    var aw_crypto_num = 0;
    var kucoin_crypto_num = 0;
    var bttrx_crypto_num = 0;
    var binance_crypto_num = 0;

    for (var i=0; i<tickets.length; i++){
        if (tickets[i][4] == "<img src='img/logo/AtomicWalletLogo_Supplied_250x250.png'>"){
            aw_crypto_num = aw_crypto_num + 1;
        }
        if (tickets[i][4] == "<img src='img/logo/kucoin-logo.png'>"){
            kucoin_crypto_num = kucoin_crypto_num + 1;
        }
        if (tickets[i][4] == "<img src='img/logo/binance-logo.png'>"){
            binance_crypto_num = binance_crypto_num + 1;
        }
        if (tickets[i][4] == "<img src='img/logo/bittrex-logo.png'>"){
            bttrx_crypto_num = bttrx_crypto_num + 1;
        }
    }


    // total holdings div:
    var html_usd_div = 'TOTAL HOLDINGS: <p>$' + usd_total + '<br>BTC ' + btc_total + '<br>RUB ' + rub_total + '<p>Atomic Wallet: ' + aw_crypto_num + '<br>Bittrex: ' + bttrx_crypto_num + '<br>Binance: ' + binance_crypto_num + '<br>KuCoin: ' + kucoin_crypto_num;

    // usd_total to total_usd div
    document.getElementById('total_usd').innerHTML = html_usd_div;

}).catch();

function request(method, url){
    return new Promise(function (resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    })
}

function commarize(min) {
    min = min || 1e3;
    // Alter numbers larger than 1k
    if (this >= min) {
      var units = ["k", "M", "B", "T"];
      
      var order = Math.floor(Math.log(this) / Math.log(1000));
  
      var unitname = units[(order - 1)];
      var num = Math.floor(this / 1000 ** order);
      
      // output number remainder + unitname
      return num + unitname
    }

    // return formatted original number
    return this.toLocaleString()
  }
  
  // Add method to prototype. this allows you to use this function on numbers and strings directly
  Number.prototype.commarize = commarize
  String.prototype.commarize = commarize