function addProdutoComQuant(id, nome, valor) {
    const inputQuantidade = document.getElementById(`quantidade-produto-${id}`).value;
    const quantidade = parseInt(inputQuantidade, 10);

    if (quantidade > 0) {
        adicionarProduto(id, nome, valor, quantidade);
    } else {
        alert('Por favor, insira uma quantidade válida.');
    }
}

function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produtoExistente = false;

    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id === id) {
            carrinho[i].quantidade += quantidade;
            produtoExistente = true;
            break;
        }
    }

    if (!produtoExistente) {
        carrinho.push({ id, nome, valor, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            const total = produto.valor * produto.quantidade;
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${total.toFixed(2)}`;

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerProduto(produto.id);
            li.appendChild(btnRemover);

            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

exibirCarrinho();
