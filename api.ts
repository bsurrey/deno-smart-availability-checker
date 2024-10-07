const productUrl = Deno.env.get("PRODUCT_URL");

export async function fetchProductData() {
  if (!productUrl) {
    throw new Error("PRODUCT_URL is not set");
  }

  const response = await fetch(productUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}