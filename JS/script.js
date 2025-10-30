// =========================
// CAMINHO DE VOLTA — SCRIPT PRINCIPAL (SPA corrigido para GitHub Pages)
// =========================

document.addEventListener("DOMContentLoaded", () => {
  // ===== FORMULÁRIOS =====
  configurarFormularios();

  // ===== SPA (Single Page Application) =====
  const conteudo = document.getElementById("conteudo");
  const linksSPA = document.querySelectorAll("nav a[data-page]");

  if (conteudo && linksSPA.length > 0) {
    linksSPA.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = link.getAttribute("data-page");
        carregarPaginaSPA(url);
        window.history.pushState({}, "", `#${url}`);

        // marca o link ativo
        linksSPA.forEach(l => l.classList.remove("ativo"));
        link.classList.add("ativo");
      });
    });

    // 🔹 Carregar página inicial automaticamente (com fallback)
    const hash = window.location.hash.replace("#", "") || "inicio.html";
    carregarPaginaSPA(hash);
  }
});

// ===============================
// 🔧 FUNÇÕES AUXILIARES
// ===============================

function configurarFormularios() {
  const form = document.getElementById("formDoacao");
  const formVoluntario = document.getElementById("formVoluntario");
  const formContato = document.getElementById("form-contato");

  if (form) configurarFormDoacao(form);
  if (formVoluntario) configurarFormVoluntario(formVoluntario);
  if (formContato) configurarFormContato(formContato);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function salvarDadosLocal(chave, dados) {
  const existentes = JSON.parse(localStorage.getItem(chave)) || [];
  existentes.push(dados);
  localStorage.setItem(chave, JSON.stringify(existentes));
}

function removerMensagem(elemento) {
  setTimeout(() => elemento?.remove(), 5000);
}

// ===============================
// 🧩 CARREGAMENTO DAS PÁGINAS (SPA)
// ===============================
function carregarPaginaSPA(url) {
  fetch(`paginas/${url}`) // 🔥 caminho corrigido
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar página");
      return response.text();
    })
    .then(html => {
      document.getElementById("conteudo").innerHTML = html;
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch(err => {
      document.getElementById("conteudo").innerHTML =
        "<p style='color:red; text-align:center;'>Erro ao carregar conteúdo 😕</p>";
      console.error(err);
    });
}
