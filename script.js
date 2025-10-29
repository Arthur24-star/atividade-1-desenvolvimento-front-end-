// =======================================================
// ONG CAMINHO DE VOLTA — SCRIPT PRINCIPAL (ETAPA 2)
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== MENU HAMBÚRGUER =====
  const btnMenu = document.getElementById("btn-menu");
  const nav = document.getElementById("menu");

  if (btnMenu && nav) {
    btnMenu.addEventListener("click", () => {
      nav.classList.toggle("ativo");
      btnMenu.classList.toggle("ativo");
    });

    // Fecha o menu automaticamente quando clicar em um link (mobile)
    const links = nav.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("ativo");
        btnMenu.classList.remove("ativo");
      });
    });
  } else {
    console.warn("⚠️ Elementos do menu não foram encontrados no DOM.");
  }
});
