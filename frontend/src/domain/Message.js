export class Message {
  constructor(id, user, text, response, createdAt) {
    this.id = id;
    this.user = user;
    this.text = text;
    this.response = response;
    this.createdAt = createdAt;
  }
}