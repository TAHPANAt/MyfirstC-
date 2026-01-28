import React, { useEffect, useState } from 'react';
import type { Item } from '../../interfaces/Item';
import { itemService } from '../../services/itemService';
import ItemCard from '../../components/Item/ItemCard';
import { Search, Filter, Layers, Package } from 'lucide-react';

const ItemsPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await itemService.getAll();
                setItems(data);
            } catch (error) {
                console.error('Failed to fetch items', error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="ค้นหาชื่อสิ่งของ..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select className="pl-10 pr-10 py-3 bg-gray-50 border-none rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500/20">
                            <option>ทุกหมวดหมู่</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select className="pl-10 pr-10 py-3 bg-gray-50 border-none rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500/20">
                            <option>ทุกสภาพ</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-xl font-bold text-gray-800">ผลลัพธ์: {items.length} รายการ</h2>
                <div className="flex items-center space-x-2 text-sm font-bold text-emerald-600">
                    <span>เรียงตาม: ล่าสุด</span>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="h-96 bg-gray-100 animate-pulse rounded-3xl"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                    {items.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <Package className="mx-auto text-gray-200 mb-4" size={64} />
                            <p className="text-gray-400 font-bold">ไม่พบรายการสิ่งของในขณะนี้</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ItemsPage;
