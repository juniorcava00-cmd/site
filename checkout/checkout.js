const cfg = window.TITAN_PAY;
const params = new URLSearchParams(location.search);
const planId = params.get('plan') === 'life' ? 'life' : 'once';
const plan = cfg.plans[planId];
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

document.getElementById('planName').textContent = plan.name;
document.getElementById('planPrice').textContent = brl(plan.price);
document.getElementById('planTotal').textContent = brl(plan.price);
document.getElementById('planBlurb').textContent = plan.blurb;

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (!email) return;
  sessionStorage.setItem('titanOrder', JSON.stringify({
    plan: planId, name: plan.name, email, total: plan.price
  }));
  location.href = './pagar.html';
});
