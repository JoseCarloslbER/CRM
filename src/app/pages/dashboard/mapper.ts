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
		const firstQuoteLead:any = [response?.quotes_leads[0]?.quote_options[0]?.option_products[0]] || [];
		const firstQuoteClient:any = [response?.quotes_clients[0]?.quote_options[0]?.option_products[0]] || [];
		const firstClientSale:any = [response?.quotes_sales[0]?.quote_options[0]?.option_products[0]] || [];
		
		return {
			totalSales: '$' + response?.suma_sales.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalQuoteLeads: '$' + response?.suma_quote_leads.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalClientSales: '$' + response?.suma_quote_clients.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			// totalSaleSales: '$' + response?.suma_quote_.toLocaleString('en-US', {
			// 	minimumFractionDigits: 2,
			// 	maximumFractionDigits: 2
			// }),
			quoteClients : response?.quotes_clients.map(data => {
				return {
					idQuote : data.invoice_date,
					companyName : data?.company.company_name ||'-',
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`,
					status : data?.status?.description ||'-',
					quoteNumber : data?.quote_number || '-',
					moneyAccount: data?.money_in_account,
					optionOne : firstQuoteClient.map(optionData => {
						return {
							listPrice: '$' + parseFloat(optionData?.product?.list_price).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
							platform : response?.quotes_clients[0]?.company?.platform?.platform_name,
							amount: '$' + parseFloat(optionData.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
							places : optionData?.quantity || 0,
							validity : moment(response?.quotes_leads[0].quote_options[0].deadline).format('DD-MM-YYYY')
						}
					})
				}
			}),
			quoteLeads : response?.quotes_leads.map(data => {
				return {
					idQuote : data.invoice_date,
					companyName : data?.company.company_name ||'-',
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`,
					status : data?.status?.description ||'-',
					quoteNumber : data?.quote_number || '-',
					optionOne : firstQuoteLead.map(optionData => {
						return {
							listPrice: '$' + parseFloat(optionData?.product?.list_price).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
							platform : response?.quotes_leads[0]?.company?.platform?.platform_name,
							amount: '$' + parseFloat(optionData.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
							places : optionData?.quantity || 0,
							validity : moment(response?.quotes_leads[0].quote_options[0].deadline).format('DD-MM-YYYY')
						}
					})
				}
			}),
			// leadsSales : response?.quotes_sales_lead.map(data => {
			// 	return {
			// 		idQuote : data.invoice_date,
			// 		companyName : data?.company.company_name ||'-',
			// 		logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`,
			// 		status : data?.status?.description ||'-',
			// 		quoteNumber : data?.quote_number || '-',
			// 		moneyAccount: data?.money_in_account,
			// 		amount: '$' + parseFloat(firstClientSale[0].total).toLocaleString('en-US', {
			// 			minimumFractionDigits: 2,
			// 			maximumFractionDigits: 2
			// 		}),
			// 		optionOne : firstClientSale.map(optionData => {
			// 			return {
			// 				listPrice: '$' + parseFloat(optionData?.product?.list_price).toLocaleString('en-US', {
			// 					minimumFractionDigits: 2,
			// 					maximumFractionDigits: 2
			// 				}),
			// 				platform : response?.quotes_sales[0]?.company?.platform?.platform_name,
			// 				places : optionData?.quantity || 0,
			// 				validity : moment(response?.quotes_leads[0].quote_options[0].deadline).format('DD-MM-YYYY')
			// 			}
			// 		})
			// 	}
			// }),
			clientSales : response.quotes_sales.map(data => {
				return {
					idQuote : data.invoice_date,
					companyName : data?.company.company_name ||'-',
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`,
					status : data?.status?.description ||'-',
					quoteNumber : data?.quote_number || '-',
					moneyAccount: data?.money_in_account,
					amount: '$' + parseFloat(firstClientSale[0].total).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					optionOne : firstClientSale.map(optionData => {
						return {
							listPrice: '$' + parseFloat(optionData?.product?.list_price).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
							platform : response?.quotes_sales[0]?.company?.platform?.platform_name,
							places : optionData?.quantity || 0,
							validity : moment(response?.quotes_leads[0].quote_options[0].deadline).format('DD-MM-YYYY')
						}
					})
				}
			}),
		}
	};
}
