import React from 'react';
import { Calendar, ArrowRight, Bookmark } from 'lucide-react';

const ArticlesPage: React.FC = () => {
    const featuredArticle = {
        title: "คู่มือเริ่มต้นการดูแลสัตว์เลี้ยง Exotic: สิ่งที่ต้องรู้ก่อนเริ่ม!",
        category: "แนะนำ",
        author: "ทีมผู้เชี่ยวชาญ",
        date: "29 มกราคม 2026",
        excerpt: "เจาะลึกโลกของสัตว์เลี้ยงเอ็กโซติก ตั้งแต่กิ้งก่าเลโอพาร์ดไปจนถึงนกแก้วมาคอว์ มาเช็กความพร้อมของคุณกันว่าต้องเตรียมตัวอย่างไรบ้าง...",
        image: "https://images.unsplash.com/photo-1510101915077-949f2b3882a8?q=80&w=1470&auto=format&fit=crop"
    };

    const articles = [
        {
            id: 1,
            title: "เทรนด์สัตว์เลี้ยงเอ็กโซติกปี 2026: ทำไมคนรุ่นใหม่ถึงหลงรัก",
            category: "เทรนด์",
            date: "25 มกราคม 2026",
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1469&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "บทสัมภาษณ์: ชีวิตของสัตว์แพทย์ที่ดูแลสัตว์เอ็กโซติกโดยเฉพาะ",
            category: "บทสัมภาษณ์",
            date: "20 มกราคม 2026",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "จัดตู้อควาเรียมสำหรับสัตว์เลื้อยคลานให้พรีเมียม",
            category: "ไลฟ์สไตล์",
            date: "15 มกราคม 2026",
            image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1473&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "การเลือกสีเสื้อผ้าเพื่อเสริมพลังความมั่นใจในทุกโอกาส",
            category: "เลือกซื้อ",
            date: "10 มกราคม 2026",
            image: "https://images.unsplash.com/photo-1539109132332-62a22be29f28?q=80&w=1374&auto=format&fit=crop"
        }
    ];

    return (
        <div className="bg-[#fcfcfc] min-h-screen pb-20">
            {/* Header Section */}
            <header className="max-w-[1440px] mx-auto px-6 md:px-16 pt-12 pb-8 border-b border-gray-100">
                <p className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-4">Journal & Stories</p>
                <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight">บทความและเรื่องราว</h1>
            </header>

            {/* Featured Article */}
            <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-12">
                <div className="relative group cursor-pointer overflow-hidden rounded-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white shadow-sm border border-gray-100 items-center">
                        <div className="aspect-[16/9] lg:aspect-auto h-full overflow-hidden">
                            <img
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                        </div>
                        <div className="p-8 md:p-16 space-y-6">
                            <span className="px-3 py-1 bg-black text-white text-[10px] font-black tracking-widest uppercase">{featuredArticle.category}</span>
                            <h2 className="text-3xl md:text-5xl font-black text-black leading-tight hover:text-red-600 transition-colors">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed font-light line-clamp-3">
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Editor" alt="author" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-black">{featuredArticle.author}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{featuredArticle.date}</p>
                                    </div>
                                </div>
                                <button className="flex items-center space-x-2 text-[11px] font-black tracking-widest hover:translate-x-1 transition-transform">
                                    อ่านต่อ <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Grid */}
            <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-12">
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-black">
                    <h3 className="text-xl font-black tracking-tighter uppercase">Latest Stories</h3>
                    <div className="flex space-x-6">
                        {["All", "Lifestyle", "Trends", "Interviews"].map(cat => (
                            <button key={cat} className="text-[10px] font-black tracking-widest text-gray-400 hover:text-black transition-colors uppercase">{cat}</button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {articles.map((article) => (
                        <div key={article.id} className="group cursor-pointer">
                            <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm mb-6 relative">
                                <img
                                    src={article.image}
                                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    alt={article.title}
                                />
                                <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all">
                                    <Bookmark size={18} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-red-600 tracking-widest uppercase">{article.category}</span>
                                <h4 className="text-lg font-black text-black leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                    {article.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                    <Calendar size={12} />
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="px-12 py-4 bg-white border border-black text-black text-[11px] font-black tracking-[0.3em] hover:bg-black hover:text-white transition-all uppercase">
                        Load More Articles
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ArticlesPage;
