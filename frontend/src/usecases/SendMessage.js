export class SendMessage {
  constructor(messageApi) {
    this.messageApi = messageApi;
  }

  async execute(user, text) {
    return await this.messageApi.sendMessage(user.id, text);
  }
}
