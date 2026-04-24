// Estado global
let orders = [];
let nextId = 1;


function addOrder() {
    //  Generar pedido con ID único
    const newOrder = receiveNewOrder();
    if (!newOrder) return;

    // Mostrar inmediatamente con estado 'En Proceso'
    newOrder.status = 'En Proceso';
    orders.unshift(newOrder);
    updateOrdersDisplay();

    // Iniciar preparación asíncrona
    prepareOrderAsync(newOrder.id);
}

// ========== RECEPCIÓN DE PEDIDO ==========
function receiveNewOrder() {
    const cliente = prompt('Nombre del cliente:');
    if (!cliente?.trim()) return null;

    const producto = prompt('Producto:');
    if (!producto?.trim()) return null;

    const cantidad = prompt('Cantidad:');
    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
        alert('Cantidad inválida.');
        return null;
    }

    return {
        id: nextId++,
        cliente: cliente.trim(),
        producto: producto.trim(),
        cantidad: parseInt(cantidad),
        status: 'Recibido',
        timestamp: new Date().toLocaleString('es-MX')
    };
}

/**
 * setTimeout + 4.2 Promises + 4.3 async/await
 */
function prepareOrderAsync(orderId) {
    // Promise que simula preparación (tiempo aleatorio 3-8s)
    const preparationPromise = new Promise((resolve, reject) => {
        const prepTime = Math.random() * 5000 + 3000; // 3-8 segundos
        
        console.log(`🍳 Iniciando preparación del pedido ${orderId}... (${Math.round(prepTime/1000)}s)`);
        
        setTimeout(() => {
            if (Math.random() > 0.05) { 
                resolve({ orderId, status: 'Completado', time: prepTime });
            } else {
                reject(new Error(`❌ Pedido ${orderId} falló en preparación`));
            }
        }, prepTime);
    });

    
    handlePreparation(preparationPromise, orderId);
}

//  async/await para actualización en tiempo real
async function handlePreparation(prepPromise, orderId) {
    try {
        const result = await prepPromise;
        updateOrderStatus(orderId, result.status, `¡Listo en ${Math.round(result.time/1000)}s!`);
        console.log(`✅ Pedido ${orderId} ${result.status}`);
    } catch (error) {
        updateOrderStatus(orderId, 'Fallido', error.message);
        console.error(error.message);
    }
}

// Actualizar estado de pedido específico
function updateOrderStatus(orderId, status, message = '') {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        orders[orderIndex].message = message;
        orders[orderIndex].timestamp = new Date().toLocaleString('es-MX');
        updateOrdersDisplay();
    }
}

// ========== VISUALIZACIÓN ==========
function updateOrdersDisplay() {
    const container = document.getElementById('ordersContainer');
    if (orders.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay pedidos. ¡Agrega el primero!</div>';
        return;
    }
    container.innerHTML = orders.map(createOrderHTML).join('');
}

function createOrderHTML(order) {
    const statusConfig = {
        'Recibido': { color: '#2196F3', icon: '📥' },
        'En Proceso': { color: '#FF9800', icon: '🔄' },
        'Completado': { color: '#4CAF50', icon: '✅' },
        'Fallido': { color: '#f44336', icon: '❌' }
    };
    
    const config = statusConfig[order.status] || { color: '#666', icon: '⚪' };
    
    return `
        <div class="order" style="border-left-color: ${config.color}">
            <div class="order-details">
                <strong>${order.cliente}</strong> ${config.icon}<br>
                ${order.producto} × ${order.cantidad}<br>
                <small style="color: ${config.color}">
                    ${order.status} | ${order.timestamp}
                    ${order.message ? `| ${order.message}` : ''}
                </small>
            </div>
            <button class="delete-btn" onclick="deleteOrder(${order.id})">🗑️</button>
        </div>
    `;
}

function deleteOrder(id) {
    orders = orders.filter(o => o.id !== id);
    updateOrdersDisplay();
}