import * as entity from './companies-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataCompany[]) : entity.TableDataCompanyMapper[] {
		let dataList :entity.TableDataCompanyMapper[] = [];

		response.forEach((data: entity.TableDataCompany): void => {
			dataList.push({
				id: data?.company_name || '-',
				logo : data.logo.includes('default') ? `../../../assets/images/default.png` : data.logo,
				conpanyName: data?.company_name || '-',
				status: data.company_phase.phase_name || '-',
				country : data.country?.country_name || '-',
				origin: data?.platform?.platform_name || '-',
				category: data?.company_type.type_name || '-',
				business: data?.business?.business_name || '-',
				campaing: data?.campaing?.campaign_name || '-',
				quotes: {
					amount : data.amout_quotes,
					totalAmount: '$' + parseFloat(data.total_quotes).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				sales: {
					amount : data.amout_sales,
					totalAmount: '$' + parseFloat(data.total_sales).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				lastContactDate : data?.last_activity?.date_contact || '-',
				history : data?.last_activity?.activity_description || '-'
			});
		});

		return dataList
	}

	static editDataTableCompanyMapper(response: entity.TableDataCompany)  {
	// static editDataTableCompanyMapper(response: entity.TableDataCompany) : entity.GetDataCompanyMapper {
		return {
			// id: response.campaign_id,
			// campaign_code : response.campaign_code,
			// campaign_name : response.campaign_name,
			// amount_invested : response.amount_invested,
			// campaign_type : response.campaign_type.campaign_type_id,
			// owner_user : response.owner_user.id,
			// users : response.users.map(data => data.user.id),
			// start_date : response.start_date,
			// end_date : response.end_date,
			// product_category : response.product_category.product_category_id,
			// description : response.description,
			// goal_total_companies : response.goal_total_companies,
			// goal_total_responses : response.goal_total_responses,
			// goal_number_quotes : response.goal_number_quotes,
			// goal_number_sales : response.goal_number_sales,
			// goal_amount : response.goal_amount,
			// companiesSelected : response.companies.map(data => data.company),
			// formCompanies : {
			// 	companies : response.companies.map(data => data.company.company_id)
			// }
		}
	};
	
	
}
