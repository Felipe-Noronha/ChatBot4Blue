from django.apps import AppConfig
from django.db.models.signals import post_migrate
from .signals import create_default_users

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        post_migrate.connect(create_default_users)

