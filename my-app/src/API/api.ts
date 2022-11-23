import axios from "axios"

export async function createFile(parentId: number | null, rowName: string, userId: number) {
	return await axios.post(`http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/create`,
		{
			parentId: parentId,
			rowName: rowName,
			salary: 0,
			mimExploitation: 0,
			machineOperatorSalary: 0,
			equipmentCosts: 0,
			estimatedProfit: 0,
			mainCosts: 0,
			materials: 0,
			overheads: 0,
			supportCosts: 0,
		})
}
export function updateFile(FileId: number, userId: number, newName: string) {
	axios.post(`http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/${FileId}/update`,
		{
			equipmentCosts: 0,
			estimatedProfit: 0,
			machineOperatorSalary: 0,
			mainCosts: 0,
			materials: 0,
			mimExploitation: 0,
			overheads: 0,
			rowName: newName,
			salary: 0,
			supportCosts: 0,
		})
}
export function deleteFile(FileId: number, userId: number) {
	return axios.delete(`http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/${FileId}/delete`)
}