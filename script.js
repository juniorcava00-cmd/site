document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#downloadModal');

  const openDownload = () => {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeDownload = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.download-trigger').forEach((button) => {
    button.addEventListener('click', openDownload);
  });

  document.querySelectorAll('[data-close-download]').forEach((button) => {
    button.addEventListener('click', closeDownload);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDownload();
  });

  const fileButton = document.querySelector('#downloadFileButton');
  fileButton?.addEventListener('click', () => {
    fileButton.textContent = 'Instalador em breve';
    fileButton.disabled = true;
    fileButton.style.opacity = '.65';
  });

  const downloadSection = document.querySelector('.download-section');
  if (downloadSection) {
    downloadSection.innerHTML = `
      <div class="eyebrow">DOWNLOAD OFICIAL</div>
      <h2>Baixe o <em>Titan Turbo</em></h2>
      <p>O Titan Turbo já está disponível. Baixe o instalador oficial e entre com sua conta para começar.</p>
      <div class="download-actions">
        <button class="buy download-trigger" type="button">⇩ &nbsp; Baixar Titan Turbo</button>
        <span class="download-badge">✓ &nbsp; 100% LIVRE DE MALWARE</span>
      </div>
      <div class="download-notice">
        <strong>▣</strong>
        <div><b>Ainda não tem uma key?</b><small>Escolha o período de acesso ideal para liberar o catálogo completo.</small></div>
        <a class="buy" href="#planos">Confira os planos</a>
      </div>
      <div class="download-cards">
        <article><strong>▣</strong><b>Windows 10 ou 11</b><small>Instalador único, 64-bit, sem exigir versão específica.</small></article>
        <article><strong>↟</strong><b>Reversível por padrão</b><small>Ponto de restauração criado automaticamente antes de aplicar.</small></article>
        <article><strong>▤</strong><b>Qualquer CPU/GPU</b><small>Nvidia, AMD ou Intel; 100% compatível, sem requisitos pesados.</small></article>
      </div>`;

    downloadSection.querySelectorAll('.download-trigger').forEach((button) => {
      button.addEventListener('click', openDownload);
    });
  }

  const plans = document.querySelector('#planos');
  if (plans) {
    plans.innerHTML = `
      <div class="eyebrow">ESCOLHA SEU PLANO</div>
      <h2>Escolha o plano ideal<br><em>para você.</em></h2>
      <p class="plans-intro">Tenha acesso completo ao Titan Turbo e leve o máximo desempenho para o seu PC. Escolha o plano que combina com seu momento.</p>
      <div class="plans-layout">
        <article class="plan-card">
          <span class="plan-tag">ECONOMIZE 20%</span>
          <div class="plan-icon">ϟ</div>
          <h3>APP USO ÚNICO</h3>
          <del>R$ 74,90</del>
          <strong>R$ 59<small>,90</small></strong>
          <p>Acesso ao aplicativo de otimização. Uso válido até formatar o computador.</p>
          <ul>
            <li>Aplicativo válido até formatar o PC.</li>
            <li>Limpeza profunda.</li>
            <li>Boost de FPS imediato.</li>
            <li>Redução instantânea de input lag.</li>
            <li>Interface simples e intuitiva.</li>
            <li>Suporte no Discord oficial.</li>
          </ul>
          <a class="plan-button" href="#download">COMPRAR APP</a>
        </article>
        <article class="plan-card featured">
          <span class="plan-tag">MAIS POPULAR</span>
          <div class="plan-icon">ϟ</div>
          <h3>APP VITALÍCIO</h3>
          <del>R$ 179,90</del>
          <strong>R$ 139<small>,90</small></strong>
          <p>Acesso ilimitado à ferramenta definitiva, com futuras atualizações.</p>
          <ul>
            <li>Acesso vitalício ilimitado.</li>
            <li>Atualizações garantidas.</li>
            <li>Otimização permanente.</li>
            <li>Limpeza profunda.</li>
            <li>Interface simples e intuitiva.</li>
            <li>Redução instantânea de input lag.</li>
          </ul>
          <a class="plan-button" href="#download">COMPRAR APP</a>
        </article>
      </div>`;
  }
});

const style = document.createElement('style');
style.textContent = `
.plans-intro{max-width:620px;margin:22px auto 46px;color:var(--muted);font-size:14px;line-height:1.7;text-align:center}.plans-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;max-width:820px;margin:0 auto;align-items:stretch}.plan-card{position:relative;padding:30px;border:1px solid #123b62;border-radius:22px;background:linear-gradient(145deg,#071525,#020812);box-shadow:0 20px 70px #006dff0b}.plan-card.featured{border:2px solid var(--blue);box-shadow:0 0 38px #008cff25}.plan-tag{position:absolute;right:18px;top:16px;padding:7px 12px;border:1px solid #087dce;border-radius:20px;color:var(--blue);font-size:9px;font-weight:900;letter-spacing:.08em}.featured .plan-tag{background:var(--blue);color:#00101d}.plan-icon{width:44px;height:44px;display:grid;place-items:center;border-radius:13px;border:1px solid #0b5a91;background:#06233d;color:var(--blue);font-size:27px;font-weight:900;margin-bottom:24px}.plan-card h3{font-size:17px;margin:0 0 15px}.plan-card del{display:block;color:#7188a0;font-size:11px}.plan-card>strong{display:block;font-size:39px;letter-spacing:-.06em;margin:5px 0 10px}.plan-card>strong small{font-size:20px}.plan-card p{color:#9eb4c9;font-size:11px;line-height:1.7;margin:0 0 18px}.plan-card ul{list-style:none;padding:0;margin:0 0 26px;display:grid;gap:11px}.plan-card li{color:#b6c8d9;font-size:11px;line-height:1.45}.plan-card li:before{content:'✓';color:var(--blue);font-weight:900;margin-right:10px}.plan-button{display:flex;align-items:center;justify-content:center;min-height:48px;border:1px solid var(--blue);border-radius:14px;color:#fff;font-size:11px;font-weight:900;background:linear-gradient(135deg,#073b68,#006dff);box-shadow:0 0 25px #006dff22}.plan-card:not(.featured) .plan-button{background:#07111d}.faq{padding-top:100px}@media(max-width:700px){.plans-layout{grid-template-columns:1fr}.plan-card{padding:24px}.plans-intro{font-size:13px}}`;
document.head.appendChild(style);
