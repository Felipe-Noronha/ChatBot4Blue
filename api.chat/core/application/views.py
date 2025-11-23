from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.domain import User
from .serializers import MessageSerializer
from core.infrastructure.repository.message_repo import MessageRepository


class SendMessageView(APIView):
    def post(self, request):
        user_id = request.data.get("user_id")
        text = request.data.get("text")

        if not user_id or not text:
            return Response(
                {"error": "Fields 'user_id' and 'text' are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(pk=int(user_id))
        except (User.DoesNotExist, ValueError):
            return Response(
                {"error": "User not found or invalid ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        if user.id == 1:
            response_text = f"Obrigado {user.name}, sua solicitação foi registrada e será analisada."
        elif user.id == 2:
            response_text = f"Olá {user.name}, obrigado pelo contato. Você receberá uma resposta em breve."
        else:
            response_text = f"Obrigado pela mensagem. Seu ID ({user.id}) foi registrado."

        message = MessageRepository.create_message(
            user=user,
            text=text,
            response=response_text
        )

        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class HistoryView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(pk=int(user_id))
        except (User.DoesNotExist, ValueError):
            return Response(
                {"error": "User not found or invalid ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        try:
            messages = MessageRepository.get_messages_by_user_and_date(
                user=user,
                start_date=start_date,
                end_date=end_date
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
