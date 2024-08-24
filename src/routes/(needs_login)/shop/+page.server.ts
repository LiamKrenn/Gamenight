import { STRIPE_SECRET_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const load = (async () => {
    let products = (await stripe.products.list()).data
    let categories = products.map(product => product.metadata.type).filter((value, index, self) => self.indexOf(value) === index)
    let productsByCategory = categories.map(category => {
      return {
        category: category.charAt(0).toUpperCase() + category.slice(1),
        products: products.filter(product => product.metadata.type === category)
      }
    })
    let prices = (await stripe.prices.list()).data
    let priceDict = prices.reduce((acc: any, price) => {
      acc[price.id] = price;
      return acc;
    }, {});
    
    return {
      productsByCategory: productsByCategory,
      prices: priceDict
    };
}) satisfies PageServerLoad;