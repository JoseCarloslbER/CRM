import * as entity from './reactivation-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataCalls[]) {
	// static getDataTableMapper(response: entity.TableDataCalls[] : entity.TableDataCallsMapper[] {
		console.log(response[0]);
	
		let dataList : any[] = [];
		// let dataList :entity.TableDataCallsMapper[] = [];

		response.forEach((data: entity.TableDataCalls): void => {
			dataList.push({
				id: data?.activity_id || '-',
				nameLogo : {name : data?.company?.company_name || '-', logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`},
				camping : { name : data.campaign?.campaign_name || '-', campaingData : data?.campaign || null },
				dueDate: data?.end_date || '-',
				expirationTime: data?.activity_hour || '-',
				user: data?.user?.first_name && data?.user?.last_name ? data.user?.first_name.toUpperCase() + ' ' + data.user?.last_name.toUpperCase() : data.user?.username.toUpperCase(),
				assigned: '-',
				// assigned: data?.process || '-',
				comments: data?.description || '-',

			});
		});

		return dataList
	}

	static getDataMapper(response : entity.TableDataCalls) {
	// static getDataMapper(response : entity.TableDataCalls) : entity.GetDataCallsMapper {
		
		console.log(response);
		
		// return {
		// 	id: response?.activity_id || '-',
		// 	activity_date : response?.activity_date || '-',
		// 	activity_hour : response?.activity_hour || '-',
		// 	company : response?.company?.company_id || '-',
		// 	companyName : response?.company?.company_name || '-',
		// 	user : response?.user?.id || '-',
		// 	type_activity : response?.type_activity?.type_activity_id || '-',
		// 	campaign : response?.campaign.campaign_id || '-',
		// 	description : response?.description || '-'
		// }
	};
}
