import React from 'react';
import { MapPin, Heart, Star, Gift } from 'lucide-react';
import type { Item } from '../../interfaces/Item';

interface ItemCardProps {
    item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    // Mock data for UI as seen in image
    const isFree = item.price === 0;
    const badgeText = isFree ? 'ให้ฟรี' : 'แลกเปลี่ยน';
    const badgeColor = isFree ? 'bg-emerald-500' : 'bg-orange-500';

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gray-50">
                <img
                    src={isFree ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60' : 'https://images.unsplash.com/photo-1527443224154-04a24067c7a5?auto=format&fit=crop&w=500&q=60'}
                    alt={item.itemname}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 ${badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg`}>
                    {badgeText}
                </div>
                <button className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* User Info */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.id}`}
                            className="w-6 h-6 rounded-full bg-gray-100"
                            alt="Avatar"
                        />
                        <div className="text-[10px]">
                            <p className="font-bold text-gray-800 leading-tight">User_{item.id}</p>
                            <p className="text-gray-400">17 ม.ค. 69</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                        <Star size={10} className="text-yellow-500 fill-current" />
                        <span className="text-[10px] font-bold text-yellow-700">4.8</span>
                    </div>
                </div>

                {/* Category Tag */}
                <div className="inline-flex items-center space-x-1 mb-2">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                        #{item.category?.name || 'อุปกรณ์การเรียน'}
                    </span>
                </div>

                <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-[#3fb262] transition-colors line-clamp-1">
                    {item.itemname}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {item.description || 'ไม่มีรายละเอียดเพิ่มเติม'}
                </p>

                {/* Footer info */}
                <div className="mt-auto pt-4 border-t border-gray-50 space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] text-amber-600 font-bold">
                        <Gift size={12} className="fill-current" />
                        <span>สิ่งที่อยากได้: ยินดีรับ</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-medium">
                        <MapPin size={12} />
                        <span className="line-clamp-1">จุดนัดรับ: บริเวณใต้หอพัก (หอ 7-Eleven)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
