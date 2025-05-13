import { CartItemDTO } from "../services/dto/cart.dto";


export const calcCartItemTotalPrice = (item: CartItemDTO):number => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    const basePrice = item.productItem.price;

    return (basePrice + ingredientsPrice) * item.quantity;
}