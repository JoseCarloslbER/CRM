import * as entityGeneral from '../../shared/interfaces/general-interface';
import { TableDataCampaing } from '../catchment/catchment-interface';
import { TableDataCompany } from '../companies/companies-interface';

export interface TableDataQuote {
  quote_id: string;
  quote_options: QuoteOption[]
  company: TableDataCompany;
  contact: entityGeneral.DataCatQuoteContact;
  user: entityGeneral.User;
  campaign: entityGeneral.DataCatCampaing | null;
  payment_method: entityGeneral.DataCatPaymentMethod;
  status: {
    description: string;
    module: boolean
    status_id: string;
  };
  invoice_status: string | null;
  quote_number: number;
  tax_include: number;
  register_date: string;
  payment_date: string | null;
  invoice_date: string | null;
  money_in_account: boolean;
  quote_total: string;
}
export interface TableDataQuoteMapper {
  id: string;
  dateAndHour: string;
  actionName: string;
  closeSale: object;
  conpanyName: {
    id: string;
    name: string;
    logo: string;
  };
  status: string;
  stateCountry: string;
  information: {
    name: string;
    quoteNumber: number;
  };
  totalPrice: {
    name: string;
    expire: string;
    total: string;
  }[];
  products: {
    type: string;
    places: number;
    product: string[];
    total: string;
  }[];
  actions: string[]
}

export interface PostDataCompany {
  company_type: string;
  business: string;
  owner_user: string;
  country: string;
}
export interface GetDataCompanyMapper {
  id: string
  company_name: string
  platform: string
}

export interface CompanyContacts {
  full_name: string;
  position?: string;
  email?: string;
  movil_phone: string;
  local_phone?: string;
  ext?: string;
}

export interface QuoteOption {
  quote_option_id: string;
  type_price: number,
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  deadline: string;
  selected: boolean;
  quote: string;
  status: string;
  option_products: OptionProduct[]
}

export interface OptionProduct {
  option_product_id: string,
  product: {
    product_id: string,
    price: any,
    discount: any,
    product_category: entityGeneral.DataCatProductCategory;
    country: entityGeneral.DataCatCountry;
    code: string;
    name: string;
    list_price: string;
    link: any;
    image: string;
  },
  quantity: 1,
  price: "2500.0000",
  total: "2500.0000",
  quote_option: "3b643f95-9944-4f20-8a93-e38fa2e6c781",
  status: "00d91403-ffb8-44ca-ab98-96e899925216"
}

export interface QuoteProducts {
  full_name : string;
  position? : string;
  email? : string;
  movil_phone : string;
  local_phone? : string;
  ext? : string;
}
