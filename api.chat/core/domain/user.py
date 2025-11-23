from django.db import models

class User(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'core_user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"ID {self.pk} - {self.name}"
