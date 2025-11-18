const contractAddress = '0x09D85bD22E3d0EbfBCd09166d01Ff880fF14a97b';
document.getElementById('copy').addEventListener('click', ()=>{navigator.clipboard.writeText(contractAddress)});
// Price widget embed (DexScreener iframe)
const widget = document.getElementById('price-widget');
widget.innerHTML = '<iframe src="https://www.dexscreener.com/iframe/?token=' + contractAddress + '" style="width:100%;height:400px;border:0"></iframe>';
