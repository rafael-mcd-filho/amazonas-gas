// Os links do WhatsApp já vêm prontos no HTML (mensagem: "Vim pelo site e preciso de gás de cozinha.").
// Cada botão tem um id próprio e o atributo data-wa com o local na página, para rastreamento.
// O clique dispara o evento "whatsapp_click" no dataLayer (Google Tag Manager) e, se instalados,
// no GA4 (gtag) e no Pixel da Meta (fbq, evento padrão "Contact").
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-wa]");
  if (!link) return;
  const dados = { cta_id: link.id, cta_local: link.dataset.wa };
  (window.dataLayer = window.dataLayer || []).push({ event: "whatsapp_click", ...dados });
  if (typeof window.gtag === "function") window.gtag("event", "whatsapp_click", dados);
  if (typeof window.fbq === "function") window.fbq("track", "Contact", { content_name: link.id });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("mobile-nav");
function setMenu(open) {
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
toggle.addEventListener("click", () => setMenu(menu.hidden));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !menu.hidden) {
    setMenu(false);
    toggle.focus();
  }
});

// Botão flutuante do WhatsApp: só aparece depois que o CTA do topo sai da tela
const fab = document.querySelector(".fab");
const heroCta = document.querySelector(".hero .btn-hero");
if (fab && heroCta && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => fab.classList.toggle("is-visible", !entry.isIntersecting), { threshold: 0 }).observe(heroCta);
} else if (fab) {
  fab.classList.add("is-visible");
}
