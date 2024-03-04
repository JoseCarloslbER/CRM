import * as entity from './conversion-interface';
import moment from 'moment';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataQuote[]) : entity.TableDataQuoteMapper[] {
		let dataList :entity.TableDataQuoteMapper[] = [];
		response.forEach((data: entity.TableDataQuote): void => {
			
			dataList.push({
				id: data?.quote_id || '-',
				dateAndHour : data.register_date ? moment(data.register_date).format('YYYY-MM-DD HH:mm:ss') : '-', 
				moneyInAccount : data?.money_in_account,
				isBilled: data?.invoice_status?.description.includes('Facturada') ? true : false,
				companyInfo: {
					company_name: data?.company?.company_name || '-',
					tax_id_number: data?.company?.tax_id_number || '-',
					payment_method_id: data?.company?.payment_method?.payment_method_id || '-',
					way_to_pay_id: data?.company?.way_to_pay?.way_to_pay_id || '-',
					payment_condition_id: data?.company?.payment_condition?.payment_condition_id || '-',
					invoice_use_id: data?.company?.invoice_use?.invoice_use_id || '-',
					invoice_status : data?.invoice_status?.status_id || '-'
				},
				companyName : {
					id : data?.company?.company_id || '-', 
					name : data?.company?.company_name || '-', 
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`},
				status: data?.company?.company_phase?.phase_name || '-',
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
				
				  actions: data?.status?.description == 'Creada'  ? ['Aceptar'] : 
						data?.status?.description == 'Aceptada' || data?.status?.description == 'Aprobada' ? ['Rechazar', 'Cancelar', 'Cerrar como venta'] : [],
				
				actionName: data?.status?.description,
				closeSale: data.quote_options.map((dataClose, index) => {
					const total = dataClose?.option_products?.reduce((acc, product) => acc + parseFloat(product?.total), 0);
					const places = dataClose?.option_products?.reduce((acc, product) => acc + product?.quantity, 0);
					const productNames = dataClose?.option_products?.map(product => product?.product?.name || '-');
				
					return {
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
							total: total,
							// total: '$' + total.toLocaleString('en-US', {
							// 	minimumFractionDigits: 2,
							// 	maximumFractionDigits: 2
							// }),
						}
					};
				})

			});
		});

		return dataList
	}

	static editDataTableCompanyMapper(response: entity.TableDataQuote) {
	// static editDataTableCompanyMapper(response: entity.TableDataQuote) : entity.GetDataQuoteMapper {
		let date : string = '';
		let time : string = '';
		
		response.quote_options.forEach(data => {
			date = moment(data.deadline).format('DD-MM-YYYY');
			time = moment(data.deadline, 'HH:mm').format('HH:mm');
		});

		return {
			id : response.quote_id || '-',
			contact : response?.contact?.contact_id || '-',
			user : response?.user?.id || '-',
			campaign : response?.campaign?.campaign_id || '-',
			payment_method : response?.payment_method?.payment_method_id || '-',
			tax_include : response?.tax_include,
			company : {
				id : response.company.company_id,
				name: response.company.company_name
			},
			quoteOptions : response.quote_options.map(data => {
				return {
					id: data?.quote_option_id || '',
					subtotal : data?.subtotal,
					discount : parseFloat(data?.discount).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					total : parseFloat(data?.total).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					typePrice : data?.type_price,
					date : date,
					time : time,

					optionProducts : data?.option_products.map(dataProduct => {
						return {
							id : dataProduct?.option_product_id,
							places : dataProduct?.quantity,
							product : dataProduct?.product?.product_id,
							productName : dataProduct?.product?.name,
							unitPri : parseFloat(dataProduct?.price).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
							total : parseFloat(dataProduct?.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
						}
					})

				}
			})
		}
	};
	
	
}
