import axios from 'axios';

export class MessageApi {
  constructor(baseURL = 'http://127.0.0.1:8000/api') {
    this.api = axios.create({ baseURL });
  }

  async sendMessage(userId, text) {
    const res = await this.api.post('/send/', { user_id: userId, text });
    return res.data;
  }

  async getHistory(userId, filters = {}) {
    const params = new URLSearchParams(filters);
    const res = await this.api.get(`/history/${userId}/?${params.toString()}`);
    return res.data;
  }
}
