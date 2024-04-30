from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import TokenSerializer, RegisterSerializer
from rest_framework import generics
from users.models import User
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == "GET":
        return Response(
            {"response": f"Hey {request.user}, welcome to Kel's home."},
            status=HTTP_200_OK,
        )
    elif request.method == "POST":
      return Response({"response": f"Hey {request.user}, your text is {request.POST.get("text")}"})

    return Response({}, status=HTTP_400_BAD_REQUEST)
