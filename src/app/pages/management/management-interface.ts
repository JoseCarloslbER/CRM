import * as entityGeneral from '../../shared/interfaces/general-interface';

export interface TableDataActivities {
  activity_id: string;
  description: string;
  activity_date: string;
  activity_hour: string;
  end_date: string;
  finish: boolean;
  process: string;
  document: string;
  company: entityGeneral.DataCatCompany;
  user: entityGeneral.User;
  type_activity: string;
  campaign: string;
  status: string;
}

export interface TableDataActivitiesMapper {
  id:string
  process:string
  activity_hour:string
  activity_date:string
  description:string
  end_date:string
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

