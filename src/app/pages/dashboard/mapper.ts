import moment from 'moment';
import * as entity from './dashboard-interface';

export class Mapper {
	static getDataStaticsMapper(response : entity.DatsStatics) : entity.DatsStaticsMapper {
		return {
			open: {
				lead   : response?.cotizaciones_abiertas_l,
				client : response?.cotizaciones_abiertas_c,
				total  : response?.total_cotizaciones_abiertas
			},
			discarded: {
				lead   : response?.cotizaciones_descartadas_l,
				client : response?.cotizaciones_descartadas_c,
				total  : response?.total_cotizaciones_descartadas
			},
			closedQuotesSales : response?.cotizaciones_cerradas_ventas,
			totalClosedQuotesSales : response?.total_cerradas_ventas,
			latestRegisteredCompanies: response.ultimas_empresas.map(data => {
				return {
					name : data?.company_name || '-',
					date : data?.register_date || '-',
					country : data?.country?.country_name || '-' 
				}
			}),
			customersPurchasedMost: response.empresas_mas_compran.map(data => {
				return {
					name : data?.company_name || '-',
					amount: '$' + parseFloat(data.total_sales).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				}
			}),
			countriesBuyMost: response.ranking_empresas_por_pais.map(data => {
				return {
					name : data?.country_name ||'-',
					amount: '$' + parseFloat(data.quote_total_sum).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				}
			}),
			dataStatus: response.empresas_por_fase.map(data => {
				return {
					name : data?.company_phase__phase_name ||'-',
					total : data?.total
				}
			}),
			categories: response.empresas_por_giro.map(data => {
				return {
					name : data?.business_name ||'-',
					total : data?.total
				}
			})
		}
	};


	static getDataPipelineMapper(response : entity.DatsPipeLine) {
		console.log(response);

		const firstQuoteClient:any = [response?.quotes_leads[0].quote_options[0]];
		console.log(firstQuoteClient);
		
		return {

			totalSales : response?.suma_sales,
			totalQuoteLeads : response?.quotes_leads,
			totalQuoteClients : response?.quotes_clients,
			quoteClients : response.quotes_clients.map(data => {
				return {
					companyName : data?.company.company_name ||'-',
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`,
					status : data?.company.status?.description ||'-',
				}
			}),
			quoteLeads : response.quotes_leads.map(data => {
				return {
					companyName : data?.company.company_name ||'-',
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`,
					status : data?.company.status?.description ||'-',
					quoteNumber : data?.quote_number ||'-',
					optionOne : firstQuoteClient.map(optionData => {
					console.log(optionData);
					// return {
					// 	type: optionData.type_price === 1 ? 'Normal' : 'Promoción',
					// 	places : optionData.option_products[0].quantity,
					// 	amount: '$' + parseFloat(optionData.total).toLocaleString('en-US', {
					// 		minimumFractionDigits: 2,
					// 		maximumFractionDigits: 2
					// 	}),
					// 	date: moment(optionData.deadline).format('YYYY-MM-DD')
					// }
					})
				}
			}),

			quoteSales : response?.quotes_clients,
		}
	};
}
