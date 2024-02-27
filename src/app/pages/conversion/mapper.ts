import { forEach } from 'lodash';
import * as entity from './conversion-interface';
import moment from 'moment';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataQuote[]) : entity.TableDataQuoteMapper[] {
		let dataList :entity.TableDataQuoteMapper[] = [];

		let options:any[] = []
		
		response.forEach((data: entity.TableDataQuote): void => {
			dataList.push({
				id: data?.quote_id || '-',
				// dateAndHour : moment(data.register_date).format('YYYY-MM-DD'),
				dateAndHour : moment(data.register_date).format('YYYY-MM-DD HH:mm:ss'),
				conpanyName : {
					id : data?.company?.company_id || '-', 
					name : data?.company?.company_name || '-', 
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`},
				status: data?.company?.company_phase.phase_name || '-',
				stateCountry : data?.company?.country?.country_name || '-',
				information: {
					name : data?.status?.description || '-',
					quoteNumber : data?.quote_number || 0
				},
				totalPrice: data.quote_options.map((data, index) => {
						return {
							name : `OP${index + 1}:`,
							expire : moment(data.deadline).format('YYYY-MM-DD'),
							total: '$' + parseFloat(data.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						}
				}),

				products: data.quote_options.map(option => {
					const total = option.option_products.reduce((acc, product) => acc + parseFloat(product.total), 0);
					const places = option.option_products.reduce((acc, product) => acc + product.quantity, 0);
					const productNames = option.option_products.map(product => product.product?.name || '-');
				  
					return {
					  type: option.type_price === 1 ? 'Normal' : 'Promoción',
					  places: places,
					  product: productNames,
					  total: '$' + total.toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					  }),
					};
				  }),
				actions: data?.company?.company_phase?.phase_name == 'Prospecto' && data?.status?.description == 'Creado'  ? ['Aceptar'] : 
				data?.company?.company_phase?.phase_name == 'Cliente' && data?.status?.description == 'Aceptada'  ? ['Rechazar', 'Cancelar', 'Cerrar como venta'] : [],
				actionName: data?.status?.description,
				
				closeSale: data.quote_options.map((dataClose, index) => {
					const total = dataClose?.option_products?.reduce((acc, product) => acc + parseFloat(product?.total), 0);
					const places = dataClose?.option_products?.reduce((acc, product) => acc + product?.quantity, 0);
					const productNames = dataClose?.option_products?.map(product => product?.product?.name || '-');
				
					return {
						company: {
							company_name: data?.company?.company_name || '-',
							tax_id_number: data?.company?.tax_id_number || '-'
						},
						totalPrice: {
							id : dataClose?.quote_option_id,
							name: `OP${index + 1}:`,
							expire: moment(dataClose.deadline).format('YYYY-MM-DD'),
							total: '$' + parseFloat(dataClose.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						},
						product: {
							type: dataClose?.type_price === 1 ? 'Normal' : 'Promoción',
							places: places,
							products: productNames,
							total: '$' + total.toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
						}
					};
				})

			});
		});

		return dataList
	}

	static editDataTableCompanyMapper(response: any) {
		return {
			id: response?.company_id,
			company_name: response?.company_name,
			platform: response?.platform?.platform_id,
			phone_number: response?.phone_number,
			email: response?.email,
			tax_id_number: response?.tax_id_number,
			state: response?.state.state_id,
			owner_user: response?.owner_user.id,
			country: response?.country?.country_id,
			business: response?.business?.business_id,
			city: response?.city.city_id,
			address: response?.address,
			company_type: response?.company_type?.company_type_id,
			company_size: response?.company_size?.company_size_id,
			web_page: response?.web_page,
			comments: response?.comments
		}
	};
	
	
}
