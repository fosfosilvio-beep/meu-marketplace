import React, { useState } from 'react';
import { 
  ShoppingCart, Heart, User, Search, Store, Star, ArrowLeft, Plus, Minus, 
  Trash2, CheckCircle, Menu, LogOut, Info, AlertCircle, Copy, QrCode
} from 'lucide-react';

const MarketplaceApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    avatar: 'https://i.pravatar.cc/150?img=12'
  };

  const addresses = [
    {
      id: 1,
      label: 'Casa',
      street: 'Rua das Flores',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      isDefault: true
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Fone de Ouvido Bluetooth Premium',
      price: 299.90,
      oldPrice: 499.00,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      rating: 4.8,
      reviews: 234,
      store: 'Tech Store Plus',
      category: 'eletronicos',
      freeShipping: true,
      stock: 50,
      badge: 'Mais Vendido',
      description: 'Fone de ouvido bluetooth com cancelamento de ruído ativo.',
      variations: [
        { id: 'v1', color: 'Preto', stock: 50 },
        { id: 'v2', color: 'Branco', stock: 30 }
      ],
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
      ]
    },
    {
      id: 2,
      name: 'Air Fryer 12L Fritadeira Elétrica',
      price: 419.90,
      oldPrice: 699.00,
      image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
      rating: 4.9,
      reviews: 567,
      store: 'Casa & Cozinha',
      category: 'casa',
      freeShipping: true,
      stock: 25,
      badge: 'Oferta',
      description: 'Air Fryer 12L com 10 funções.',
      variations: [],
      images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=500']
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const showNotification = (message, type = 'info') => {
    const notification = { id: Date.now(), message, type };
    setNotifications([...notifications, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const addToCart = (product, variation = null, qty = 1) => {
    setCart([...cart, { ...product, quantity: qty, variation }]);
    showNotification('Produto adicionado!', 'success');
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(index);
      return;
    }
    setCart(cart.map((item, i) => 
      i === index ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const toggleFavorite = (productId) => {
    if (!isAuthenticated) {
      showNotification('Faça login para favoritar', 'info');
      return;
    }
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const NotificationToast = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(n => (
        <div key={n.id} className={`px-6 py-4 rounded-xl shadow-2xl border ${
          n.type === 'success' ? 'bg-green-500 border-green-400' : 
          n.type === 'error' ? 'bg-red-500 border-red-400' : 'bg-blue-500 border-blue-400'
        }`}>
          <p className="text-white font-medium flex items-center gap-2">
            {n.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {n.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {n.type === 'info' && <Info className="w-5 h-5" />}
            {n.message}
          </p>
        </div>
      ))}
    </div>
  );

  const Header = () => (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-7 h-7 text-blue-600" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-white font-bold text-xl">MarketPlace</h1>
              <p className="text-blue-100 text-xs">Multi-Lojas</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('cart')} className="relative p-3 hover:bg-white/10 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 hover:bg-white/10 rounded-xl">
              {isAuthenticated ? (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl mr-4">
          {!isAuthenticated ? (
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-xl mb-4">Bem-vindo!</h3>
              <button onClick={() => { setIsAuthenticated(true); setIsMenuOpen(false); showNotification('Login realizado!', 'success'); }}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                Entrar como Cliente
              </button>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-4 p-4 border-b">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full" />
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button onClick={() => { setIsAuthenticated(false); setCurrentView('home'); setIsMenuOpen(false); setCart([]); showNotification('Logout realizado', 'info'); }}
                className="w-full px-4 py-3 text-left hover:bg-red-50 rounded-lg text-red-600 flex items-center gap-3 mt-2">
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
      <div className="relative" onClick={() => { setCurrentProduct(product); setCurrentView('product-detail'); }}>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 rounded-lg">
            <span className="text-gray-900 font-bold text-sm">{product.badge}</span>
          </div>
        )}
        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex items-end gap-2 mb-4">
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Adicionar
        </button>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Produtos em Destaque</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ProductDetail = () => {
    if (!currentProduct) return null;
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => setCurrentView('home')} className="mb-6 flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl p-8 shadow-lg">
            <div>
              <img src={currentProduct.images[0]} alt={currentProduct.name} className="w-full h-96 object-cover rounded-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{currentProduct.name}</h1>
              <div className="flex items-end gap-4 mb-8">
                {currentProduct.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(currentProduct.oldPrice)}</span>
                )}
                <span className="text-5xl font-bold text-blue-600">{formatPrice(currentProduct.price)}</span>
              </div>
              {currentProduct.variations.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Variações:</h3>
                  <div className="flex gap-3">
                    {currentProduct.variations.map(v => (
                      <button key={v.id} onClick={() => setSelectedVariation(v)}
                        className={`px-4 py-3 rounded-xl border-2 ${selectedVariation?.id === v.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                        {v.color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-8">
                <h3 className="font-bold mb-3">Quantidade:</h3>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 rounded-xl flex items-center justify-center">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border-2 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button onClick={() => addToCart(currentProduct, selectedVariation, quantity)}
                className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartPage = () => {
    if (cart.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Carrinho Vazio</h2>
              <button onClick={() => setCurrentView('home')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Meu Carrinho ({cart.length} itens)</h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg flex gap-6">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border-2 rounded-xl">
                        <button onClick={() => updateCartQuantity(index, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(index, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold mb-6">Resumo</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(calculateCartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">Grátis</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-3xl text-blue-600">{formatPrice(calculateCartTotal())}</span>
                  </div>
                </div>
                <button onClick={() => setCurrentView('checkout')}
                  className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold text-lg">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutPage = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Endereço de Entrega</h2>
            {addresses.map(addr => (
              <div key={addr.id} className="p-6 rounded-xl border-2 border-blue-600 bg-blue-50 mb-4">
                <p className="font-bold">{addr.label}</p>
                <p>{addr.street}, {addr.number}</p>
                <p>{addr.city}/{addr.state}</p>
              </div>
            ))}
            <button onClick={() => {
              setCurrentOrder({ items: cart, total: calculateCartTotal(), paymentMethod });
              setCurrentView('order-confirmation');
              setCart([]);
            }} className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold mt-6">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OrderConfirmation = () => {
    if (!currentOrder) return null;
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
            <p className="text-xl text-gray-600">#{Math.floor(Math.random() * 100000)}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Pague com PIX</h2>
            <div className="w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-48 h-48 text-gray-400" />
            </div>
            <button onClick={() => showNotification('Código copiado!', 'success')}
              className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold flex items-center justify-center gap-2">
              <Copy className="w-5 h-5" />
              Copiar Código PIX
            </button>
          </div>
          <div className="text-center">
            <button onClick={() => setCurrentView('home')}
              className="px-8 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-900 font-bold">
              Voltar para Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return <HomePage />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmation />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationToast />
      {renderView()}
    </div>
  );
};

export default MarketplaceApp;