import * as entity from './management-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataActivities[]) : entity.TableDataActivitiesMapper[] {
		let dataList :entity.TableDataActivitiesMapper[] = [];

		response.forEach((data: entity.TableDataActivities): void => {
			dataList.push({
				id: data?.activity_id || '-',
				nameLogo : {name : data.company.company_name, logo : data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo},
				activity_date: data?.activity_date || '-',
				activity_hour: data?.activity_hour || '-',
				description: data?.description || '-',
				process: data?.process || '-',
				register: data.activity_date + ' ' + data.activity_hour,
				finally: data?.end_date || '-',
				activityType: data?.type_activity?.activity || '-',
				agent: data.user.first_name && data.user.last_name ? data.user?.first_name.toUpperCase() + ' ' + data.user?.last_name.toUpperCase() : data.user?.username.toUpperCase()
			});
		});

		return dataList
	}

	static getDataActivitiesMapper(response) :any {
	// static editDataTableCompanyMapper(response: entity.TableDataCompany) : entity.GetDataCompanyMapper {
		return {
			
		}
	};
}
