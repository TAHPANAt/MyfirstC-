import React from 'react';
import { Users, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-8 leading-[1.1]">
                            แบ่งปันสิ่งดีๆ <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                สร้างสังคมที่ยั่งยืน
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
                            SUT-ReShare คือแพลตฟอร์มกลางสำหรับชาว มทส. (SUT) เพื่อการแลกเปลี่ยนและแบ่งปันทรัพยากร
                            เราเชื่อว่าของที่ไม่ได้ใช้สำหรับคุณ อาจเป็นสิ่งล้ำค่าสำหรับเพื่อนร่วมรั้วมหาลัย
                        </p>
                    </div>
                </div>
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-50/50 to-transparent pointer-events-none"></div>
            </section>

            {/* Stats/Highlight Section */}
            <section className="py-20 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-black">สร้างคอมมูนิตี้</h3>
                            <p className="text-gray-500 leading-relaxed">
                                เชื่อมโยงนักศึกษาและบุคลากรเข้าด้วยกันผ่านการแบ่งปัน เสริมสร้างมิตรภาพและความร่วมมือภายในรั้ว SUT
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                                <Leaf size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-black">ความยั่งยืน</h3>
                            <p className="text-gray-500 leading-relaxed">
                                ลดปริมาณขยะและลดการใช้ทรัพยากรใหม่ โดยการนำของมาหมุนเวียนให้เกิดประโยชน์สูงสุดต่อสิ่งแวดล้อม
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-black">ความเชื่อมั่น</h3>
                            <p className="text-gray-500 leading-relaxed">
                                ระบบสมาชิกที่คัดกรองเฉพาะชาว SUT ทำให้การแลกเปลี่ยน ปลอดภัย มั่นใจได้ในคุณภาพและความซื่อสัตย์
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
                                    alt="Student Community"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 space-y-8">
                            <div className="inline-block px-4 py-1 rounded-full bg-black text-white text-[10px] font-black tracking-widest uppercase">
                                Our Mission
                            </div>
                            <h2 className="text-4xl font-black text-black leading-tight">
                                เป้าหมายหลักของเราคือการทำให้ <br />
                                "การให้" กลายเป็นเรื่องง่าย
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    SUT-ReShare เริ่มต้นจากแนวคิดง่ายๆ ที่อยากให้ทุกคนในมหาวิทยาลัยเทคโนโลยีสุรนารี
                                    สามารถส่งต่อสิ่งของที่ตนเองไม่ได้ใช้แล้วให้กับคนอื่นที่ต้องการได้โดยตรง
                                    ไม่ว่าจะเป็นหนังสือ อุปกรณ์การเรียน หรือเครื่องใช้ไฟฟ้าขนาดเล็ก
                                </p>
                                <p>
                                    เราออกแบบระบบให้มีความพรีเมียม ใช้งานง่าย และตอบโจทย์ไลฟ์สไตล์ของคนรุ่นใหม่
                                    เน้นความโปร่งใสและการเข้าถึงที่สะดวก เพื่อให้สังคมแห่งการแบ่งปันเติบโตขึ้นอย่างเข้มแข็ง
                                </p>
                            </div>
                            <div className="pt-6">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform group"
                                >
                                    <span>เริ่มร่วมเป็นส่วนหนึ่งกับเรา</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team CTA */}
            <section className="py-24 bg-black text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">มาร่วมสร้างสังคม มทส. <br />ให้น่าอยู่ด้วยกัน</h2>
                    <p className="text-gray-400 text-lg mb-12 font-medium">
                        หากคุณมีข้อสงสัยหรือต้องการให้คำแนะนำเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางประกาศข่าวสารของมหาวิทยาลัย
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/" className="text-white border-b border-white/30 hover:border-white transition-colors py-2 font-bold tracking-widest text-sm uppercase">กลับหน้าแรก</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
