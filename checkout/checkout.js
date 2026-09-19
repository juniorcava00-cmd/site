const cfg = window.TITAN_PAY;
const params = new URLSearchParams(location.search);
const planId = params.get('plan') === 'life' ? 'life' : 'once';
const plan = cfg.plans[planId];
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const API_URL = 'https://titanturbopro-api.onrender.com';

document.getElementById('planName').textContent = plan.name;
document.getElementById('planPrice').textContent = brl(plan.price);
document.getElementById('planTotal').textContent = brl(plan.price);
document.getElementById('planBlurb').textContent = plan.blurb;

window.TitanTracking?.track('view_item', {
  item_id: plan.id,
  item_name: plan.name,
  value: plan.price,
  currency: 'BRL',
  quantity: 1
});

document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();
  if (!email) return;

  const submitButton = e.currentTarget.querySelector('button[type="submit"], input[type="submit"]');
  const originalText = submitButton?.textContent;

  window.TitanTracking?.track('begin_checkout', {
    item_id: plan.id,
    item_name: plan.name,
    value: plan.price,
    currency: 'BRL',
    quantity: 1
  });

  try {
    if (submitButton) {
      submitButton.disabled = true;
      if (submitButton.tagName === 'BUTTON') submitButton.textContent = 'Gerando pagamento...';
    }

    const response = await fetch(`${API_URL}/api/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, plan: planId })
    });

    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(result?.message || result?.detail || 'Não foi possível iniciar o pagamento.');
    }

    const checkoutUrl = result?.init_point || result?.sandbox_init_point;
    const checkoutToken = result?.checkout_token || result?.checkoutToken;
    if (!checkoutUrl) throw new Error('O Mercado Pago não retornou o endereço de pagamento.');
    if (!checkoutToken) throw new Error('O servidor não retornou o identificador seguro da compra.');

    // O e-mail é mantido apenas durante a sessão atual e não é enviado aos pixels.
    sessionStorage.setItem('titanOrder', JSON.stringify({
      plan: planId,
      name: plan.name,
      total: plan.price,
      checkoutToken,
      createdAt: new Date().toISOString()
    }));

    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('TitanTurbo checkout:', error);
    alert('Não foi possível iniciar o pagamento agora. Tente novamente em alguns instantes.');
    if (submitButton) {
      submitButton.disabled = false;
      if (submitButton.tagName === 'BUTTON' && originalText) submitButton.textContent = originalText;
    }
  }
});
