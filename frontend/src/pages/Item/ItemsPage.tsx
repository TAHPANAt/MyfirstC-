import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppstoreOutlined,
    FilterOutlined,
    SortAscendingOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Input, Select, Spin, Empty } from 'antd';
import type { Item } from '../../interfaces/Item';
import type { Category } from '../../interfaces/Category';
import { itemService } from '../../services/itemService';
import { categoryService } from '../../services/categoryService';
import ItemCard from '../../components/Item/ItemCard';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const ItemsPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('ทุกหมวดหมู่');
    const [conditionFilter, setConditionFilter] = useState('ทุกสภาพ');
    const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsData, categoriesData] = await Promise.all([
                    itemService.getAll(),
                    categoryService.getAll(),
                ]);
                setItems(itemsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to fetch items or categories', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter and Sort Items
    const filteredItems = items
        .filter(item => {
            const matchesSearch = item.itemname.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'ทุกหมวดหมู่' || item.category?.name === categoryFilter;
            const matchesCondition = conditionFilter === 'ทุกสภาพ' || item.condition === conditionFilter;
            return matchesSearch && matchesCategory && matchesCondition;
        })
        .sort((a, b) => {
            if (sortBy === 'latest') {
                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            } else {
                return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
            }
        });

    // Build menu items for categories
    const categoryMenuItems = [
        {
            key: 'ทุกหมวดหมู่',
            icon: <AppstoreOutlined />,
            label: 'ทุกหมวดหมู่',
        },
        ...categories.map(cat => ({
            key: cat.name,
            icon: <AppstoreOutlined />,
            label: cat.name,
        })),
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: '#001529',
                }}
            >
                <div style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: collapsed ? '14px' : '18px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {collapsed ? '📦' : '📦 หมวดหมู่'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[categoryFilter]}
                    onClick={(e: { key: string }) => setCategoryFilter(e.key)}
                    items={categoryMenuItems}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: '0 24px',
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 48,
                            height: 48,
                        }}
                    />
                    <Search
                        placeholder="ค้นหาชื่อสิ่งของ..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        style={{ maxWidth: 400, flex: 1 }}
                        size="large"
                        allowClear
                    />
                    <Select
                        value={conditionFilter}
                        onChange={(value: string) => setConditionFilter(value)}
                        style={{ width: 180 }}
                        size="large"
                        prefix={<FilterOutlined />}
                        options={[
                            { value: 'ทุกสภาพ', label: 'ทุกสภาพ' },
                            { value: 'มือหนึ่ง', label: 'มือหนึ่ง' },
                            { value: 'มือสอง (สภาพดี)', label: 'มือสอง (สภาพดี)' },
                            { value: 'มือสอง (ปานกลาง)', label: 'มือสอง (ปานกลาง)' },
                            { value: 'ของสะสม', label: 'ของสะสม' },
                        ]}
                    />
                    <Select
                        value={sortBy}
                        onChange={(value: 'latest' | 'oldest') => setSortBy(value)}
                        style={{ width: 140 }}
                        size="large"
                        prefix={<SortAscendingOutlined />}
                        options={[
                            { value: 'latest', label: 'ล่าสุด' },
                            { value: 'oldest', label: 'เก่าสุด' },
                        ]}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* Results Header */}
                    <div style={{
                        marginBottom: 24,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h2 style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1f2937'
                        }}>
                            ผลลัพธ์: {filteredItems.length} รายการ
                        </h2>
                        <span style={{ color: '#10b981', fontWeight: 600 }}>
                            หมวดหมู่: {categoryFilter}
                        </span>
                    </div>

                    {/* Items Grid */}
                    {loading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 400
                        }}>
                            <Spin size="large" tip="กำลังโหลด..." />
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <Empty
                            description="ไม่พบรายการสิ่งของในขณะนี้"
                            style={{ marginTop: 80 }}
                        />
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '24px',
                        }}>
                            {filteredItems.map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ItemsPage;
