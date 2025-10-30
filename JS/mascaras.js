// ==========================
// MÁSCARAS DE FORMULÁRIO + API VIA CEP
// ==========================

// Função genérica para aplicar máscara enquanto digita
function aplicarMascara(input, mascara) {
  input.addEventListener("input", () => {
    let valor = input.value.replace(/\D/g, ""); // remove tudo que não for número
    let resultado = "";
    let indice = 0;

    for (let caractere of mascara) {
      if (caractere === "#") {
        if (indice < valor.length) {
          resultado += valor[indice];
          indice++;
        }
      } else {
        resultado += caractere;
      }
    }

    input.value = resultado;
  });
}

// ==========================
// MÁSCARAS — PÁGINA DE DOAÇÕES
// ==========================
const telefoneDoacao = document.getElementById("telefoneDoacao");
if (telefoneDoacao) aplicarMascara(telefoneDoacao, "(##) #####-####");

const cpfDoacao = document.getElementById("cpfDoacao");
if (cpfDoacao) aplicarMascara(cpfDoacao, "###.###.###-##");

const cepDoacao = document.getElementById("cepDoacao");
if (cepDoacao) aplicarMascara(cepDoacao, "#####-###");

// ==========================
// MÁSCARAS — PÁGINA DE VOLUNTARIADO
// ==========================
const telefoneVoluntario = document.getElementById("telefoneVoluntario");
if (telefoneVoluntario) aplicarMascara(telefoneVoluntario, "(##) #####-####");

// ==========================
// MÁSCARAS — PÁGINA DE CONTATO
// ==========================
const telefoneContato = document.getElementById("telefoneContato");
if (telefoneContato) aplicarMascara(telefoneContato, "(##) #####-####");

const cepContato = document.getElementById("cepContato");
if (cepContato) aplicarMascara(cepContato, "#####-###");

// ==========================
// API VIA CEP — PREENCHIMENTO AUTOMÁTICO
// ==========================
function buscarCEP(cep, campos) {
  // Remove caracteres não numéricos
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) return; // CEP incompleto

  fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    .then(response => response.json())
    .then(dados => {
      if (dados.erro) {
        alert("❌ CEP não encontrado. Verifique e tente novamente.");
        return;
      }

      // Preenche os campos de endereço automaticamente
      if (campos.endereco) campos.endereco.value = dados.logradouro || "";
      if (campos.bairro) campos.bairro.value = dados.bairro || "";
      if (campos.cidade) campos.cidade.value = dados.localidade || "";
      if (campos.uf) campos.uf.value = dados.uf || "";
    })
    .catch(() => {
      alert("⚠️ Erro ao buscar o CEP. Verifique sua conexão.");
    });
}

// ==========================
// INTEGRAÇÃO DO VIA CEP NAS PÁGINAS
// ==========================

// Página de Doações
if (cepDoacao) {
  cepDoacao.addEventListener("blur", () => {
    buscarCEP(cepDoacao.value, {
      endereco: document.getElementById("enderecoDoacao"),
      bairro: document.getElementById("bairroDoacao"),
      cidade: document.getElementById("cidadeDoacao"),
      uf: document.getElementById("ufDoacao"),
    });
  });
}

// Página de Contato
if (cepContato) {
  cepContato.addEventListener("blur", () => {
    buscarCEP(cepContato.value, {
      endereco: document.getElementById("enderecoContato"),
      cidade: null, // não há campos separados, então ignora
      bairro: null,
      uf: null,
    });
  });
}
