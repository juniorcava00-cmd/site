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

  const footer = document.querySelector('footer');
  if (footer && !footer.querySelector('.visitor-counter')) {
    const counter = document.createElement('div');
    counter.className = 'visitor-counter';
    counter.innerHTML = '<span>VISITANTES</span><img src="https://visitorbadge.shakarzr.com/api/counter/hit/juniorcava00-cmd/site" alt="Contador de visitantes" loading="eager">';
    footer.appendChild(counter);
  }
});

const style = document.createElement('style');
style.textContent = `
.download-section{display:flex;flex-direction:column;align-items:center;text-align:center;max-width:1000px;margin:0 auto;padding-top:110px;padding-bottom:110px}.download-section .eyebrow{margin-bottom:20px}.download-section h2{max-width:680px}.download-section>p{max-width:600px;margin:22px auto 0;line-height:1.75}.download-actions{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:30px}.download-badge{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border:1px solid #0d4c63;border-radius:999px;background:#03141b;color:#55d9ff;font-size:10px;font-weight:900;letter-spacing:.08em;white-space:nowrap}.download-notice{width:min(720px,100%);display:grid;grid-template-columns:48px minmax(0,1fr) auto;align-items:center;gap:16px;margin-top:34px;padding:22px 24px;text-align:left;border:1px solid #123b62;border-radius:18px;background:linear-gradient(135deg,#071a2b,#030b14);box-shadow:0 18px 55px #006dff12}.download-notice>strong{width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:#062d4b;color:var(--blue);font-size:22px}.download-notice b{display:block;font-size:14px;margin-bottom:5px}.download-notice small{display:block;color:#8fa8bf;font-size:11px;line-height:1.6}.download-notice .buy{white-space:nowrap}.download-cards{width:min(820px,100%);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:28px}.download-cards article{min-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;padding:25px 20px;border:1px solid #12304d;border-radius:18px;background:linear-gradient(145deg,#07111d,#030812);box-shadow:0 16px 45px #0005}.download-cards article>strong{width:46px;height:46px;display:grid;place-items:center;border-radius:12px;background:#062d4b;border:1px solid #0b5a91;color:var(--blue);font-size:22px;margin-bottom:18px}.download-cards article b{font-size:12px;line-height:1.4}.download-cards article small{max-width:180px;margin-top:9px;color:#8fa8bf;font-size:10px;line-height:1.65}.visitor-counter{display:flex;align-items:center;gap:8px;margin-left:24px;color:#536a82;font-size:8px;letter-spacing:.16em;white-space:nowrap;opacity:.7}.visitor-counter img{height:18px;width:auto;display:block;filter:grayscale(1) brightness(.8);opacity:.7}.visitor-counter span{font-size:8px}@media(max-width:700px){.download-notice{grid-template-columns:42px minmax(0,1fr);padding:18px}.download-notice .buy{grid-column:1/-1;width:100%}.download-cards{grid-template-columns:1fr}.download-cards article{min-height:0}.download-section{padding-top:85px;padding-bottom:85px}.visitor-counter{width:100%;justify-content:center;margin:18px 0 0;order:3}footer{flex-wrap:wrap;gap:16px;justify-content:center;text-align:center}}`;
document.head.appendChild(style);
