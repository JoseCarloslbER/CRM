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

// WAY TO PAY
export interface TableDataWayToPay {
  payment_method_id: string;
  payment_name: string;
}

export interface PostDataWayToPay {
  payment_name:string;
}

export interface GetDataWayToPay {
  payment_method_id?:string;
  payment_name:string;
}

export interface PatchDataWayToPay {
  payment_name:string;
}

// END WAY TO PAY 
