import React, { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';
import { ICart } from '@/services/cart/Cart';
import useFetchUserInformations from '@/hooks/user/useFetchUserInformations';

interface CartContextType {
    cartQuantity: number;
    cartInfo: ICart;
    updateCart: (userId: number) => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartInfo, setCartInfo] = useState<ICart>({} as ICart);
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const { user } = useFetchUserInformations();
    const updateCart = (userId: number) => {
        const cookies = nookies.get();
        const cart = cookies.cart;
        if (cart) {
            const array: ICart[] = JSON.parse(cart);
            const userCart = array.find((compra) => compra.userId === userId);
            if (userCart) {
                const quantity = userCart.cart.length;
                setCartQuantity(quantity);
                setCartInfo(userCart);
            } else {
                setCartQuantity(0);
                setCartInfo({} as ICart);
            }
        } else {
            setCartQuantity(0);
            setCartInfo({} as ICart);
        }
    };

    useEffect(() => {
        if (user) {
            updateCart(user.id);
        }
    }, [user]);

    return (
        <CartContext.Provider value={{ cartQuantity, cartInfo, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};