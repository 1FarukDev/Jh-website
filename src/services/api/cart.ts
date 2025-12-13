import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getOrCreateCart = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: cart, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (cart) return cart;

  const { data: newCart, error: createError } = await supabase
    .from("carts")
    .insert({ user_id: user.id })
    .select()
    .single();

  if (createError) throw createError;

  return newCart;
};

export const getCartItems = async () => {
  const cart = await getOrCreateCart();

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
        id,
        quantity,
        products (
          id,
          name,
          price,
          image
        )
      `
    )
    .eq("cart_id", cart.id);

  if (error) throw error;

  return data || [];
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  const cart = await getOrCreateCart();

  const { data, error } = await supabase
    .from("cart_items")
    .upsert(
      {
        cart_id: cart.id,
        product_id: productId,
        quantity,
      },
      {
        onConflict: "cart_id,product_id",
      }
    )
    .select()
    .single();

  if (error) throw error;

  return data;
};
export const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number
) => {
  if (quantity <= 0) {
    return removeCartItem(cartItemId);
  }

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId)
    .select()
    .single();

  if (error) throw error;

  return data;
};
export const removeCartItem = async (cartItemId: string) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) throw error;

  return true;
};
export const clearCart = async () => {
  const cart = await getOrCreateCart();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cart.id);

  if (error) throw error;

  return true;
};

export const syncLocalCart = async (
  localCart: { productId: string; quantity: number }[]
) => {
  if (!localCart.length) return;

  const cart = await getOrCreateCart();

  const payload = localCart.map((item) => ({
    cart_id: cart.id,
    product_id: item.productId,
    quantity: item.quantity,
  }));

  const { error } = await supabase.from("cart_items").upsert(payload, {
    onConflict: "cart_id,product_id",
  });

  if (error) throw error;

  localStorage.removeItem("cart");
};
