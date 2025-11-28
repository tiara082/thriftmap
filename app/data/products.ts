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
					"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "women-2",
				title: "Atasan / Blouse",
				description:
					"Tampilan detail pakaian atasan wanita (blouse/kemeja) yang bersih.",
				previewUrl:
					"https://images.unsplash.com/photo-1550314472-5eb9fcb8ec0b?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "women-3",
				title: "Aksesoris / Tas",
				description: "Tas wanita estetik di atas meja atau digantung.",
				previewUrl:
					"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
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
					"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
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
					"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "men-2",
				title: "Jaket / Outerwear",
				description: "Pria menggunakan jaket denim atau hoodie, gaya santai.",
				previewUrl:
					"https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "men-3",
				title: "Sepatu",
				description: "Sepatu pria (sneakers/kulit) dengan latar belakang bersih.",
				previewUrl:
					"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "men-4",
				title: "Atasan / Kaos Polos",
				description: "Pria menggunakan kaos polos (T-shirt) putih, gaya minimalis.",
				previewUrl:
					"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "men-5",
				title: "Aksesoris / Jam Tangan",
				description: "Detail jam tangan pria kulit, memberikan kesan premium.",
				previewUrl:
					"https://images.unsplash.com/photo-1523170335684-f042f1ba670b?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "men-6",
				title: "Celana Pria",
				description: "Pria menggunakan celana bahan/chinos (potongan lower body).",
				previewUrl:
					"https://images.unsplash.com/photo-1552374196-c4e7ffc6441b?auto=format&fit=crop&w=800&q=80",
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
					"https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "kids-2",
				title: "Fashion Anak",
				description: "Anak kecil dengan pakaian kasual yang ceria.",
				previewUrl:
					"https://images.unsplash.com/photo-1503454537688-e6694210ee70?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "kids-3",
				title: "Mainan",
				description: "Mainan anak estetik (kayu/boneka) di lantai atau rak.",
				previewUrl:
					"https://images.unsplash.com/photo-1574220745330-64b1ee5531b9?auto=format&fit=crop&w=800&q=80",
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
					"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-2",
				title: "Alat Tulis Kantor",
				description:
					"Buku catatan, pena, dan laptop di meja kerja (Workspace).",
				previewUrl:
					"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-3",
				title: "Barang Lain / Dekorasi",
				description: "Dekorasi rumah modern (vas bunga/rak).",
				previewUrl:
					"https://images.unsplash.com/photo-1578747214190-1261d4dbae0a?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-4",
				title: "Sepatu Anak",
				description: "Sepatu sneakers kecil untuk balita.",
				previewUrl:
					"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-5",
				title: "Buku / Edukasi",
				description:
					"Anak sedang membaca atau memegang buku cerita berwarna.",
				previewUrl:
					"https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-6",
				title: "Peralatan Bayi",
				description:
					"Botol susu atau peralatan makan bayi yang higienis.",
				previewUrl:
					"https://images.unsplash.com/photo-1589408033453-b0be2b70f464?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-7",
				title: "Elektronik",
				description:
					"Headphone atau speaker bluetooth di atas meja (produk elektronik populer).",
				previewUrl:
					"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-8",
				title: "Buku Umum",
				description: "Tumpukan buku novel atau buku bisnis yang estetik.",
				previewUrl:
					"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
			},
			{
				id: "goods-9",
				title: "Peralatan Rumah Tangga",
				description: "Tanaman hias dalam pot atau lampu meja (Home Decor).",
				previewUrl:
					"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
			},
		],
	},
];

export default productCategories;
