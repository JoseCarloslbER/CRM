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

export interface DataTableFilters {
  user : string;
  giro   : string;
  campaing : string;
  dateRange: string;
}

export interface DataProductsTable {
   data : TableDataProductsList[]
}

export interface TableDataProductsList {
    companies: string,
    date: string,
    datecountry: string,
}

export interface DataArticlesTable {
   data : TableDataArticlesList[]
}

export interface TableDataArticlesList {
    companies: string,
    date: string,
    datecountry: string,
}

export interface DataCompaniesStatistics {
  data : TableDataCompaniesStatisticsList[]
  status: any[]
  categories: any[]
  rankingCountrys: any[]
}


export interface TableDataCompaniesStatisticsList {
    companies: string,
    date: string,
    datecountry: string,
}

export interface DataClientsStatisticsTable {
  data : TableDataClientsList[]
}

export interface TableDataClientsList {
   client: string,
   amount: string,
}

export interface DataCountryStatisticsTable {
  data : TableDataCountryList[]
}

export interface TableDataCountryList {
   country: string,
   amount: string,
}

export interface DataCampaingsHistoryTable {
  data : TableDataCampaingsHistoryList[]
}

export interface TableDataCampaingsHistoryList {
   name: string,
   type: string,
   period: string,
   companies: string,
   amountInvested: string,
   results: string,
   quotes: string,
   sells: string,
}

export interface DataGoalsTable {
  data : TableDataGoalsList[]
}

export interface TableDataGoalsList {
   goal: string,
   taskAsigned: string,
   agent: string,
}

export interface DataGoalsHistoryTable {
  data : TableDataGoalsHistoryList[]
}

export interface TableDataGoalsHistoryList {
   name: string,
   taskAsigned: string,
   perdio: string,
   agent: string,
   compliance: string,
   bonusAchieved: string,
}

export interface DataGoalAgentsTable {
  data : TableDataGoalsAgentsList[]
}

export interface TableDataGoalsAgentsList {
   agent: string,
   rol: string,
   progress: string,
   ip: string,
   extension: string,
}