import QRCode from 'qrcode';
window.QazaqQR={draw:(canvas,text)=>QRCode.toCanvas(canvas,text,{width:230,margin:2,color:{dark:'#371610',light:'#fffdf6'}})};
