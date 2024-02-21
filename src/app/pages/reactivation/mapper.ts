import * as entity from './reactivation-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataCalls[]) : entity.TableDataCallsMapper[] {
	
		let dataList :entity.TableDataCallsMapper[] = [];

		response.forEach((data: entity.TableDataCalls): void => {
			dataList.push({
				id: data?.activity_id || '-',
				nameLogo : {name : data?.company?.company_name || '-', logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`},
				camping : { 
					name : data.campaign?.campaign_name || '-', 
					campaingData : {
						campaign_name: data.campaign.campaign_name,
						goal_total_companies: data.campaign.goal_total_companies,
						goal_total_responses: data.campaign.goal_total_responses,
						goal_number_quotes: data.campaign.goal_number_quotes,
						goal_number_sales: data.campaign.goal_number_sales,
						goal_amount: data.campaign.goal_amount,
						amount_invested: data.campaign.amount_invested,
						start_date: data.campaign.start_date,
						end_date: data.campaign.end_date,
						total_companies: data.campaign.total_companies,
						number_quotes_lead: data.campaign.number_quotes_lead,
						number_quotes_client: data.campaign.number_quotes_client,
						total_sales: data.campaign.total_sales,
						total_amount: data.campaign.total_amount,
						average_quote: data.campaign.average_quote,
						average_sales: data.campaign.average_sales,
						companies: data.campaign.companies.filter(data=> data.response)
					} 
				},
				dueDate: data?.end_date || '-',
				expirationTime: data?.activity_hour || '-',
				user: data?.user?.first_name && data?.user?.last_name ? data.user?.first_name.toUpperCase() + ' ' + data.user?.last_name.toUpperCase() : data.user?.username.toUpperCase(),
				comments: data?.description || '-',
			});
		});

		return dataList
	}
}
