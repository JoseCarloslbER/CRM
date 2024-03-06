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
		
		return {
		}
	};
}
