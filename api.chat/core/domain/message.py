from django.db import models
from .user import User

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    text = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'core_message'
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'

    def __str__(self):
        return f"Message from ID {self.user.pk} at {self.created_at:%H:%M:%S}"
