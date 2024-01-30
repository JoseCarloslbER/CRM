
export interface DataTableFilters {
  status : string;
  giro   : string;
  campaing : string;
  dateRange: string;
}

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

export interface DataTableAgents {
   data : TableDataAgentsList[]
}

export interface TableDataAgentsList {
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

export interface DataTableCompanies {
   data : TableDataCompaniesList[]
}

export interface TableDataCompaniesList {
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
