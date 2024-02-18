import * as entity from './catchment-interface';

export class Mapper {
	static getDataTableCampaingMapper(response: entity.TableDataCampaing[]) : entity.TableDataCampaingMapper[] {
		let dataList :entity.TableDataCampaingMapper[] = [];

		response.forEach((data: entity.TableDataCampaing): void => {
			dataList.push({
				id: data.campaign_id,
				dateStartEnd: {start: data.start_date, end: data.end_date},
				codeAndname: {code: data.campaign_code, name: data.campaign_name},
				companyType : data.campaign_type.campaign_type_name,
				totalCompanies : data.total_companies,
				totalSalesAmount: {
					amount: data.total_sales, 
					totalAmount: '$' + parseFloat(data.total_amount).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				amounInvested : '$' + parseFloat(data.amount_invested).toLocaleString('en-US', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}),
				agents: {name : `${data.owner_user.first_name && data.owner_user.last_name ? data.owner_user?.first_name.toUpperCase() + ' ' + data.owner_user?.last_name.toUpperCase() : data.owner_user?.username.toUpperCase() }`, alls : data.users, main: data.owner_user } ,
				companiesMain : { amount : data.companies.length, alls : data.companies },
				quotesMade : { 
					left : {
						amount: data.number_quotes_lead,
						totalAmount: '$' + parseFloat(data.amout_quotes_lead).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					},
					right : {
						amount: data.number_quotes_client,
						totalAmount: '$' + parseFloat(data.amout_quotes_client).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					} 
				} 
			});
		});

		return dataList
	}
	
	static editDataTableCampaingMapper(response: entity.TableDataCampaing) : entity.GetDataCampainMapper {
		return {
			id: response.campaign_id,
			campaign_code : response.campaign_code,
			campaign_name : response.campaign_name,
			amount_invested : response.amount_invested,
			campaign_type : response.campaign_type.campaign_type_id,
			owner_user : response.owner_user.id,
			users : response.users.map(data => data.user.id),
			start_date : response.start_date,
			end_date : response.end_date,
			product_category : response.product_category.product_category_id,
			description : response.description,
			goal_total_companies : response.goal_total_companies,
			goal_total_responses : response.goal_total_responses,
			goal_number_quotes : response.goal_number_quotes,
			goal_number_sales : response.goal_number_sales,
			goal_amount : response.goal_amount,
			companiesSelected : response.companies.map(data => data.company),
			formCompanies : {
				companies : response.companies.map(data => data.company.company_id)
			}
		}
	};
}
