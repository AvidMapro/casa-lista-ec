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
        form.dataset.dropiId ? `*ID Dropi:* ${form.dataset.dropiId}` : '',
        `*Cantidad:* ${quantity}`,
        `*Precio unitario:* $${unitPrice.toFixed(2).replace('.', ',')}`,
        `*Total referencial:* $${total} con envío incluido`,
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
        '*Forma de pago:* Contra entrega, sujeto a cobertura.',
        'Por favor, confirma stock, cobertura y total antes de crear el pedido en Dropi.'
      ].filter(Boolean).join('\n');

      window.location.href = `https://wa.me/${SELLER_NUMBER}?text=${encodeURIComponent(message)}`;
    });
  });
})();
