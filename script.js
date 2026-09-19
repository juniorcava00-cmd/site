document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#downloadModal');
  const openDownload = () => { if (!modal) return; modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); };
  const closeDownload = () => { if (!modal) return; modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); };

  document.querySelectorAll('.download-trigger').forEach((button) => button.addEventListener('click', openDownload));
  document.querySelectorAll('[data-close-download]').forEach((button) => button.addEventListener('click', closeDownload));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDownload(); });

  const fileButton = document.querySelector('#downloadFileButton');
  fileButton?.addEventListener('click', () => { fileButton.textContent = 'Instalador em breve'; fileButton.disabled = true; fileButton.style.opacity = '.65'; });

  const plans = document.querySelector('#planos');
  if (plans && !plans.querySelector('.plans-layout')) {
    plans.innerHTML = `
      <div class="eyebrow">ESCOLHA SEU PLANO</div>
      <h2>Escolha o plano ideal<br><em>para você.</em></h2>
      <p class="plans-intro">Acesso completo ao Titan Turbo. Uso único perde a KEY se formatar. Vitalício fica no mesmo PC mesmo formatando.</p>
      <div class="plans-layout">
        <article class="plan-card">
          <span class="plan-tag">ECONOMIZE 20%</span>
          <div class="plan-icon plan-icon-once" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M13.4 2.5 5.8 13h5.05l-.9 8.5 8.25-11.2h-5.1l.3-7.8Z"/>
            </svg>
          </div>
          <h3>APP USO ÚNICO</h3>
          <del>R$ 74,90</del>
          <strong>R$ 59<small>,90</small></strong>
          <p>Válido até formatar o computador.</p>
          <ul>
            <li>Aplicativo válido até formatar o PC.</li>
            <li>Limpeza profunda.</li>
            <li>Otimizações voltadas a FPS.</li>
            <li>Redução de input lag.</li>
            <li>Suporte no WhatsApp.</li>
          </ul>
          <a class="plan-button" data-track-plan data-plan-id="once" data-plan-name="APP USO ÚNICO" data-plan-price="59.90" href="/checkout/?plan=once">COMPRAR APP</a>
        </article>
        <article class="plan-card featured">
          <span class="plan-tag">MAIS POPULAR</span>
          <div class="plan-icon plan-icon-life" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M7.2 7.1c-2.7 0-4.7 2.2-4.7 4.9s2 4.9 4.7 4.9c2.2 0 3.8-1.4 4.8-2.8 1 1.4 2.6 2.8 4.8 2.8 2.7 0 4.7-2.2 4.7-4.9s-2-4.9-4.7-4.9c-2.2 0-3.8 1.4-4.8 2.8-1-1.4-2.6-2.8-4.8-2.8Zm0 2.4c1.1 0 2.3 1 3.3 2.5-1 1.5-2.2 2.5-3.3 2.5-1.4 0-2.4-1.1-2.4-2.5s1-2.5 2.4-2.5Zm9.6 0c1.4 0 2.4 1.1 2.4 2.5s-1 2.5-2.4 2.5c-1.1 0-2.3-1-3.3-2.5 1-1.5 2.2-2.5 3.3-2.5Z"/>
            </svg>
          </div>
          <h3>APP VITALÍCIO</h3>
          <del>R$ 179,90</del>
          <strong>R$ 139<small>,90</small></strong>
          <p>1 computador. Pode formatar o mesmo PC.</p>
          <ul>
            <li>Acesso vitalício neste hardware.</li>
            <li>Atualizações do aplicativo.</li>
            <li>Limpeza profunda.</li>
            <li>Redução de input lag.</li>
            <li>Suporte no WhatsApp.</li>
          </ul>
          <a class="plan-button" data-track-plan data-plan-id="life" data-plan-name="APP VITALÍCIO" data-plan-price="139.90" href="/checkout/?plan=life">COMPRAR APP</a>
        </article>
      </div>`;
    window.TitanTracking?.track('view_item_list', {
      item_list_id: 'titanturbo-plans',
      item_list_name: 'Planos Titan Turbo'
    });
  }
});
