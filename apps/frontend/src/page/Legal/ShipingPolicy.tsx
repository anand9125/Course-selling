const ShippingPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800">
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

      <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '15px' }}>
          <strong>Shipping Methods</strong>
          <p>
            We offer the following shipping methods for delivering your orders:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
              <li>Standard Shipping</li>
              <li>Express Shipping</li>
              <li>Same-Day Delivery (if applicable)</li>
            </ul>
            The availability of these methods may vary depending on your location and the type of product ordered.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Delivery Timelines</strong>
          <p>
            Our estimated delivery timelines are as follows:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
              <li><strong>Standard Shipping:</strong> 5-7 business days</li>
              <li><strong>Express Shipping:</strong> 2-3 business days</li>
              <li><strong>Same-Day Delivery:</strong> Available for select locations and products</li>
            </ul>
            Please note that these timelines are estimates and may vary due to factors beyond our control, such as weather conditions, customs delays, or logistical issues.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Shipping Costs</strong>
          <p>
            Shipping costs are calculated based on the following factors:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
              <li>Product weight and dimensions</li>
              <li>Shipping method selected</li>
              <li>Delivery location</li>
            </ul>
            Free shipping may be available for orders above a certain amount. Please check the product page or cart summary for details.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Order Processing</strong>
          <p>
            Orders are processed within <strong>1-2 business days</strong> after payment confirmation. Once your order is shipped, you will receive a confirmation email with tracking details.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>International Shipping</strong>
          <p>
            We ship to select international locations. Please note the following:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
              <li>Customs duties, taxes, and fees are the responsibility of the customer.</li>
              <li>Delivery timelines may vary depending on the destination country.</li>
              <li>Some products may not be available for international shipping due to legal or logistical restrictions.</li>
            </ul>
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Tracking Your Order</strong>
          <p>
            Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website or the courier’s website.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Undeliverable Orders</strong>
          <p>
            If an order is returned to us as undeliverable (e.g., due to an incorrect address or failure to collect the package), we will contact you to arrange reshipment. Additional shipping charges may apply.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Lost or Stolen Packages</strong>
          <p>
            We are not responsible for lost or stolen packages once they have been marked as delivered by the courier. If you suspect your package has been lost or stolen, please contact the courier directly.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Changes to Shipping Address</strong>
          <p>
            If you need to change your shipping address after placing an order, please contact our customer service team immediately. We cannot guarantee that changes can be made once the order has been processed.
          </p>
        </li>

        <li style={{ marginBottom: '15px' }}>
          <strong>Contact Us</strong>
          <p>
            If you have any questions or concerns about our shipping policy, please contact us at:
            <br />
            <strong>Email:</strong> support@novitaswebworks.in
            <br />
            <strong>Phone:</strong> +91-XXXXXXXXXX (Monday - Friday, 9:00 AM - 6:00 PM)
          </p>
        </li>
      </ol>
    </div>
    </div>
  );
};

export default ShippingPolicy;