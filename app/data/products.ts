export type Asset = {
	id: string;
	title: string;
	description: string;
	previewUrl: string;
};

export type ProductCategory = {
	id: string;
	category: string;
	subcategories: string[];
	assets: Asset[];
};

export const productCategories: ProductCategory[] = [
	{
		id: "women",
		category: "PAKAIAN WANITA",
		subcategories: ["Dress", "Atasan", "Aksesoris"],
		assets: [
			{
				id: "women-1",
				title: "Dress / Terusan",
				description: "Wanita menggunakan dress dengan tone warna netral/hangat.",
				previewUrl:
					"https://images.unsplash.com/photo-1595777457583-95e059d581b8",
			},
			{
				id: "women-2",
				title: "Atasan / Blouse",
				description:
					"Tampilan detail pakaian atasan wanita (blouse/kemeja) yang bersih.",
				previewUrl:
					"https://images.unsplash.com/photo-1564257631407-4deb1f99d992",
			},
			{
				id: "women-3",
				title: "Aksesoris / Tas",
				description: "Tas wanita estetik di atas meja atau digantung.",
				previewUrl:
					"https://images.unsplash.com/photo-1591561954557-26941169b49e",
			},
			{
				id: "women-4",
				title: "Celana / Jeans",
				description: "Detail tekstur celana jeans wanita yang timeless.",
				previewUrl:
					"https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
			},
			{
				id: "women-5",
				title: "Sepatu Wanita",
				description:
					"Sepatu heels atau flat shoes dengan nuansa elegan.",
				previewUrl:
					"https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
			},
			{
				id: "women-6",
				title: "Sweater / Knitwear",
				description:
					"Wanita menggunakan sweater rajut yang nyaman (cocok untuk musim hujan).",
				previewUrl:
					"https://images.unsplash.com/photo-1576566588028-4147f3842f27",
			},
		],
	},
	{
		id: "men",
		category: "PAKAIAN PRIA",
		subcategories: ["Kemeja", "Jaket", "Sepatu"],
		assets: [
			{
				id: "men-1",
				title: "Kemeja / Formal",
				description: "Pria menggunakan kemeja, gaya smart casual.",
				previewUrl:
					"https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
			},
			{
				id: "men-2",
				title: "Jaket / Outerwear",
				description: "Pria menggunakan jaket denim atau hoodie, gaya santai.",
				previewUrl:
					"https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
			},
			{
				id: "men-3",
				title: "Sepatu",
				description: "Sepatu pria (sneakers/kulit) dengan latar belakang bersih.",
				previewUrl:
					"https://images.unsplash.com/photo-1527010154944-f2241763d806",
			},
			{
				id: "men-4",
				title: "Atasan / Kaos Polos",
				description: "Pria menggunakan kaos polos (T-shirt) putih, gaya minimalis.",
				previewUrl:
					"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
			},
			{
				id: "men-5",
				title: "Aksesoris / Jam Tangan",
				description: "Detail jam tangan pria kulit, memberikan kesan premium.",
				previewUrl:
					"https://images.unsplash.com/photo-1524592094714-0f0654e20314",
			},
			{
				id: "men-6",
				title: "Celana Pria",
				description: "Pria menggunakan celana bahan/chinos (potongan lower body).",
				previewUrl:
					"https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
			},
		],
	},
	{
		id: "kids",
		category: "ANAK & BAYI",
		subcategories: ["Pakaian Bayi", "Mainan", "Fashion Anak"],
		assets: [
			{
				id: "kids-1",
				title: "Pakaian Bayi",
				description: "Baju bayi (onesie) yang tertata rapi (flatlay).",
				previewUrl:
					"https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba",
			},
			{
				id: "kids-2",
				title: "Fashion Anak",
				description: "Anak kecil dengan pakaian kasual yang ceria.",
				previewUrl:
					"https://images.unsplash.com/photo-1621452773781-0f992ee03591",
			},
			{
				id: "kids-3",
				title: "Mainan",
				description: "Mainan anak estetik (kayu/boneka) di lantai atau rak.",
				previewUrl:
					"https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
			},
		],
	},
	{
		id: "goods",
		category: "BARANG DAN PERALATAN",
		subcategories: ["Dapur", "Alat Tulis", "Dekorasi Rumah"],
		assets: [
			{
				id: "goods-1",
				title: "Peralatan Dapur",
				description: "Peralatan masak atau alat makan kayu yang estetik.",
				previewUrl:
					"https://images.unsplash.com/photo-1556910103-1c02745a30bf",
			},
			{
				id: "goods-2",
				title: "Alat Tulis Kantor",
				description:
					"Buku catatan, pena, dan laptop di meja kerja (Workspace).",
				previewUrl:
					"https://images.unsplash.com/photo-1519389950473-47ba0277781c",
			},
			{
				id: "goods-3",
				title: "Barang Lain / Dekorasi",
				description: "Dekorasi rumah modern (vas bunga/rak).",
				previewUrl:
					"https://images.unsplash.com/photo-1583847661867-00593f440667",
			},
			{
				id: "goods-4",
				title: "Sepatu Anak",
				description: "Sepatu sneakers kecil untuk balita.",
				previewUrl:
					"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
			},
			{
				id: "goods-5",
				title: "Buku / Edukasi",
				description:
					"Anak sedang membaca atau memegang buku cerita berwarna.",
				previewUrl:
					"https://images.unsplash.com/photo-1512820790803-83ca734da794",
			},
			{
				id: "goods-6",
				title: "Peralatan Bayi",
				description:
					"Botol susu atau peralatan makan bayi yang higienis.",
				previewUrl:
					"https://images.unsplash.com/photo-1519689680058-324335c77eba",
			},
			{
				id: "goods-7",
				title: "Elektronik",
				description:
					"Headphone atau speaker bluetooth di atas meja (produk elektronik populer).",
				previewUrl:
					"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
			},
			{
				id: "goods-8",
				title: "Buku Umum",
				description: "Tumpukan buku novel atau buku bisnis yang estetik.",
				previewUrl:
					"https://images.unsplash.com/photo-1524578271613-d550eacf6090",
			},
			{
				id: "goods-9",
				title: "Peralatan Rumah Tangga",
				description: "Tanaman hias dalam pot atau lampu meja (Home Decor).",
				previewUrl:
					"https://images.unsplash.com/photo-1485955900006-10f4d324d411",
			},
		],
	},
];

export default productCategories;
