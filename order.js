(() => {
  const SELLER_NUMBER = '593995216932';

  document.querySelectorAll('.order-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const quantity = Math.max(1, Number(data.get('cantidad')) || 1);
      const unitPrice = Number(form.dataset.price);
      const total = (unitPrice * quantity).toFixed(2).replace('.', ',');
      const value = (name) => String(data.get(name) || '').trim();

      const message = [
        `Hola, soy *${value('nombre')}* y quiero realizar este pedido:`,
        '',
        `*Producto:* ${form.dataset.product}`,
        form.dataset.productId ? `*ID:* ${form.dataset.productId}` : '',
        `*Cantidad:* ${quantity}`,
        `*Precio total:* $${total}`,
        '',
        '*DATOS DE ENTREGA*',
        `*Teléfono:* ${value('telefono')}`,
        `*Provincia:* ${value('provincia')}`,
        `*Ciudad:* ${value('ciudad')}`,
        `*Sector o barrio:* ${value('sector')}`,
        `*Dirección:* ${value('direccion')}`,
        `*Referencia:* ${value('referencia')}`,
        value('indicaciones') ? `*Indicaciones adicionales:* ${value('indicaciones')}` : '',
        '',
        '¡Gracias! Quedo atento a la confirmación de mi pedido.'
      ].filter(Boolean).join('\n');

      window.location.href = `https://wa.me/${SELLER_NUMBER}?text=${encodeURIComponent(message)}`;
    });
  });
})();
