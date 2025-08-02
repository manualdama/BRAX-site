const amountInput = document.getElementById('amount');
const usdValueSpan = document.getElementById('usdValue');
const paymentMethodSelect = document.getElementById('paymentMethod');
const buyBtn = document.getElementById('buyBtn');
const qrCodePixDiv = document.getElementById('qrCodePix');

function updateUsdValue() {
  const amount = parseFloat(amountInput.value) || 1;
  usdValueSpan.textContent = amount.toFixed(2);
  clearPixQRCode();
}

function clearPixQRCode() {
  qrCodePixDiv.innerHTML = '';
}

buyBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value) || 1;
  const method = paymentMethodSelect.value;

  if (method === 'pix') {
    // Payload Pix fictício - substituir por backend para Pix dinâmico oficial
    const pixPayload = `00020126410014BR.GOV.BCB.PIX0114+558199999999520400005303986540${(amount*100).toFixed(0).padStart(4,'0')}5802BR5909Aldama6009Cidade61080540900062070503***6304ABCD`;
    clearPixQRCode();
    new QRCode(qrCodePixDiv, {
      text: pixPayload,
      width: 180,
      height: 180
    });
    alert(`Escaneie o QR Code para pagar R$${amount.toFixed(2)} via Pix.`);
  } else if (method === 'metamask') {
    const ethAddress = '0xSeuEnderecoEthereumAqui'; // Coloque seu endereço ETH real
    const ethAmount = amount * 0.0005; // valor aproximado ETH por BRAX, ajuste real
    const url = `https://metamask.app.link/send/${ethAddress}?value=${(ethAmount * 1e18).toFixed(0)}`;
    window.open(url, '_blank');
  } else if (method === 'bitcoin') {
    const btcAddress = 'bc1qexemploendereco'; // Coloque seu endereço BTC real
    const btcAmount = amount * 0.000025; // valor aproximado BTC por BRAX/USD
    const btcUri = `bitcoin:${btcAddress}?amount=${btcAmount.toFixed(8)}`;
    window.open(btcUri, '_blank');
  } else if (method === 'usdt') {
    alert('Para pagar com USDT, envie para o endereço da carteira USDT da Aldama Technologies. Integração futura em desenvolvimento.');
  } else {
    alert('Método não suportado.');
  }
});

amountInput.addEventListener('input', updateUsdValue);

updateUsdValue();
