//Принимает строку из цифр, возвращает строку в денежном формате
export default function toMoney(n: string) {
	return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
}