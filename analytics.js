(() => {
  "use strict";

  const cfg = window.TITAN_TRACKING || {};
  const configured = Boolean(cfg.ga4MeasurementId || cfg.metaPixelId || cfg.tiktokPixelId);
  const storageKey = cfg.consentStorageKey || "titan_tracking_consent_v1";
  const pending = [];
  let providersLoaded = false;

  const safeNumber = (value) => Number.isFinite(Number(value)) ? Number(value) : undefined;
  const clean = (obj = {}) => Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );

  function getConsent() {
    try { return localStorage.getItem(storageKey); } catch { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(storageKey, value); } catch {}
  }

  function loadGa4() {
    const id = cfg.ga4MeasurementId;
    if (!id || window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
  }

  function loadMeta() {
    const id = cfg.metaPixelId;
    if (!id || window.fbq) return;
    const f = window.fbq = function(){ f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
    if (!window._fbq) window._fbq = f;
    f.push = f; f.loaded = true; f.version = "2.0"; f.queue = [];
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    f("init", id);
    f("track", "PageView");
  }

  function loadTikTok() {
    const id = cfg.tiktokPixelId;
    if (!id || window.ttq) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;
      const ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
      ttq.setAndDefer=function(target,method){target[method]=function(){target.push([method].concat(Array.prototype.slice.call(arguments,0)));};};
      for(let i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(id){const instance=ttq._i[id]||[];for(let i=0;i<ttq.methods.length;i++)ttq.setAndDefer(instance,ttq.methods[i]);return instance;};
      ttq.load=function(pixelId, options){
        const url="https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i=ttq._i||{};ttq._i[pixelId]=[];ttq._i[pixelId]._u=url;
        ttq._t=ttq._t||{};ttq._t[pixelId]=+new Date;
        ttq._o=ttq._o||{};ttq._o[pixelId]=options||{};
        const script=d.createElement("script");script.type="text/javascript";script.async=true;
        script.src=url+"?sdkid="+pixelId+"&lib="+t;
        const first=d.getElementsByTagName("script")[0];first.parentNode.insertBefore(script,first);
      };
    }(window, document, "ttq");
    window.ttq.load(id);
    window.ttq.page();
  }

  function loadProviders() {
    if (!configured || providersLoaded || getConsent() !== "accepted") return;
    providersLoaded = true;
    loadGa4();
    loadMeta();
    loadTikTok();
    while (pending.length) dispatch(...pending.shift());
  }

  function gaEvent(name, data) {
    if (!window.gtag) return;
    const map = {
      view_item: "view_item",
      view_item_list: "view_item_list",
      select_item: "select_item",
      begin_checkout: "begin_checkout",
      purchase: "purchase",
      download: "file_download",
      contact: "generate_lead"
    };
    const value = safeNumber(data.value);
    const params = clean({
      currency: data.currency || (value !== undefined ? "BRL" : undefined),
      value,
      transaction_id: data.transaction_id,
      item_list_id: data.item_list_id,
      item_list_name: data.item_list_name,
      file_name: name === "download" ? data.item_name : undefined,
      link_url: name === "download" ? location.href : undefined
    });
    if (data.item_id) {
      params.items = [{
        item_id: String(data.item_id),
        item_name: data.item_name || String(data.item_id),
        price: value,
        quantity: data.quantity || 1
      }];
    }
    window.gtag("event", map[name] || name, params);
  }

  function metaEvent(name, data) {
    if (!window.fbq) return;
    const value = safeNumber(data.value);
    const common = clean({
      value,
      currency: data.currency || (value !== undefined ? "BRL" : undefined),
      content_ids: data.item_id ? [String(data.item_id)] : undefined,
      content_name: data.item_name,
      content_type: data.item_id ? "product" : undefined
    });
    const map = {
      view_item: "ViewContent",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
      contact: "Contact"
    };
    if (map[name]) window.fbq("track", map[name], common);
    else window.fbq("trackCustom", name === "download" ? "Download" : name, common);
  }

  function tiktokEvent(name, data) {
    if (!window.ttq) return;
    const value = safeNumber(data.value);
    const payload = clean({
      value,
      currency: data.currency || (value !== undefined ? "BRL" : undefined),
      content_ids: data.item_id ? [String(data.item_id)] : undefined,
      content_name: data.item_name,
      content_type: data.item_id ? "product" : undefined,
      quantity: data.quantity || (data.item_id ? 1 : undefined)
    });
    const map = {
      view_item: "ViewContent",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
      download: "Download",
      contact: "Contact"
    };
    if (map[name]) window.ttq.track(map[name], payload);
  }

  function dispatch(name, data = {}) {
    gaEvent(name, data);
    metaEvent(name, data);
    tiktokEvent(name, data);
  }

  function track(name, data = {}) {
    if (!configured) return;
    if (getConsent() === "accepted") {
      loadProviders();
      setTimeout(() => dispatch(name, data), 0);
    } else if (getConsent() !== "rejected") {
      pending.push([name, data]);
    }
  }

  function renderConsent() {
    if (!configured || getConsent()) return;
    const el = document.createElement("section");
    el.id = "titanCookieConsent";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Preferências de cookies");
    el.innerHTML = `
      <div class="titan-consent-copy">
        <strong>Privacidade e mensuração</strong>
        <span>Usamos cookies opcionais de analytics e anúncios para medir campanhas e melhorar o site. Você pode aceitar ou recusar. <a href="/privacidade/">Saiba mais</a>.</span>
      </div>
      <div class="titan-consent-actions">
        <button type="button" data-consent="rejected">Recusar opcionais</button>
        <button type="button" data-consent="accepted">Aceitar opcionais</button>
      </div>`;
    const style = document.createElement("style");
    style.textContent = `
      #titanCookieConsent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:980px;margin:auto;display:flex;gap:18px;align-items:center;justify-content:space-between;padding:18px 20px;border:1px solid #174b70;border-radius:16px;background:#030b14f2;box-shadow:0 20px 70px #000b;color:#f4f8ff;font:12px/1.5 Inter,Arial,sans-serif;backdrop-filter:blur(16px)}
      .titan-consent-copy{display:grid;gap:4px;max-width:680px}.titan-consent-copy strong{font-size:13px}.titan-consent-copy span{color:#9fb5ca}.titan-consent-copy a{color:#55d9ff;text-decoration:underline}
      .titan-consent-actions{display:flex;gap:8px;flex-wrap:wrap}.titan-consent-actions button{border:1px solid #1a527e;border-radius:999px;padding:10px 14px;background:#071525;color:#eaf5ff;font-weight:800;cursor:pointer}.titan-consent-actions button[data-consent="accepted"]{background:linear-gradient(135deg,#08a9ff,#087eff);border-color:#08a9ff}
      @media(max-width:700px){#titanCookieConsent{align-items:stretch;flex-direction:column}.titan-consent-actions button{flex:1}}
    `;
    document.head.appendChild(style);
    document.body.appendChild(el);
    el.addEventListener("click", (event) => {
      const button = event.target.closest("[data-consent]");
      if (!button) return;
      const choice = button.getAttribute("data-consent");
      setConsent(choice);
      el.remove();
      if (choice === "accepted") loadProviders();
      else pending.length = 0;
    });
  }

  window.TitanTracking = {
    track,
    consent: {
      status: getConsent,
      accept: () => { setConsent("accepted"); loadProviders(); },
      reject: () => { setConsent("rejected"); pending.length = 0; },
      reset: () => { try { localStorage.removeItem(storageKey); } catch {} location.reload(); }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (getConsent() === "accepted") loadProviders();
    else renderConsent();

    document.addEventListener("click", (event) => {
      const dl = event.target.closest("[data-track-download]");
      if (dl) track("download", { item_name: "TitanTurboPRO", item_id: "titanturbo-download" });

      const wa = event.target.closest('a[href*="wa.me/"]');
      if (wa) track("contact", { item_name: "WhatsApp Titan Turbo" });

      const plan = event.target.closest("[data-track-plan]");
      if (plan) track("select_item", {
        item_id: plan.getAttribute("data-plan-id"),
        item_name: plan.getAttribute("data-plan-name"),
        value: safeNumber(plan.getAttribute("data-plan-price")),
        currency: "BRL"
      });
    });
  });
})();
