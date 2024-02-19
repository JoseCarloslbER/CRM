import * as entityGeneral from '../../shared/interfaces/general-interface';
import { TableDataCampaing } from '../catchment/catchment-interface';
import { TableDataCompany } from '../companies/companies-interface';
import { TableDataActivityType } from '../config/config-interface';

export interface TableDataActivities {
  activity_id: string;
  description: string;
  activity_date: string;
  activity_hour: string;
  end_date: string;
  finish: boolean;
  process: string;
  document: string;
  company: TableDataCompany;
  user: entityGeneral.Owner;
  type_activity: TableDataActivityType;
  campaign: TableDataCampaing;
  status: string;
}

export interface TableDataActivitiesMapper {
  dataOrigin:any;
  id: string;
  nameLogo: object
  activity_date: string;
  activity_hour: string;
  description: string;
  process: string;
  register: string;
  endDate: string;
  finish: boolean;
  activityType: string;
  agent: string;
}

export interface GetDataActivitiesMapper {
  id : string;
  activity_date : string;
  activity_hour : string;
  company : string;
  companyName : string;
  user : string;
  type_activity : string;
  campaign : string;
  description : string;
}


export interface PostDataActivities {
  description: string;
  activity_date: string;
  activity_hour: string;
  process: string;
  company: string;
  user: string;
  type_activity: string;
  campaign: string;
  status: string;
}

export interface PatchDataActivities {
  id?: string;
  description: string;
  activity_date: string;
  activity_hour: string;
  process: string;
  company: string;
  user: string;
  type_activity: string;
  campaign: string;
  status: string;
}

