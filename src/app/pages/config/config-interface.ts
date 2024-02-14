// PRODUCT CATEGORIES
export interface TableDataProductCategory {
  product_category_id: string;
  category_name: string;
  description: string;
}

export interface PostDataProductCategory {
  category_name:string;
  description:string;
}

export interface PatchDataProductCategory {
  category_name?:string;
  description?:string;
}

export interface GetDataProductCategory {
  product_category_id:string;
  category_name:string;
  description:string;
}

  // END PRODUCT CATEGORIES 
