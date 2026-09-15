const cfg = window.TITAN_PAY;
const params = new URLSearchParams(location.search);
const planId = params.get('plan') === 'life' ? 'life' : 'once';
const plan = cfg.plans[planId];
let discount = 0;

const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function render() {
  document.getElementById('planName').textContent = plan.name;
  document.getElementById('planPrice').textContent = brl(plan.price);
  document.getElementById('planDisc').textContent = discount ? '-' + brl(plan.price * discount) : 'R$ 0,00';
  document.getElementById('planTotal').textContent = brl(plan.price * (1 - discount));
  document.getElementById('planBlurb').textContent = plan.blurb;
}
render();

document.getElementById('applyCoupon').addEventListener('click', () => {
  const code = (document.getElementById('coupon').value || '').trim().toUpperCase();
  const off = cfg.coupon[code];
  const msg = document.getElementById('couponMsg');
  if (off) { discount = off; msg.textContent = 'Cupom aplicado.'; render(); }
  else { discount = 0; msg.textContent = 'Cupom inválido.'; render(); }
});

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (!email) return;
  sessionStorage.setItem('titanOrder', JSON.stringify({
    plan: planId, name: plan.name, email, total: plan.price * (1 - discount), coupon: document.getElementById('coupon').value || ''
  }));
  location.href = './pagar.html';
});
