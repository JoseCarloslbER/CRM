import * as entity from './management-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataActivities[]) : entity.TableDataActivitiesMapper[] {
		let dataList :entity.TableDataActivitiesMapper[] = [];

		response.forEach((data: entity.TableDataActivities): void => {
			dataList.push({
				id: data?.activity_id || '-',
				nameLogo : {name : data?.company?.company_name || '-', logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`},
				activity_date: data?.activity_date || '-',
				activity_hour: data?.activity_hour || '-',
				description: data?.description || '-',
				process: data?.process || '-',
				register: data.activity_date + ' ' + data.activity_hour,
				endDate: data?.end_date || '-',
				finish: data?.finish || false,
				activityType: data?.type_activity?.activity || '-',
				agent: data?.user?.first_name && data?.user?.last_name ? data.user?.first_name.toUpperCase() + ' ' + data.user?.last_name.toUpperCase() : data.user?.username.toUpperCase()
			});
		});

		return dataList
	}

	static getDataMapper(response : entity.TableDataActivities) : entity.GetDataActivitiesMapper {
		
		return {
			id: response?.activity_id || '-',
			activity_date : response?.activity_date || '-',
			activity_hour : response?.activity_hour || '-',
			company : response?.company?.company_id || '-',
			companyName : response?.company?.company_name || '-',
			user : response?.user?.id || '-',
			type_activity : response?.type_activity?.type_activity_id || '-',
			campaign : response?.campaign?.campaign_id || '-',
			description : response?.description || '-'
		}
	};
}
