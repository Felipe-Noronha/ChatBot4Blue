from django.urls import path
from core.application.views import SendMessageView, HistoryView

urlpatterns = [
    path('send/', SendMessageView.as_view(), name='send_message'),
    path('history/<int:user_id>/', HistoryView.as_view(), name='history'),
]
