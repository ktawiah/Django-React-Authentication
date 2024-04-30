from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import dashboard, CustomTokenObtainPairView, RegisterView

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view()),
    path("dashboard/", dashboard),
]
