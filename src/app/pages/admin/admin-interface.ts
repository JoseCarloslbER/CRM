// PRODUCTS
export interface DataProductTable {
  data : TableDataProductList[]
}

export interface TableDataProductList {
   code: string;
   name: string;
   price: string;
   link: string;
   product_category_id: string;
   country_id: string;
   price_id: string;
   discount_id: string;
   status_id: string;
   image: string;
}

export interface GetDataProduct {
  code: string;
  name: string;
  price: string;
  link: string;
  product_category_id: string;
  country_id: string;
  status_id: string;
  image: string;
  price_id: string;
  discount_id: string;
}

export interface PostDataProduct {
  code: string;
  name: string;
  price: string;
  link: string;
  product_category_id: string;
  country_id: string;
  status_id: string;
}

// END PRODUCTS 

// PRICE
export interface DataPriceTable {
  data : TableDataPriceList[]
}

export interface TableDataPriceList {
   code: string;
   price: string;
   tax_percentage: string;
   currency: string;
   price_id: string;
   status_id: string;
}

export interface GetDataPrice {
  code: string;
  price: string;
  tax_percentage: string;
  currency: string;
  price_id: string;
  status_id: string;
}

export interface PostDataPrice {
  code: string;
  price: string;
  tax_percentage: string;
  currency: string;
  price_id: string;
  status_id: string;
}

// END PRICE 