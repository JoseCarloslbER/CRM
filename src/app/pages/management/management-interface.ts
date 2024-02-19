import * as entityGeneral from '../../shared/interfaces/general-interface';
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
  campaign: string;
  status: string;
}

export interface TableDataActivitiesMapper {
  id: string
  nameLogo: object
  activity_date: string
  activity_hour: string
  description: string
  process: string
  register: string
  finally: string
  activityType: string
  agent: string
}

export interface GetDataActivitiesMapper {
  activity_id: string;
  description: string;
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

