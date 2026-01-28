import React, { useEffect, useState } from 'react';
import type { Item } from '../interfaces/Item';
import { itemService } from '../services/itemService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LandingPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await itemService.getAll();
                setItems(data.slice(0, 6)); // Display first 6 items in the collection
            } catch (error) {
                console.error('Failed to fetch items', error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const categories = [
        { title: 'MEN', label: 'EXPLORE NOW', image: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f3c?q=80&w=1470' },
        { title: 'WOMEN', label: 'EXPLORE NOW', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288' },
        { title: 'EQUIPMENT', label: 'EXPLORE NOW', image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1473' },
        { title: 'FOOTWEAR', label: 'EXPLORE NOW', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470' },
    ];

    const partners = [
        { name: 'KTC', color: 'bg-red-600' },
        { name: 'POINT X', color: 'bg-purple-600' },
        { name: 'CardX', color: 'bg-slate-800' },
        { name: 'KBank', color: 'bg-green-700' },
    ];

    return (
        <div className="bg-[#fcfcfc] min-h-screen">
            {/* 1. Hero Banner Section */}
            <section className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-black overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>

                {/* Abstract Glows */}
                <div className="absolute -left-[10%] top-0 w-[50%] h-full bg-blue-600/20 blur-[100px] md:blur-[150px] rounded-full"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-full bg-red-600/10 blur-[80px] md:blur-[120px] rounded-full"></div>

                <div className="relative z-20 h-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center px-6 md:px-16 gap-8 md:gap-12 justify-center md:justify-start">
                    {/* Left Text */}
                    <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                            สิทธิประโยชน์ <br />
                            <span className="text-gray-400 font-medium text-2xl md:text-4xl">กับ</span> ธนาคารพาร์ทเนอร์
                        </h1>
                        <p className="text-gray-400 text-sm md:text-lg max-w-md font-light mx-auto md:mx-0">
                            รวมสิทธิพิเศษทางการเงินที่เดียวที่นี่ <br className="hidden md:block" />
                            รับส่วนลด แผนผ่อนชำระ 0% และเครดิตเงินคืนจากธนาคารชั้นนำ
                        </p>
                        <button className="px-6 md:px-8 py-2.5 md:py-3 border border-white text-white text-[11px] md:text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all">
                            ดูสิทธิธรรมทั้งหมด
                        </button>
                    </div>

                    {/* Right Partner Grid */}
                    <div className="hidden lg:grid grid-cols-2 gap-4 flex-[1.2]">
                        <div className="grid grid-cols-2 gap-4 col-span-2">
                            {partners.map((p, i) => (
                                <div key={i} className={`${p.color} aspect-video rounded-lg flex items-center justify-center text-white font-black text-xl shadow-2xl`}>
                                    {p.name}
                                </div>
                            ))}
                        </div>
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 col-span-2 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Featured Partner</p>
                                <p className="text-white text-2xl font-black">SCB CardX</p>
                            </div>
                            <div className="w-16 h-10 bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">LOGO</div>
                        </div>
                    </div>
                </div>

                {/* Carousel Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                </div>

                {/* Navigation Arrows */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity z-30">
                    <ChevronLeft size={24} />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity z-30">
                    <ChevronRight size={24} />
                </button>
            </section>

            {/* 2. Category Boxes Grid */}
            <section className="max-w-[1440px] mx-auto px-6 md:px-8 py-10 md:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
                            <img
                                src={cat.image}
                                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                                alt={cat.title}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                                <h3 className="text-2xl font-black tracking-widest mb-2">{cat.title}</h3>
                                <button className="text-[10px] font-black border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 tracking-widest">
                                    {cat.label}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Limited Collection Section */}
            <section className="pb-24">
                <div className="max-w-[1440px] mx-auto px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Chinese New Year Collection 2026</h2>
                        <div className="flex items-center justify-center mt-2">
                            <button className="text-[11px] font-black underline underline-offset-4 tracking-widest text-gray-800 hover:text-red-600 transition-colors">VIEW MORE</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center mb-10">
                        <span className="px-4 py-1.5 bg-gray-200 text-gray-800 text-[10px] font-black tracking-widest rounded-sm">LIMITED COLLECTION</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-4 animate-pulse">
                                    <div className="aspect-square bg-gray-100 rounded-sm"></div>
                                    <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto"></div>
                                    <div className="h-3 bg-gray-50 rounded w-1/2 mx-auto"></div>
                                </div>
                            ))
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="text-center group cursor-pointer">
                                    <div className="aspect-square mb-4 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                                        <img
                                            src={`https://images.unsplash.com/photo-${1500000000000 + item.id}?auto=format&fit=crop&w=300&q=80`}
                                            className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                            alt={item.itemname}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80';
                                            }}
                                        />
                                    </div>
                                    <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-tighter line-clamp-2 leading-tight px-2 group-hover:text-red-600 transition-colors">
                                        {item.itemname}
                                    </h4>
                                    <p className="text-[9px] text-gray-400 font-bold mt-1 tracking-tighter uppercase">{item.category?.name || 'NEW ARRIVAL'}</p>
                                </div>
                            ))
                        )}
                        {items.length === 0 && !loading && (
                            <div className="col-span-full py-12 text-gray-300 font-black text-center text-xl tracking-[0.5em] uppercase">No Collection Available</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
