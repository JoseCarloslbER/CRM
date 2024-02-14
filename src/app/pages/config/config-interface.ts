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

// CAMPAING TYPE
export interface TableDataCampaingType {
  campaign_type_id: string;
  campaign_type_name: string;
}

export interface PostDataCampaingType {
  campaign_type_name:string;
}

export interface GetDataCampaingType {
  campaign_type_id?:string;
  campaign_type_name:string;
}

export interface PatchDataCampaingType {
  campaign_type_id:string;
  campaign_type_name:string;
}

// END CAMPAING TYPE 


// COMPANY TYPE
export interface TableDataCompanyType {
  company_type_id: string;
  type_name: string;
}

export interface PostDataCompanyType {
  type_name:string;
}

export interface GetDataCompanyType {
  company_type_id?:string;
  type_name:string;
}

export interface PatchDataCompanyType {
  company_type_id:string;
  type_name:string;
}

// END COMPANY TYPE 

// ORIGIN
export interface TableDataOrigin {
  platform_id: string;
  platform_name: string;
}

export interface PostDataOrigin {
  platform_name:string;
}

export interface GetDataOrigin {
  platform_id:string;
  platform_name:string;
}

export interface PatchDataOrigin {
  platform_id:string;
  platform_name:string;
}

// END ORIGIN 
