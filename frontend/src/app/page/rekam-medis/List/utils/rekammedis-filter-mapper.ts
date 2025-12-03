import { PaginationType } from '../../../../common/type';
import { StateType } from '../hook/rekammedis.store';

export interface FilterParams {
	params: {
		sort?: string;
		order_by?: string;
		status?: string;
		search?: string;
		page?: number;
		limit?: number;
	};
}

export const filterMapper = (
	filters: Partial<StateType['filters']> &
		Partial<StateType['pagination']> & {
			search?: string;
		}
): FilterParams => {
	return {
		params: {
			search: filters.search,
			page: filters.currentPage,
			limit: filters.limit,
		},
	};
};
