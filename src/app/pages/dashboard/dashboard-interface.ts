import { TableDataCompany } from '../companies/companies-interface';
import { TableDataQuote } from '../conversion/conversion-interface';

export interface DataTableFilters {
  user: string;
  giro: string;
  campaing: string;
  dateRange: string;
}

export interface DataProductsTable {
  data: TableDataProductsList[]
}

export interface TableDataProductsList {
  companies: string,
  date: string,
  datecountry: string,
}

export interface DataArticlesTable {
  data: TableDataArticlesList[]
}

export interface TableDataArticlesList {
  companies: string,
  date: string,
  datecountry: string,
}

export interface DataCompaniesStatistics {
  data: TableDataCompaniesStatisticsList[]
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
  data: TableDataClientsList[]
}

export interface TableDataClientsList {
  client: string,
  amount: string,
}

export interface DataCountryStatisticsTable {
  data: TableDataCountryList[]
}

export interface TableDataCountryList {
  country: string,
  amount: string,
}

export interface DataCampaingsHistoryTable {
  data: TableDataCampaingsHistoryList[]
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
  data: TableDataGoalsList[]
}

export interface TableDataGoalsList {
  goal: string,
  taskAsigned: string,
  agent: string,
}

export interface DataGoalsHistoryTable {
  data: TableDataGoalsHistoryList[]
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
  data: TableDataGoalsAgentsList[]
}

export interface TableDataGoalsAgentsList {
  agent: string,
  rol: string,
  progress: string,
  ip: string,
  extension: string,
}

export interface DatsStatics {
  cotizaciones_abiertas_c: number;
  cotizaciones_abiertas_l: number;
  cotizaciones_descartadas_c: number;
  cotizaciones_descartadas_l: number;
  total_cotizaciones_abiertas: number;
  total_cotizaciones_descartadas: number;
  total_cerradas_ventas: number;
  cotizaciones_cerradas_ventas: number;
  empresas_mas_compran: TableDataCompany[]
  empresas_por_fase: {
    company_phase: string
    company_phase__phase_name: string
    total: number
  }[];
  empresas_por_giro: {
    business: any
    business_name: any
    total: number
  }[]
  ranking_empresas_mas_compran: TableDataCompany[]
  ranking_empresas_por_pais: {
    company__country__country_name: string;
    company__country_id: string;
    country_name: string;
    quote_total_sum: string
  }[]
  ultimas_empresas: TableDataCompany[]
}

export interface DatsStaticsMapper {
  open: {
    lead: number;
    client: number;
    total: number;
  },
  discarded: {
    lead: number;
    client: number;
    total: number;
  },
  closedQuotesSales: number;
  totalClosedQuotesSales: number;
  latestRegisteredCompanies: {
    name: string;
    date: string;
    country: string;
  }[];
  customersPurchasedMost: {
    name: string;
    amount: string;
  }[];
  countriesBuyMost: {
    name: string;
    amount: string;
  }[];
  dataStatus: {
    name: string;
    total: number;
  }[];
  categories: {
    name: string;
    total: number;
  }[];
}


export interface DatsPipeLine {
  suma_sales: number;
  suma_quote_leads: number;
  suma_quote_clients: number;
  quotes_clients : TableDataQuote[]
  quotes_leads : TableDataQuote[] | any
  quotes_sales : TableDataQuote[]
  quotes_sales_lead? : TableDataQuote[]
}
