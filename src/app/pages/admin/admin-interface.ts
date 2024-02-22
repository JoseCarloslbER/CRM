
// END CATALOGS

import * as entityGeneral from '../../shared/interfaces/general-interface';

// PRODUCTS

export interface DataProductTable {
   code: string;
   name: string;
   price: DataPriceTable;
   link: string;
   product_category_id: string;
   country: entityGeneral.DataCatCountry;
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

// DISCOUNTS
export interface DataDiscountTable {
  data : TableDataDiscountList[]
}

export interface TableDataDiscountList {
   code: string;
   name: string;
   discount_id: string;
   status_id: string;
}

export interface GetDataDiscount {
  code: string;
  name: string;
  discount_id: string;
  status_id: string;
}

export interface PostDataDiscount {
  code: string;
  name: string;
  status_id: string;
}

// END DISCOUNTS 