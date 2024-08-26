import { AxiosError } from 'axios'
import { IProductResponse } from '../products/interface/IProductService';
import nookies from 'nookies';

export interface CartDetails {
    productId: number,
    quantity: number,
}

export interface ICart {
    userId: number;
    cart: Array<CartDetails>
}

const addToCart = (params: { userId: number, productId: number, quantity: number }): string => {
    const cookies = nookies.get();
    const cart = cookies.cart;

    let updatedCart: ICart[] = [];

    if (cart) {
        updatedCart = JSON.parse(cart);

        // Verifica se o usuário já tem um carrinho
        const userIndex = updatedCart.findIndex((compra: ICart) => compra.userId === params.userId);

        if (userIndex !== -1) {
            // O usuário já tem um carrinho, atualize o item
            const userCart = updatedCart[userIndex].cart;
            const productIndex = userCart.findIndex((item: CartDetails) => item.productId === params.productId);

            if (productIndex !== -1) {
                // Atualize a quantidade se o produto já estiver no carrinho
                userCart[productIndex].quantity += params.quantity;
            } else {
                // Adiciona o novo produto ao carrinho do usuário
                userCart.push({ productId: params.productId, quantity: params.quantity });
            }

            // Atualiza o carrinho do usuário
            updatedCart[userIndex] = { ...updatedCart[userIndex], cart: userCart };
        } else {
            // Adiciona um novo carrinho para o usuário
            const newCart: CartDetails[] = [{ productId: params.productId, quantity: params.quantity }];
            updatedCart.push({ userId: params.userId, cart: newCart });
        }

        // Atualiza o cookie com o carrinho atualizado
        nookies.set(null, 'cart', JSON.stringify(updatedCart), {
            maxAge: 30 * 24 * 60 * 60, // 30 dias
            path: '/',
        });

        return "Adicionado com sucesso!";
    } else {
        // Se não há carrinho, cria um novo
        const newCart: ICart[] = [{ userId: params.userId, cart: [{ productId: params.productId, quantity: params.quantity }] }];

        // Atualiza o cookie com o novo carrinho
        nookies.set(null, 'cart', JSON.stringify(newCart), {
            maxAge: 30 * 24 * 60 * 60, // 30 dias
            path: '/',
        });

        return "Adicionado com sucesso!";
    }
};

const removeCart = (params: { userId: number, productId: number, quantity: number }): string => {
    const cookies = nookies.get();
    const cart = cookies.cart;

    if (cart) {
        const array: ICart[] = JSON.parse(cart);
        const index = array.findIndex((compra: ICart) => compra.userId === params.userId);

        if (index !== -1) {
            if (array[index].cart.length > 1) {
                // Remove o item do carrinho do usuário específico
                const updatedCart = array[index].cart.filter((item: CartDetails) => item.productId !== params.productId);
                array[index] = { ...array[index], cart: updatedCart };
            } else {
                // Remove o carrinho do usuário se não houver mais itens
                array.splice(index, 1);
            }

            // Atualiza o cookie com o carrinho atualizado
            nookies.set(null, 'cart', JSON.stringify(array), {
                maxAge: 30 * 24 * 60 * 60, // 30 dias
                path: '/',
            });

            return "Removido com sucesso!";
        } else {
            // Se o usuário não for encontrado no carrinho, não faz nada
            return "Usuário não encontrado no carrinho!";
        }
    }

    throw new Error("Carrinho inexistente!");
};

export const cartService = {
    addToCart,
    removeCart
}

