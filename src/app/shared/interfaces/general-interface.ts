// CATALOGS
export interface DataCatProductCategory {
  category_name : string;
  description : string;
  product_category_id : string;
  status_id : string;
}

export interface DataCatCountry {
  country_name : string;
  country_id : string;
  status_id : string;
}

export interface DataCatBusiness {
  business_name: string;
  business_id: string;
  status_id: string;
}

export interface DataCatType {
  campaign_type_id: string;
  campaign_type_name: string;
  status_id: string;
}

export interface DataCatStatus {
  description: string;
  module: string;
  status_id: string;
}

export interface DataCatAgents {
  id: string;
  first_name: string;
  last_name: string;
}

export interface DataCatCompanySize {
  size_name : string;
  company_size_id : string;
  status_id : string;
}

export interface DataCatCompanyType {
  type_name : string;
  company_type_id : string;
  status_id : string;
}

export interface DataCatState {
  state_name : string;
  state_id : string;
  country_id : string;
  status_id : string;
}

export interface DataCatCity {
  city_name : string;
  city_id : string;
  state_id : string;
  status_id : string;
}

export interface DataCatCompany {
  checked?: false;
  company_name : string;
  company_id : string;
}
