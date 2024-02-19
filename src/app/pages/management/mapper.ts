import * as entity from './management-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataActivities[]) {
	// static getDataTableMapper(response: entity.TableDataActivities[]) : entity.TableDataActivitiesMapper[] {
		let dataList :any[] = [];
		// let dataList :entity.TableDataActivitiesMapper[] = [];

		// response.forEach((data:any): void => {
		response.forEach((data: entity.TableDataActivities): void => {
			dataList.push({
				// id: data?.company_name || '-',
				// logo : data.logo.includes('default') ? `../../../assets/images/default.png` : data.logo,
				activity_date: data?.activity_date || '-',
				activity_hour: data?.activity_hour || '-',
				description: data?.description || '-',
				process: data?.process || '-',
				finally: !data.finish ? '-' : data?.finish || '-'  
			
			});
		});

		return dataList
	}

	static getDataActivitiesMapper(response) :any {
	// static editDataTableCompanyMapper(response: entity.TableDataCompany) : entity.GetDataCompanyMapper {
		return {
			
		}
	};
}
