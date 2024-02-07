export interface DataTableFilters {
  status : string;
  giro   : string;
  campaing : string;
  dateRange: string;
}

export interface DataCatalogTypeList {
   campaign_type_id : string;
   campaign_type_name : string;
   status_id : string;
}

export interface DataCampaingTable {
   data : TableDataCampaingList[]
}

export interface TableDataCampaingList {
  amount_invested: string,
  average_quote: string,
  average_sales: string,
  description: string,
  created_at: string,
  start_date: string,
  end_date: string,
  goal_amount: string,
  total_amount: string,
  update_at: string,
  goal_number_quotes: number,
  goal_number_sales: number,
  goal_total_companies: number,
  goal_total_responses: number,
  number_quotes_client: number,
  number_quotes_lead: number,
  register_date: number,
  total_companies: number,
  total_sales: number,
  status_id: string,
  product_category_id: string,
  owner_user_id: string,
  campaign_id: string,
  campaign_type_id: string,

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
