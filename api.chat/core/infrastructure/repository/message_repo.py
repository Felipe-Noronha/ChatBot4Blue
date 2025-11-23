from core.domain import Message, User
from datetime import datetime, time, timedelta
from django.utils import timezone
from django.conf import settings
from pytz import timezone as pytz_timezone
from typing import List, Optional


class MessageRepository:
    @staticmethod
    def get_messages_by_user_and_date(
        user: User,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> List[Message]:

        messages = Message.objects.filter(user=user)

        try:
            tz = pytz_timezone(settings.TIME_ZONE)
        except Exception:
            tz = pytz_timezone('America/New_York')

        if start_date:
            try:
                start_date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
                start_dt = datetime.combine(start_date_obj, time.min)
                start_dt_aware = timezone.make_aware(start_dt, tz)
                messages = messages.filter(created_at__gte=start_dt_aware)
            except ValueError:
                raise ValueError("Invalid start_date format. Use YYYY-MM-DD.")

        if end_date:
            try:
                end_date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()
                next_day = end_date_obj + timedelta(days=1)
                end_dt = datetime.combine(next_day, time.min)
                end_dt_aware = timezone.make_aware(end_dt, tz)
                messages = messages.filter(created_at__lt=end_dt_aware)
            except ValueError:
                raise ValueError("Invalid end_date format. Use YYYY-MM-DD.")

        return messages.order_by("-created_at")

    @staticmethod
    def create_message(user: User, text: str, response: str) -> Message:
        return Message.objects.create(user=user, text=text, response=response)
