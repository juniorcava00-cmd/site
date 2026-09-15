document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#downloadModal');
  const openDownload = () => { if (!modal) return; modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); };
  const closeDownload = () => { if (!modal) return; modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); };

  document.querySelectorAll('.download-trigger').forEach((button) => button.addEventListener('click', openDownload));
  document.querySelectorAll('[data-close-download]').forEach((button) => button.addEventListener('click', closeDownload));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDownload(); });

  const fileButton = document.querySelector('#downloadFileButton');
  fileButton?.addEventListener('click', () => { fileButton.textContent = 'Instalador em breve'; fileButton.disabled = true; fileButton.style.opacity = '.65'; });

  const downloadSection = document.querySelector('.download-section');
  if (downloadSection) {
    downloadSection.innerHTML = `
      <div class="eyebrow">DOWNLOAD OFICIAL</div>
      <h2>Baixe o <em>Titan Turbo</em></h2>
      <p>O Titan Turbo já está disponível. Baixe o instalador oficial e entre com sua KEY.</p>
      <div class="download-actions">
        <button class="buy download-trigger" type="button">⇩ &nbsp; Baixar Titan Turbo</button>
        <span class="download-badge">✓ &nbsp; 100% LIVRE DE MALWARE</span>
      </div>
      <div class="download-notice">
        <strong>▣</strong>
        <div><b>Ainda não tem uma key?</b><small>Escolha o plano e finalize a compra.</small></div>
        <a class="buy" href="/planos/">Confira os planos</a>
      </div>
      <div class="download-cards">
        <article><strong>▣</strong><b>Windows 10 ou 11</b><small>Instalador único, 64-bit.</small></article>
        <article><strong>⇈</strong><b>Reversível por padrão</b><small>Ponto de restauração antes de aplicar.</small></article>
        <article><strong>▤</strong><b>Qualquer CPU/GPU</b><small>Nvidia, AMD ou Intel.</small></article>
      </div>`;
    downloadSection.querySelectorAll('.download-trigger').forEach((button) => button.addEventListener('click', openDownload));
  }

  const plans = document.querySelector('#planos');
  if (plans) {
    plans.innerHTML = `
      <div class="eyebrow">ESCOLHA SEU PLANO</div>
      <h2>Escolha o plano ideal<br><em>para você.</em></h2>
      <p class="plans-intro">Acesso completo ao Titan Turbo. Uso único perde a KEY se formatar. Vitalício fica no mesmo PC mesmo formatando.</p>
      <div class="plans-layout">
        <article class="plan-card">
          <span class="plan-tag">ECONOMIZE 20%</span>
          <div class="plan-icon">ϛ</div>
          <h3>APP USO ÚNICO</h3>
          <del>R$ 74,90</del>
          <strong>R$ 59<small>,90</small></strong>
          <p>Válido até formatar o computador.</p>
          <ul>
            <li>Aplicativo válido até formatar o PC.</li>
            <li>Limpeza profunda.</li>
            <li>Boost de FPS imediato.</li>
            <li>Redução de input lag.</li>
            <li>Suporte no WhatsApp.</li>
          </ul>
          <a class="plan-button" href="/checkout/?plan=once">COMPRAR APP</a>
        </article>
        <article class="plan-card featured">
          <span class="plan-tag">MAIS POPULAR</span>
          <div class="plan-icon">ϛ</div>
          <h3>APP VITALÍCIO</h3>
          <del>R$ 179,90</del>
          <strong>R$ 139<small>,90</small></strong>
          <p>1 computador. Pode formatar o mesmo PC.</p>
          <ul>
            <li>Acesso vitalício neste hardware.</li>
            <li>Atualizações garantidas.</li>
            <li>Limpeza profunda.</li>
            <li>Redução de input lag.</li>
            <li>Suporte no WhatsApp.</li>
          </ul>
          <a class="plan-button" href="/checkout/?plan=life">COMPRAR APP</a>
        </article>
      </div>`;
  }
});
