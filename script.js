const pages = [
  ["index.html", "Home"],
  ["historia.html", "Nossa História"],
  ["ensaiadores.html", "Ensaiadores"],
  ["fotos.html", "Fotos"],
  ["ensaios.html", "Ensaios"],
  ["contato.html", "Contacto"],
];
// Fotografias locais fornecidas para este site (sem dependências de imagens externas).
const images = {
  hero1: "images/fotografias/ranchoformacao.jpg",
  hero2: "images/fotografias/t1.jpg",
  hero3: "images/fotografias/8.jpeg",
  dance: "images/fotografias/1.jpeg",
  music: "images/fotografias/9.jpeg",
  group: "images/fotografias/ranchoformacao.jpg",
  portrait1: "images/fotografias/portrait1.png",
  portrait2: "images/fotografias/portrait2.png",
  portrait3: "images/fotografias/portrait3.png",
  old: "images/fotografias/srmanueledonaaurora.png",
};
const current = location.pathname.split("/").pop() || "index.html";
document.querySelector("#header").innerHTML =
  `<div class="header"><nav class="nav container"><a class="brand" href="index.html"><link>R. F. Camponeses<span> de </span>Portugal</a><button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button><div class="nav-links">${pages.map(([url, name]) => `<a class="${current === url ? "active" : ""}" href="${url}">${name}</a>`).join("")}<div class="socials"><a href="https://www.instagram.com/r.fcamponesesdeportugal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram ↗</a><a href="https://www.facebook.com/camponeses.deportugal.5/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook ↗</a></div></div></nav></div>`;
document.querySelector("#footer").innerHTML =
  `<footer class="footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="index.html">R. F. Camponeses<span> de </span>Portugal</a><p>Memórias que dançam. Tradições que permanecem.</p></div><div><strong>Explorar</strong><p><a href="historia.html">Nossa História</a> · <a href="fotos.html">Fotografias</a> · <a href="contato.html">Contacto</a></p></div><div><strong>Acompanhe-nos</strong><p><a href="https://www.instagram.com/r.fcamponesesdeportugal/" target="_blank">Instagram</a> · <a href="https://www.facebook.com/camponeses.deportugal.5/" target="_blank">Facebook</a></p></div></div><hr style="border:0;border-top:1px solid #ffffff22;margin:30px 0"><small>© ${new Date().getFullYear()} Rancho Folclórico Camponeses de Portugal — Desenvolvido por Rodrigo Coelho.</small></div></footer><button class="back-top" aria-label="Voltar ao topo" title="Voltar ao topo">↑</button><div class="lightbox" role="dialog" aria-modal="true" aria-label="Visualização de fotografia"><button aria-label="Fechar">×</button><img alt="Fotografia ampliada"></div>`;
const toggle = document.querySelector(".menu-toggle"),
  links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "×" : "☰";
});
const topBtn = document.querySelector(".back-top");
window.addEventListener(
  "scroll",
  () => topBtn.classList.toggle("show", scrollY > 350),
  { passive: true },
);
topBtn.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
document.querySelectorAll("[data-img]").forEach((e) => {
  e.src = images[e.dataset.img] || images.group;
});
document.querySelectorAll("[data-bg]").forEach((e) => {
  e.style.backgroundImage = `url('${images[e.dataset.bg] || images.hero1}')`;
});
const slides = [...document.querySelectorAll(".slide")];
if (slides.length) {
  let i = 0;
  const show = (n) => {
    slides[i].classList.remove("active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("active");
  };
  let timer = setInterval(() => show(i + 1), 6500);
  document.querySelectorAll("[data-slide]").forEach((b) =>
    b.addEventListener("click", () => {
      show(i + Number(b.dataset.slide));
      clearInterval(timer);
      timer = setInterval(() => show(i + 1), 6500);
    }),
  );
}
document.querySelectorAll(".filter").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    document
      .querySelectorAll("[data-category]")
      .forEach(
        (x) =>
          (x.hidden =
            b.dataset.filter !== "all" &&
            x.dataset.category !== b.dataset.filter),
      );
  }),
);
const modal = document.querySelector(".lightbox");
document.querySelectorAll(".album").forEach((el) =>
  el.addEventListener("click", () => {
    modal.querySelector("img").src = el.querySelector("img").src;
    modal.classList.add("open");
  }),
);
modal
  .querySelector("button")
  .addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("open");
});
const form = document.querySelector("#contact-form");
if (form)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(
      "Contacto pelo website — " + data.get("name"),
    );
    const body = encodeURIComponent(
      `Nome: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    location.href = `mailto:geral@exemplo.pt?subject=${subject}&body=${body}`;
    document.querySelector("#form-status").textContent =
      "A sua aplicação de email será aberta para enviar a mensagem.";
  });
