// CATALOGS
 export interface DataCatBusiness {
   business_name : string;
   business_id : string;
   status_id : string;
 }

 export interface DataCatType {
  campaign_type_id : string;
  campaign_type_name : string;
  status_id : string;
}
 
 // END CATALOGS

export interface DataTableFilters {
  status : string;
  giro   : string;
  campaing : string;
  dateRange: string;
}

export interface TableDataCampaingList {
  campaign_code: string;
  campaign_name: string;
  amount_invested: string;
  average_quote: string;
  average_sales: string;
  description: string;
  created_at: string;
  start_date: string;
  end_date: string;
  goal_amount: string;
  total_amount: string;
  update_at: string;
  amout_quotes_client: string;
  amout_quotes_lead: string;
  goal_number_quotes: number;
  goal_number_sales: number;
  goal_total_companies: number;
  goal_total_responses: number;
  number_quotes_client: number;
  number_quotes_lead: number;
  register_date: number;
  total_companies: number;
  total_sales: number;
  status_id: string;
  product_category_id: string;
  owner_user_id: string;
  campaign_id: string;
  campaign_type_id: string;
  users : User[];
  companies : Company[];
  product_category : Product[];
  owner_user: Owner;
  campaign_type: Campaing;
  rol: Rol;
}

export interface TableDataCampaingListMapper {
  dateStartEnd :  {
    start : string;
    end : string;
  };
  codeAndname : object;
  companyType : string;
  totalCompanies : object;
  totalSalesAmount : object;
  amounInvested : string;
  agents : {
    name:string;
    alls:any[]
  };
  companiesMain : {
    amount:string;
    alls:any[];
  };
  quotesMade : {
    left : {
      amount: string
      totalAmount: string
    }
    right : {
      amount: string
      totalAmount: string
    }
  };
}
export interface User {
  campaign : string;
  campaign_user_id : string;
  status : string;
}

export interface Company {
  campaign : string;
  company : any;
  campaign_company_id : string;
  status : string;
  total_quote : string;
  total_sale : string;
}

export interface Product {
  category_name : string;
  description : any;
  product_category_id : string;
}

export interface Owner {
  id : string;
  date_joined : string;
  email : string;
  username : string;
  first_name : string;
  last_name : string;
  last_access : string;
  last_login : string;
  phone_number : string;
  profile_picture : string;
  voice_identifier : string;
}

export interface Campaing {
  campaign_type_name : string;
  campaign_type_id : string;
}

export interface Rol {
  rol_name : string;
  rol_id : string;
  permissions : any;
}

export interface DataAgentsTable {
   data : TableDataAgentsList[]
}

export interface TableDataAgentsList {
    agent: string,
    rol: string,
    ip: string,
    extension: string,
}

export interface DataTableCompanies {
   data : TableDataCompaniesList[]
}

export interface TableDataCompaniesList {
    company: string,
    contact: string,
    status: string,
    
}
