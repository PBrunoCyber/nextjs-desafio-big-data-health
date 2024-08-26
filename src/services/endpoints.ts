export const endpoints = {
    login: 'auth/login',
    register: 'users',
    user: 'users/:id',
    products: 'products?limit=:limit&sort=:sort',
    productsById: 'products/:id',
    productsByCategory: 'products/category/:category?limit=:limit&sort=:sort',
    categories: 'products/categories',
} as const