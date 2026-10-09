// ===== 1. DADOS =====​
// nomeLoja e o array produtos (Tarefa 1)​
const nomeLoja = "Loja do Sena";
const produtos = [
    {nome: "Pippos", categoria: "Pipocas", preço: 4.50, quantidade: 30, vendidos: 0},
    {nome: "Picolé", categoria: "Gelados", preço: 5.00, quantidade: 60, vendidos: 0},
    {nome: "Sorvete", categoria: "Gelados", preço: 6.00, quantidade: 2, vendidos: 0},
    {nome: "Reizinho", categoria: "Pipocas", preço: 3.00, quantidade: 30, vendidos: 0},
    {nome: "Trident", categoria: "Goma de Mascar", preço: 1.00, quantidade: 50, vendidos: 0},
    {nome: "Chiclete Tatuagem", categoria: "Goma de Mascar", preço: 4.50, quantidade: 50, vendidos: 0},
];

// ===== 2. FUNÇÕES =====​
// todas as funções das Tarefas 2 a 11​

function listarProdutos(lista) {
    lista.forEach((produto, index) => console.log(`${index+1}. ${produto.nome} | ${produto.categoria} | R$ ${produto.preço} | ${produto.quantidade} un. | ${produto.vendidos} vendidos`));
}

function cadastrarProduto(lista, nome, categoria, preco, quantidade) {
    lista.push({nome: nome, categoria: categoria, preço: preco, quantidade: quantidade, vendidos: 0});
    console.log(`Produto cadastrado! Agora a loja tem ${lista.length} produtos.`)
}

function calcularValorEstoque(lista) {
    return lista.reduce((Total, produto) => Total += produto.quantidade * produto.preço, Total = 0);
}

function buscarProduto(lista, termo) {
    if (lista.some(produto => produto.nome.toUpperCase() === termo.toUpperCase())) {
        return lista.filter(produto => produto.nome.toUpperCase() === termo.toUpperCase())[0];
    } 

    return null;
}

function produtosEmFalta(lista, minimo) {
    const nova_lista = [];

    for (let k = 0; k < lista.length; k++) {
        if (lista[k].quantidade < minimo) {
            nova_lista.push({nome: lista[k].nome, categoria: lista[k].categoria, preço: lista[k].preço, quantidade: lista[k].quantidade, vendidos: lista[k].vendidos});
        }
    }

    return nova_lista;
}

function aplicarDesconto(lista, categoria, percentual) {
    let cont = 0;

    for (let k = 0; k < lista.length; k++) {
        if (lista[k].categoria === categoria) {
            lista[k].preço *= (1 - percentual / 100);
            cont++;
        }
    }

    return cont;
}

function registrarVenda(lista, nome, quantidade) {
    let produto_vendido = buscarProduto(lista, nome);

    if (produto_vendido === null) {
        return false;
    }

    if (produto_vendido.quantidade < quantidade) {
        return false
    }

    produto_vendido.vendidos += quantidade;
    produto_vendido.quantidade -= quantidade;
    return true;
}

function formatarNome(texto) {
    let texto_formatado1 = texto.trim().toLowerCase();
    texto_formatado1 = texto_formatado1[0].toUpperCase().concat(texto_formatado1.slice(1, texto_formatado1.length));
    return texto_formatado1;
}

function converterParaJSON(lista) {
    const texto = JSON.stringify(lista);

    return texto;
}

function lerJSON(texto) {
    const lista = JSON.parse(texto);

    return lista;
}

function gerarRelatorio(nome, lista) {
    console.log(`===== RELATÓRIO: ${nome} =====`);
    console.log(`Produtos cadastrados: ${lista.length}`);
    console.log(`Valor total em estoque: R$ ${calcularValorEstoque(lista)}`);
    let estoque_baixo = produtosEmFalta(lista, 5);
    console.log(`Produtos com estoque baixo: ${estoque_baixo.length}`);
    estoque_baixo.forEach(produto => console.log(`- ${produto.nome} (${produto.quantidade} un.)`));
}

// ===== 3. PROGRAMA PRINCIPAL =====​
// os testes: chamadas das funções e console.log

console.log("--- Tarefa 2: listar produtos ---");
listarProdutos(produtos);
console.log("--- Tarefa 3: cadastra produto ---");
cadastrarProduto(produtos, "Pirulitos", "Goma de Mascar", 0.5, 30);

console.log("--- Tarefa 4: Calcular Estoques ---");
console.log(`Valor do estoque: ${calcularValorEstoque(produtos)}`);

console.log("--- Tarefa 5: Busca produto ---");
let produto_encontrado = buscarProduto(produtos, "PIPPOS");

if (produto_encontrado !== null) {
    console.log(`Encontrado: ${produto_encontrado.nome} - R$ ${produto_encontrado.preço}`);
} else {
    console.log("Produto não encontrado.");
}

produto_encontrado = buscarProduto(produtos, "Kitkat");

if (produto_encontrado !== null) {
    console.log(`Encontrado: ${produto_encontrado.nome} - R$ ${produto_encontrado.preço}`);
} else {
    console.log("Produto não encontrado.");
}

console.log("--- Tarefa 6: Produtos em falta ---");

let produto_falta = produtosEmFalta(produtos, 5);

console.log(`Produtos com menos de 5 unidades: ${produto_falta}`);

console.log("--- Tarefa 7: Aplicar Desconto ---");

let qtd_itens_desconto = aplicarDesconto(produtos, "Pipocas", 10);
console.log(`${qtd_itens_desconto} produtos receberam desconto.`);

console.log("--- Tarefa 8: Vender Produto ---");

if (registrarVenda(produtos, "Chiclete Tatuagem", 10)) {
    let produto_vendido = buscarProduto(produtos, "Chiclete Tatuagem");
    console.log(`Venda realizada! ${produto_vendido.nome}: ${produto_vendido.quantidade} un. em estoque, ${produto_vendido.vendidos} vendidos.`)
} else {
    console.log("Venda não realizada: estoque insuficiente ou produto inexistente.");
}

if (registrarVenda(produtos, "Sorvete", 10)) {
    let produto_vendido = buscarProduto(produtos, "Sorvete");
    console.log(`Venda realizada! ${produto_vendido.nome}: ${produto_vendido.quantidade} un. em estoque, ${produto_vendido.vendidos} vendidos.`)
} else {
    console.log("Venda não realizada: estoque insuficiente ou produto inexistente.");
}

console.log("--- Tarefa 9: Padronizar Nomes ---");

console.log(formatarNome("  bORRACHA branca  "));

console.log("--- Tarefa 10: Ler e converter para JSON ---");

let arquivo_json = converterParaJSON(produtos);

console.log(typeof(arquivo_json));

let array = lerJSON(arquivo_json);

console.log(`Itens recuperados: ${array.length} | Primeiro: ${array[0].nome}`);

console.log("--- Tarefa 11: Relatorio final ---");

gerarRelatorio(nomeLoja, produtos);