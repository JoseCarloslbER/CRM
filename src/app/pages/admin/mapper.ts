import * as entity from './admin-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataUsers[]) : entity.TableDataUsersMapper[] {
		let dataList : entity.TableDataUsersMapper[] = [];

		response.forEach((data: any): void => {
			dataList.push({
				id: data?.id || '-',
				userName : `${data?.first_name && data?.last_name ? data.first_name.toUpperCase() + ' ' + data.last_name.toUpperCase() : data.username.toUpperCase() }`,
				logo : data?.logo ? data?.logo.includes('default') ? `../../../assets/images/user-default.png` : data?.logo : `../../../assets/images/user-default.png`,
				role: data?.user_rol?.rol_name || '-',
				email: data?.email || '-',
				ip: data?.voice_identifier || '-',
				ext: data?.ext || '-',
				idSlack : data.user_id_slack
			});
		});

		return dataList
	}

	static getDataUserMapper(response: any): any {
		return {
			id: response?.id,
			username: response?.username || '-',
			first_name: response?.first_name || '-',
			last_name: response?.last_name || '-',
			email: response?.email || '-',
			phone_number: response?.phone_number || '-',
			voice_identifier: response?.voice_identifier || '-',
			user_id_slack : response?.user_id_slack  || '-',
			user_rol : response?.user_rol?.rol_id  || '-',
			messagePassword : 'Actualizar contraseña',
		}
	};
}