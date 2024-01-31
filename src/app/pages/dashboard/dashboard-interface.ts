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
   country: string,
   amount: string,
}

export interface DataCampaingsHistoryTable {
  data : TableDataCampaingsHistoryList[]
}

export interface TableDataCampaingsHistoryList {
   country: string,
   amount: string,
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