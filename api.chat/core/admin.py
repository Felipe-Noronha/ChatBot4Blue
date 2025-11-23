from django.contrib import admin
from core.domain.user import User
from core.domain.message import Message

admin.site.register(User)
admin.site.register(Message)