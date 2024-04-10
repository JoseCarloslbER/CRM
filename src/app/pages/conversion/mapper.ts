import * as entity from './conversion-interface';
import moment from 'moment';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataQuoteResponse) : entity.TableDataQuoteMapperResponse {
		let dataList :entity.TableDataQuoteMapper[] = [];

		response.quotes_data.forEach((data: entity.TableDataQuote): void => {
			dataList.push({
				id: data?.quote_id || '-',
				dateAndHour : data.register_date ? moment(data.register_date).format('MM-DD-YYYY HH:mm:ss') : '-', 
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
					logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`
				},
				companyNameMain : data?.company?.company_name || '-', 
				status: data?.company?.company_phase?.phase_name || '-',
				stateCountry : data?.company?.country?.country_name || '-',
				information: {
					name : data?.status?.description || '-',
					quoteNumber : data?.quote_number || 0
				}, 
				totalPrice: data.quote_options.map((data, index) => {
						return {
							name : `OP${index + 1}:`,
							expire : moment(data.deadline).format('MM-DD-YYYY'),
							total: '$' + parseFloat(data.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						}
				}),
				products: data.quote_options.map(option => {
					const places = option.option_products.reduce((acc, product) => acc + product.quantity, 0);
					const productNames = option.option_products.map(product => product.product?.name || '-');
				  
					return {
					  type: option.type_price === 1 ? 'Normal' : 'Promoción',
					  places: places,
					  product: productNames,
					  selected: option.selected,
					  total: '$' + parseFloat(option.total).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					};
				  }),
				actions: data?.status?.status_id == '5fb730e9-3802-461f-a4f3-592ff04c4387' ? ['Aceptar', 'Rechazar'] : 
				data?.status?.status_id == '3944df8e-d359-4569-b712-ea174be69cca' ? ['Rechazar', 'Cancelar', 'Cerrar como venta'] : [],
				status_id: data?.status?.status_id,
				actionStatusId: data?.status?.status_id,
				actionName: data?.status?.status_id,
				closeSale: data.quote_options.map((dataClose, index) => {
					const places = dataClose?.option_products?.reduce((acc, product) => acc + product?.quantity, 0);
					const productNames = dataClose?.option_products?.map(product => product?.product?.name || '-');
				
					return {
						totalPrice: {
							id : dataClose?.quote_option_id,
							name: `OP${index + 1}:`,
							expire: moment(dataClose.deadline).format('MM-DD-YYYY'),
							total: '$' + parseFloat(dataClose.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						},
						product: {
							type: dataClose?.type_price === 1 ? 'Normal' : 'Promoción',
							places: places,
							products: productNames,
							total: '$' + parseFloat(dataClose.total).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
						}
					};
				})
			});
		});

		return {
			dataList,
			totalQuotes: response.total_quotes
		}
	}

	static GetDataTableCompanyMapper(response: entity.TableDataQuote) {
		return {
			id : response.quote_id || '',
			regiterDate : moment(response?.register_date).format('DD-MM-YYYY'),
			quoteNumber : response?.quote_number || '-',
			contact : response?.contact?.contact_id || '',
			user : response?.user?.id || '-',
			campaign : response?.campaign?.campaign_id || '',
			payment_method : response?.payment_method?.payment_method_id || '',
			tax_include : response?.tax_include,
			company : {
				id : response.company?.company_id,
				name: response.company?.company_name,
				logo : response?.company?.logo ? response?.company?.logo.includes('default') ? `../../../assets/images/default.png` : response?.company?.logo : `../../../assets/images/default.png` 
			},
			quoteOptions : response.quote_options.map((data:any) => {
				return {
					id: data?.quote_option_id || '',
					tax : parseFloat(data?.tax,).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					subtotal : parseFloat(data?.subtotal,).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					discount : data?.discount > 0 ?  parseFloat(data?.discount).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}) : null,
					total : parseFloat(data?.total).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					typePrice : data?.type_price,
					date : moment(data.deadline).format('YYYY-MM-DD'),

					totalProducts : data.option_products.reduce((total, item) => {
						const totalNumber = parseFloat(item.total.replace(',', ''));
						return total + totalNumber;
					}, 0),
				
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
