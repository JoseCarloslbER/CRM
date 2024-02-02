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

export interface PostDataProduct {
  code: string;
  name: string;
  price: string;
  link: string;
  product_category_id: string;
  country_id: string;
  status_id: string;
}