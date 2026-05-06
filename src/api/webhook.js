/**
 * Webhook Handler
 * Handles incoming webhook events and integrations
 */

const crypto = require('crypto');

class WebhookHandler {
  constructor(config = {}) {
    this.secret = config.secret || process.env.WEBHOOK_SECRET;
    this.timeout = config.timeout || 5000;
  }

  /**
   * Verify webhook signature
   * @param {string} payload - Raw request body
   * @param {string} signature - X-Signature header
   * @returns {boolean} - Signature valid
   */
  verifySignature(payload, signature) {
    const hash = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');
    return `sha256=${hash}` === signature;
  }

  /**
   * Handle incoming webhook
   * @param {object} req - Express request
   * @param {object} res - Express response
   */
  async handleWebhook(req, res) {
    try {
      const signature = req.headers['x-signature'];
      
      if (!this.verifySignature(JSON.stringify(req.body), signature)) {
        return res.status(401).json({ error: 'Invalid signature' });
      }

      // Process webhook payload
      const { event, data } = req.body;
      console.log(`Processing webhook event: ${event}`);

      res.status(200).json({ success: true, received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = WebhookHandler;
