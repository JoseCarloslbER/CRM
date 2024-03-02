import * as entityGeneral from '../../shared/interfaces/general-interface';
import { TableDataCompany } from '../companies/companies-interface';

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

export interface DatsStatics {
  cotizaciones_abiertas_c :number;
  cotizaciones_abiertas_l :number;
  cotizaciones_descartadas_c :number;
  cotizaciones_descartadas_l :number; 
  total_cotizaciones_abiertas :number; 
  total_cotizaciones_descartadas :number; 
  total_cerradas_ventas :number; 
  cotizaciones_cerradas_ventas :number;
  empresas_mas_compran: TableDataCompany[]



  empresas_por_fase: {
    company_phase : string
    company_phase__phase_name : string
    total : number
  }[];
  empresas_por_giro : {
    business:any
    business_name:any
    total:number
  }[]
  ranking_empresas_mas_compran : TableDataCompany[] 
  ranking_empresas_por_pais : TableDataCompany[] 
  ultimas_empresas : TableDataCompany[] 

}


