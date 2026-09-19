# Mensuração Titan Turbo

A infraestrutura do site está pronta para GA4, Meta Pixel e TikTok Pixel, mas os IDs públicos não são inventados nem armazenados como segredos.

Edite `tracking-config.js` e preencha, quando disponíveis:

- `ga4MeasurementId`: ID no formato G-XXXXXXXXXX.
- `metaPixelId`: ID numérico do Meta Pixel.
- `tiktokPixelId`: ID do Pixel do TikTok.

Os provedores só são carregados após o visitante aceitar cookies opcionais.

Eventos implementados:
- visualização de planos/produto;
- seleção de plano;
- início de checkout;
- compra, somente após confirmação da API;
- download do aplicativo.

Nenhum e-mail do comprador é enviado aos pixels por este código.
