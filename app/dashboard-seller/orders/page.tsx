'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryDate?: Date;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load orders from localStorage (in production, fetch from API)
    const savedOrders = localStorage.getItem('thriftmap-orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        setOrders(parsed.map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          deliveryDate: o.deliveryDate ? new Date(o.deliveryDate) : undefined,
        })));
      } catch (err) {
        console.error('Failed to load orders:', err);
      }
    }
    setIsLoading(false);
  }, []);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processing': return '📦';
      case 'shipped': return '🚚';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels: Record<Order['status'], string> = {
      pending: 'Menunggu Konfirmasi',
      processing: 'Diproses',
      shipped: 'Dikirim',
      delivered: 'Diterima',
      cancelled: 'Dibatalkan',
    };
    return labels[status];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-3xl text-green-600 mb-4 block"></i>
              <p className="text-gray-600">Loading pesanan...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Saya</h1>
          <p className="text-gray-600">Kelola dan track semua pesanan belanja kamu</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(['all', 'pending', 'processing', 'shipped', 'delivered'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500'
              }`}
            >
              {status === 'all' ? 'Semua Pesanan' : getStatusLabel(status as Order['status'])}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gray-50 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">ID Pesanan</p>
                      <p className="font-mono text-sm font-bold text-gray-900">{order.id.substring(0, 16)}...</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {getStatusLabel(order.status)}
                      </Badge>
                      <p className="text-xs text-gray-600 mt-2">
                        {order.createdAt.toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  {/* Items */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Barang yang Dipesan:</h4>
                    <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.name} x{item.quantity}</span>
                          <span className="font-semibold text-gray-900">
                            Rp {(item.price * item.quantity).toLocaleString('id')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total & Timeline */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Pesanan</p>
                      <p className="text-xl font-bold text-green-600">
                        Rp {order.totalPrice.toLocaleString('id')}
                      </p>
                    </div>
                    {order.deliveryDate && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Estimasi Tiba</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {order.deliveryDate.toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="pt-4 border-t">
                    <p className="text-xs font-semibold text-gray-700 mb-3 uppercase">Status Pengiriman</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className={`flex flex-col items-center ${order.status === 'pending' || ['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${order.status === 'pending' || ['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>1</div>
                        <span className="text-xs mt-1">Dikonfirmasi</span>
                      </div>
                      <div className={`flex-1 h-1 mx-2 ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                      <div className={`flex flex-col items-center ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>2</div>
                        <span className="text-xs mt-1">Dikirim</span>
                      </div>
                      <div className={`flex-1 h-1 mx-2 ${order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                      <div className={`flex flex-col items-center ${order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>3</div>
                        <span className="text-xs mt-1">Diterima</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    {order.status === 'delivered' ? (
                      <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors">
                        <i className="fas fa-star mr-2"></i>Beri Rating
                      </button>
                    ) : (
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors">
                        <i className="fas fa-eye mr-2"></i>Lihat Detail
                      </button>
                    )}
                    <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium text-sm transition-colors">
                      <i className="fas fa-headset mr-2"></i>Hubungi
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Pesanan</h3>
              <p className="text-gray-600 mb-6">Kamu belum melakukan pesanan apapun</p>
              <Link
                href="/marketplace"
                className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                <i className="fas fa-shopping-bag mr-2"></i>Mulai Belanja
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
