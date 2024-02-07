// CATALOGS
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

export interface DataCatCountry {
  country_name : string;
  country_id : string;
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

export interface DataCatBusiness {
  business_name : string;
  business_id : string;
  status_id : string;
}


// END CATALOGS


export interface DataTable {
   data : TableDataList[]
}

export interface TableDataList {
    country: string,
    category: string,
    twist: string,
    campaign: string,
    quotes: [
      {
        up: string,
        bottom: string,
      }
    ],

    sales: [
      {
        up: string,
        bottom: string,
      }
    ],

    history: string,
    origin: string,
    lastContactDate: string,
}

export interface DataTableFilters {
  status : string;
  giro   : string;
  campaing : string;
  dateRange: string;
}
