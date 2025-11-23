from rest_framework import serializers
from core.domain import Message 

class MessageSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Message
        fields = [
            'id', 
            'user_id', 
            'user_name', 
            'text',
            'response', 
            'created_at',
        ]
        read_only_fields = ['id', 'user_id', 'user_name', 'response', 'created_at']