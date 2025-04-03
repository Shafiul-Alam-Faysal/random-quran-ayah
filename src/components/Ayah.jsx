import { useState } from "react";

const surahAyahs = {
	1: 7,
	2: 286,
	3: 200,
	4: 176,
	5: 120,
	6: 165,
	7: 206,
	8: 75,
	9: 129,
	10: 109,
	11: 123,
	12: 111,
	13: 43,
	14: 52,
	15: 99,
	16: 128,
	17: 111,
	18: 110,
	19: 98,
	20: 135,
	21: 112,
	22: 78,
	23: 118,
	24: 64,
	25: 77,
	26: 227,
	27: 93,
	28: 88,
	29: 69,
	30: 60,
	31: 34,
	32: 30,
	33: 73,
	34: 54,
	35: 45,
	36: 83,
	37: 182,
	38: 88,
	39: 75,
	40: 85,
	41: 54,
	42: 53,
	43: 89,
	44: 59,
	45: 37,
	46: 35,
	47: 38,
	48: 29,
	49: 18,
	50: 45,
	51: 60,
	52: 49,
	53: 62,
	54: 55,
	55: 78,
	56: 96,
	57: 29,
	58: 22,
	59: 24,
	60: 13,
	61: 14,
	62: 11,
	63: 11,
	64: 18,
	65: 12,
	66: 12,
	67: 30,
	68: 52,
	69: 52,
	70: 44,
	71: 28,
	72: 28,
	73: 20,
	74: 56,
	75: 40,
	76: 31,
	77: 50,
	78: 40,
	79: 46,
	80: 42,
	81: 29,
	82: 19,
	83: 36,
	84: 25,
	85: 22,
	86: 17,
	87: 19,
	88: 26,
	89: 30,
	90: 20,
	91: 15,
	92: 21,
	93: 11,
	94: 8,
	95: 8,
	96: 19,
	97: 5,
	98: 8,
	99: 8,
	100: 11,
	101: 11,
	102: 8,
	103: 3,
	104: 9,
	105: 5,
	106: 4,
	107: 7,
	108: 3,
	109: 6,
	110: 3,
	111: 5,
	112: 4,
	113: 5,
	114: 6,
};

export default function RandomAyah() {
	const [ayah, setAyah] = useState(null);

	async function fetchRandomAyah() {
		const randomSurah = Math.floor(Math.random() * 114) + 1;
		const totalAyahs = surahAyahs[randomSurah];
		const randomAyah = Math.floor(Math.random() * totalAyahs) + 1;

		try {
			const res = await fetch(
				`https://api.quran.com/api/v4/verses/by_key/${randomSurah}:${randomAyah}?translations=131`
			);
			const data = await res.json();
			if (!data.verse) throw new Error("Ayah not found");

			setAyah({
				text:
					data.verse.translations[0]?.text.replace(
						/<sup[^>]*>.*?<\/sup>/g,
						""
					) || "Translation not available",
				key: `${randomSurah}:${randomAyah}`,
			});
		} catch (error) {
			console.error("Error fetching Ayah:", error);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 p-5 text-center">
			<h1 className="text-3xl text-white font-bold mb-5">Random Quran Ayah</h1>

			{ayah && (
				<div className="mt-5 p-5 bg-yellow-200 shadow-md rounded-md w-full max-w-md">
					<p className="text-xl font-semibold">{ayah.text}</p>
					<p className="text-stone-700 mt-2">Surah: {ayah.key}</p>
				</div>
			)}
			<button
				onClick={fetchRandomAyah}
				className="px-5 py-2 mt-5 bg-blue-600 text-white rounded-md shadow-md"
			>
				Get Random Ayah
			</button>
		</div>
	);
}
