import * as entityGeneral from '../../shared/interfaces/general-interface';
import { TableDataCampaing } from '../catchment/catchment-interface';

export interface TableDataCompany {
  company_id: string;
  company_type: entityGeneral.DataCatCompanyType;
  business: entityGeneral.DataCatBusiness;
  owner_user: entityGeneral.Owner;
  country:entityGeneral.DataCatCountry;
  state: entityGeneral.DataCatState;
  city: entityGeneral.DataCatCity;
  platform: entityGeneral.DataCatPlatform;
  company_size: entityGeneral.DataCatCompanySize;
  company_phase: entityGeneral.DataCatCompanyPhase
  campaing?: TableDataCampaing
  last_activity: entityGeneral.DataCatLastActivity
  company_name: string;
  slug: string;
  tax_id_number: string;
  email: string;
  phone_number: string;
  web_page: string;
  address: string;
  logo: string;
  amout_quotes: string;
  amout_sales: string;
  total_quotes: string;
  total_sales: string,
  comments: string;
  register_date: string;
  register_user: string;
  company_contacts: Contacts[]
  camaping: {
    campaing_name: string
  };
}
export interface TableDataCompanyMapper {
  id:string
  conpanyName : string;
  logo : string;
  status : string;
  country : string;
  origin : string;
  category : string;
  business : string;
  lastContactDate : string;
  history : string;
  campaing : string;
  quotes : {
    amount : string;
    totalAmount : string;
  }
  sales : {
    amount : string;
    totalAmount : string;
  }
}
export interface Contacts {
  contact_id: string;
  full_name: string;
  position: string;
  email: string;
  movil_phone: string;
  local_phone: string;
  ext: string;
  company: string;
}

export interface PostDataCompany {
  company_type: string;
  business: string;
  owner_user: string;
  country: string;
  state: string;
  city: string;
  platform: string;
  company_size: string;
  company_phase: string;
  company_name: string;
  slug: string;
  tax_id_number: string;
  email: string;
  phone_number: string;
  web_page: string;
  address: string;
  amout_quotes: string;
  amout_sales: string;
  total_quotes: string;
  total_sales: string;
  comments: string;
  register_date: string;
  register_user: string;
}

export interface GetDataCompanyMapper {
  id: string
  company_name: string
  platform: string
  phone_number: string
  email: string
  tax_id_number: string
  state: string
  owner_user: string
  country: string
  business: string
  city: string
  address: string
  company_type: string
  company_size: string
  web_page: string
  comments: string
}

export interface CompanyContacts {
  full_name : string;
  position? : string;
  email? : string;
  movil_phone : string;
  local_phone? : string;
  ext? : string;
}
