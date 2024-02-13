import * as entity from './catchment-interface';

export class Mapper {
	static getDataTableCampaingMapper(response: entity.TableDataCampaingList[]) : entity.TableDataCampaingListMapper[] {
		console.log(response[0]);
		
		let dataList = [];

		response.forEach((data: entity.TableDataCampaingList): void => {
			dataList.push({
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
				agents: {name : `${data.owner_user.first_name} ${data.owner_user.last_name}`, alls : data.users, main: data.owner_user } ,
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
}
